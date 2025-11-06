/**
 * Tauri file system utilities for local-first notebook storage
 */

import { invoke } from '@tauri-apps/api/core';
import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

export interface RecentFile {
  path: string;
  name: string;
  timestamp: number;
}

/**
 * Check if running in Tauri environment
 */
export function isTauri(): boolean {
  return '__TAURI__' in window;
}

/**
 * Open a file dialog and read the selected notebook file
 */
export async function openNotebookFile(): Promise<{ path: string; content: string } | null> {
  if (!isTauri()) {
    throw new Error('Not running in Tauri environment');
  }

  try {
    const selectedPath = await open({
      multiple: false,
      filters: [{
        name: 'Notebook Files',
        extensions: ['js', 'json']
      }],
      title: 'Open Notebook'
    });

    if (!selectedPath || typeof selectedPath !== 'string') {
      return null;
    }

    const content = await readTextFile(selectedPath);

    // Add to recent files
    const fileName = selectedPath.split(/[/\\]/).pop() || 'notebook.js';
    await addRecentFile(selectedPath, fileName);

    return {
      path: selectedPath,
      content
    };
  } catch (error) {
    console.error('Failed to open file:', error);
    throw error;
  }
}

/**
 * Save a notebook to a file
 */
export async function saveNotebookFile(
  content: string,
  currentPath?: string
): Promise<string | null> {
  if (!isTauri()) {
    throw new Error('Not running in Tauri environment');
  }

  try {
    let targetPath = currentPath;

    // If no current path, show save dialog
    if (!targetPath) {
      const defaultDir = await getDefaultSaveDirectory();

      targetPath = await save({
        defaultPath: defaultDir,
        filters: [{
          name: 'Notebook Files',
          extensions: ['js']
        }],
        title: 'Save Notebook'
      }) as string | null;

      if (!targetPath) {
        return null;
      }

      // Ensure .js extension
      if (!targetPath.endsWith('.js')) {
        targetPath += '.js';
      }
    }

    // Write file
    await writeTextFile(targetPath, content);

    // Add to recent files
    const fileName = targetPath.split(/[/\\]/).pop() || 'notebook.js';
    await addRecentFile(targetPath, fileName);

    return targetPath;
  } catch (error) {
    console.error('Failed to save file:', error);
    throw error;
  }
}

/**
 * Save notebook as a new file (always show dialog)
 */
export async function saveNotebookFileAs(content: string): Promise<string | null> {
  if (!isTauri()) {
    throw new Error('Not running in Tauri environment');
  }

  return saveNotebookFile(content);
}

/**
 * Get recent files list
 */
export async function getRecentFiles(): Promise<RecentFile[]> {
  if (!isTauri()) {
    // Return from localStorage for web version
    const stored = localStorage.getItem('recentFiles');
    return stored ? JSON.parse(stored) : [];
  }

  try {
    return await invoke<RecentFile[]>('get_recent_files');
  } catch (error) {
    console.error('Failed to get recent files:', error);
    return [];
  }
}

/**
 * Add a file to recent files list
 */
export async function addRecentFile(path: string, name: string): Promise<void> {
  const timestamp = Date.now();

  if (!isTauri()) {
    // Use localStorage for web version
    const recentFiles = await getRecentFiles();
    const filtered = recentFiles.filter(f => f.path !== path);
    const updated = [{ path, name, timestamp }, ...filtered].slice(0, 10);
    localStorage.setItem('recentFiles', JSON.stringify(updated));
    return;
  }

  try {
    await invoke('add_recent_file', { path, name, timestamp });
  } catch (error) {
    console.error('Failed to add recent file:', error);
  }
}

/**
 * Get default save directory (Tauri only)
 */
export async function getDefaultSaveDirectory(): Promise<string> {
  if (!isTauri()) {
    return '';
  }

  try {
    return await invoke<string>('get_default_save_directory');
  } catch (error) {
    console.error('Failed to get default save directory:', error);
    return '';
  }
}

/**
 * Read a file by path
 */
export async function readFile(path: string): Promise<string> {
  if (!isTauri()) {
    throw new Error('Not running in Tauri environment');
  }

  try {
    return await invoke<string>('read_notebook_file', { path });
  } catch (error) {
    console.error('Failed to read file:', error);
    throw error;
  }
}

/**
 * Write content to a file
 */
export async function writeFile(path: string, content: string): Promise<void> {
  if (!isTauri()) {
    throw new Error('Not running in Tauri environment');
  }

  try {
    await invoke('write_notebook_file', { path, content });
  } catch (error) {
    console.error('Failed to write file:', error);
    throw error;
  }
}

/**
 * Watch for file changes (simplified version)
 */
export function watchFile(path: string, callback: (content: string) => void): () => void {
  if (!isTauri()) {
    return () => {};
  }

  // Simple polling-based watch (can be enhanced with actual file system events)
  let lastContent = '';
  let isActive = true;

  const check = async () => {
    if (!isActive) return;

    try {
      const content = await readFile(path);
      if (content !== lastContent) {
        lastContent = content;
        callback(content);
      }
    } catch (error) {
      // File might have been deleted or moved
      console.error('File watch error:', error);
    }

    if (isActive) {
      setTimeout(check, 2000); // Check every 2 seconds
    }
  };

  check();

  return () => {
    isActive = false;
  };
}
