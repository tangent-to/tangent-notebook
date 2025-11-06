# Tangent Notebooks - Major Improvements

This document outlines the comprehensive improvements made to Tangent Notebooks to transform it into a powerful, local-first notebook application.

## 🚀 Key Features Added

### 1. Performance Optimizations

- **Debounced Auto-save**: Automatic saving with 2-second debouncing to prevent excessive writes
- **Optimized State Management**: Improved Svelte stores with efficient update patterns
- **Lazy Loading**: Components load on-demand for faster initial startup

### 2. Enhanced User Experience

#### Command Palette (Ctrl/Cmd + K)
- Quick access to all notebook operations
- Search through commands
- Keyboard navigation
- Visual command hierarchy with icons

#### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Open Command Palette
- `Ctrl/Cmd + /` - Toggle AI Chat
- `Ctrl/Cmd + S` - Save Notebook
- `Ctrl/Cmd + N` - New Notebook
- `Ctrl/Cmd + O` - Open Notebook
- `Ctrl/Cmd + Enter` - Run Current Cell
- `Shift + Enter` - Run Cell and Select Next
- `Alt + Enter` - Run Cell and Insert Below

### 3. AI-Powered Features

#### GitHub Copilot Integration
- Direct integration in Monaco editor
- Inline code completion
- Intelligent suggestions based on context
- Custom completions for common libraries (D3.js, Observable Plot, etc.)

#### AI Chat Sidebar (Ctrl/Cmd + /)
- Interactive AI assistant for code generation
- Support for multiple AI providers:
  - GitHub Copilot
  - Claude (Anthropic)
  - Ollama (local models)
- Insert generated code directly into notebooks
- Contextual conversations with chat history
- Pre-built suggestions for common tasks

### 4. Comprehensive Library Support

#### Built-in Library Helpers
Extensive support and examples for:

- **Arquero**: Data manipulation and transformation
  - CSV loading and filtering
  - Grouping and aggregation
  - Table joins

- **Observable Plot**: Declarative data visualization
  - Scatter plots with regression
  - Bar charts
  - Time series with multiple series
  - Customizable themes

- **Plotly.js**: Interactive, publication-quality graphs
  - 3D visualizations
  - Heatmaps
  - Interactive time series with range selectors
  - Responsive layouts

- **Vega-Lite**: Grammar of interactive graphics
  - Bar charts
  - Interactive scatter plots
  - Declarative specifications

- **D3.js**: Low-level data-driven visualizations
  - Custom SVG graphics
  - Force-directed graphs
  - Advanced animations

#### Data Utilities
- `generateTimeSeries()`: Create sample time series data
- `generateScatterData()`: Generate scatter plot data
- `generateTreeData()`: Hierarchical data for tree visualizations
- `generateNetworkData()`: Network/graph data generation

### 5. Tauri Desktop Application

#### Native File Operations
- Native file open/save dialogs
- Recent files management
- File system integration
- Auto-create notebooks directory in Documents

#### Desktop Features
- Standalone desktop application
- No server required
- Local-first architecture
- Cross-platform (Windows, macOS, Linux)

#### File Management
- Open notebooks from anywhere
- Save with native dialogs
- Auto-save to last location
- Recent files list

### 6. Beautiful UI/UX Improvements

#### Modern Interface
- Clean, minimalist design inspired by Observable
- Smooth animations and transitions
- Contextual tooltips
- Active state indicators

#### Sidebar System
- **AI Chat Sidebar**: Full-featured chat interface
- **Info Sidebar**: Notebook metadata and settings
- Collapsible and resizable

#### Visual Feedback
- Unsaved changes indicator
- Loading states
- Typing indicators in chat
- Success/error notifications

## 📦 Installation & Usage

### Web Version

