# Tangent Notebooks

A beautiful, local-first notebook application for JavaScript with AI-powered features and comprehensive visualization library support.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎨 **Beautiful UI** - Clean, modern interface inspired by Observable
- 🤖 **AI-Powered** - GitHub Copilot integration and AI chat assistant
- 📊 **Rich Visualizations** - Built-in support for Observable Plot, Plotly, D3.js, Vega-Lite, and Arquero
- 💻 **Desktop App** - Native desktop application via Tauri (no backend needed)
- 🔐 **Local-First** - All data stays on your machine
- ⚡ **Fast** - Built with Svelte and Vite
- ⌨️ **Keyboard-Driven** - Command palette and extensive shortcuts
- 📝 **Git-Friendly** - Text-based notebook format

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Rust (for desktop app only)

### Installation

```bash
# Clone the repository
git clone https://github.com/tangent-to/tangent-notebook.git
cd tangent-notebook

# Install dependencies
npm install
```

### Running the Application

**Web Version:**
```bash
npm run dev
# Visit http://localhost:5173
```

**Desktop App (Tauri):**
```bash
npm run tauri:dev
```

**Build for Production:**
```bash
# Web version
npm run build

# Desktop app
npm run tauri:build
```

## 📖 Usage

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Open Command Palette |
| `Ctrl/Cmd + /` | Toggle AI Chat |
| `Ctrl/Cmd + S` | Save Notebook |
| `Ctrl/Cmd + N` | New Notebook |
| `Ctrl/Cmd + O` | Open Notebook |
| `Ctrl/Cmd + Enter` | Run Current Cell |
| `Shift + Enter` | Run Cell and Select Next |
| `Alt + Enter` | Run Cell and Insert Below |

### AI Setup

1. **GitHub Copilot**:
   - Press `Ctrl/Cmd + /` to open AI chat
   - Click settings and enter your GitHub token
   - Get token from https://github.com/settings/tokens

2. **Claude API**:
   - Configure in AI settings with your Anthropic API key

3. **Ollama (Local)**:
   - Install from https://ollama.ai
   - Run `ollama pull codellama`
   - No API key needed!

### Visualization Examples

**Observable Plot:**
```javascript
import * as Plot from '@observablehq/plot';

Plot.plot({
  marks: [
    Plot.dot(data, {x: 'x', y: 'y', fill: 'category'})
  ],
  grid: true
})
```

**Arquero Data Manipulation:**
```javascript
import * as aq from 'arquero';

const data = aq.fromCSV(await fetch('data.csv').then(r => r.text()));
data.filter(d => d.value > 100).view();
```

See [IMPROVEMENTS.md](IMPROVEMENTS.md) for comprehensive examples.

## 🏗️ Architecture

```
tangent-notebook/
├── src/                    # Frontend source code
│   ├── App.svelte         # Main application
│   ├── lib/
│   │   ├── components/    # UI components
│   │   ├── stores/        # Svelte stores
│   │   └── utils/         # Utilities
│   └── main.ts            # Entry point
├── src-tauri/             # Rust backend for desktop app
│   ├── src/
│   │   └── lib.rs         # Tauri commands
│   └── tauri.conf.json    # Tauri configuration
├── public/                # Static assets
└── dist/                  # Build output
```

## 🛠️ Tech Stack

- **Frontend**: Svelte, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Editor**: Monaco Editor
- **Desktop**: Tauri (Rust)
- **Viz Libraries**: Observable Plot, Plotly, D3.js, Vega-Lite, Arquero

## 📦 File Format

Notebooks use a git-friendly text format (`.js` extension):

```javascript
// ---
// title: My Notebook
// id: notebook-12345
// ---

// %% [markdown]
/*
# Welcome to Tangent Notebooks
*/

// %% [javascript]
const data = [1, 2, 3, 4, 5];
console.log(data);
```

See [NOTEBOOK_FORMAT.md](NOTEBOOK_FORMAT.md) for details.

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Monaco Editor team
- Observable team for Plot
- Tauri team
- Svelte team
- All open source contributors

## 📞 Support

- 🐛 [Report Issues](https://github.com/tangent-to/tangent-notebook/issues)
- 📖 [Full Documentation](IMPROVEMENTS.md)
- 💬 Discussions (coming soon)

---

Made with ❤️ by the Tangent Notebooks team