```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173

### Desktop Application (Tauri)

```bash
cd frontend
npm install
npm run tauri:dev
```

For production build:
```bash
npm run tauri:build
```

## 🔧 Configuration

### AI Provider Setup

#### GitHub Copilot
1. Click the AI Assistant icon (or press Ctrl/Cmd + /)
2. Click the Settings icon
3. Enter your GitHub token
4. Click "Connect"

Get your GitHub token from: https://github.com/settings/tokens

Required scopes: `read:user`

#### Claude API
Configure in the AI settings:
```javascript
// In browser console or settings
import { aiService } from './lib/utils/aiService';
aiService.configureProvider('claude', 'your-api-key');
aiService.setProvider('claude');
```

#### Ollama (Local)
1. Install Ollama: https://ollama.ai
2. Pull a code model: `ollama pull codellama`
3. Start Ollama service
4. Select Ollama in AI settings (no API key needed)

## 📝 Library Examples

### Arquero Data Manipulation

```javascript
import * as aq from 'arquero';

// Load CSV data
const data = aq.fromCSV(await fetch('data.csv').then(r => r.text()));

// Filter and transform
const filtered = data
  .filter(d => d.value > 100)
  .derive({ doubled: d => d.value * 2 })
  .select('name', 'value', 'doubled');

filtered.view(); // Display as table
```

### Observable Plot Visualization

```javascript
import * as Plot from '@observablehq/plot';

const data = [
  {x: 1, y: 2, category: 'A'},
  {x: 2, y: 5, category: 'B'},
  {x: 3, y: 3, category: 'A'}
];

Plot.plot({
  marks: [
    Plot.dot(data, {x: 'x', y: 'y', fill: 'category'}),
    Plot.linearRegressionY(data, {x: 'x', y: 'y', stroke: 'red'})
  ],
  grid: true,
  width: 640,
  height: 400
})
```

### Plotly Interactive 3D

```javascript
import Plotly from 'plotly.js-dist';

const trace = {
  x: [1, 2, 3, 4, 5],
  y: [1, 4, 9, 16, 25],
  z: [1, 8, 27, 64, 125],
  mode: 'markers',
  marker: { size: 12, color: 'steelblue' },
  type: 'scatter3d'
};

const container = document.createElement('div');
Plotly.newPlot(container, [trace], {
  title: '3D Scatter Plot',
  width: 640,
  height: 480
});
container;
```

## 🎨 Command Palette Commands

- **New Notebook**: Create a blank notebook
- **Open Notebook**: Open from file system
- **Save Notebook**: Save current notebook
- **Export Notebook**: Export to various formats
- **Run All Cells**: Execute all code cells
- **Add Code Cell**: Insert new code cell
- **Add Markdown Cell**: Insert new markdown cell
- **Toggle AI Chat**: Open/close AI assistant
- **Clear All Outputs**: Remove all cell outputs
- **Keyboard Shortcuts**: Show all shortcuts

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Svelte 3 with TypeScript
- **Build Tool**: Vite 3
- **Styling**: Tailwind CSS 4
- **Code Editor**: Monaco Editor
- **State**: Svelte Stores

### Desktop Stack
- **Framework**: Tauri 2
- **Backend**: Rust
- **Plugins**: Dialog, File System, Shell

### File Format
- Text-based `.js` format (git-friendly)
- Human-readable
- Compatible with JavaScript syntax highlighting
- Metadata in comments

## 🔐 Security

- Local-first architecture (no data sent to servers)
- AI API keys stored locally
- File system access through Tauri's secure APIs
- Content Security Policy configured

## 🚧 Future Enhancements

- [ ] Real-time collaboration
- [ ] Git integration
- [ ] Package management
- [ ] Python kernel support
- [ ] More visualization libraries
- [ ] Plugin system
- [ ] Themes and customization
- [ ] Cell folding and organization
- [ ] Variable inspector
- [ ] Debugger integration

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for guidelines.

## 🐛 Bug Reports

Report issues at: https://github.com/tangent-to/tangent-notebook/issues

## 📖 Documentation

Full documentation: https://tangent.to/docs

## 🙏 Acknowledgments

- Monaco Editor team
- Observable team for Plot
- Tauri team
- Svelte team
- All open source contributors
