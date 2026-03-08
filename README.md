# Hindu Hate Index Platform

A comprehensive, data-driven platform tracking incidents of hate speech, discrimination, and violence targeting Hindu individuals and communities worldwide.

## 🌐 Live Demo

Visit the live platform at: [https://huiglobal.github.io/hhindex](https://huiglobal.github.io/hhindex)

## 📋 Overview

The Hindu Hate Index Platform provides:

- **Global Heatmap**: Interactive geographic visualization of hate incidents
- **Regional Analysis**: Detailed statistics and trends by region
- **Incident Tracking**: Comprehensive database of documented incidents
- **Research Articles**: In-depth analysis and investigative reports
- **Data Visualization**: Charts, graphs, and interactive dashboards

## 🏗️ Project Structure

```
hindu-hate-index/
├── platform/
│   ├── frontend/          # React + TypeScript web application
│   ├── backend/           # Backend API (future)
│   └── ai-components/     # AI/ML components (future)
├── docs/                  # Documentation and research
├── data/                  # Data files and taxonomy
├── design/                # Design assets and mockups
└── .kiro/                 # Kiro AI specs and workflows
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/huiglobal/hhindex.git
cd hhindex
```

2. Install frontend dependencies:
```bash
cd platform/frontend
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🛠️ Development

### Available Scripts

In the `platform/frontend` directory:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- TailwindCSS
- React Query (TanStack Query)
- React Router
- Leaflet (for maps)
- Framer Motion (animations)

## 📊 Features

### Current Features

- ✅ Interactive global heatmap with incident data
- ✅ Regional statistics and analysis
- ✅ Incident categorization (8 taxonomy categories)
- ✅ Featured research articles
- ✅ Responsive design with dark theme
- ✅ Data export (GeoJSON, PNG)
- ✅ Hotspot detection
- ✅ Campaign cluster visualization

### Planned Features

- 🔄 Backend API integration
- 🔄 Real-time data updates
- 🔄 User authentication
- 🔄 Advanced filtering and search
- 🔄 AI-powered analysis
- 🔄 Multi-language support

## 🎨 Design System

The platform uses a carefully crafted color scheme:

- **Primary Colors**: Saffron (#FF9933), Maroon (#800020)
- **Background**: Navy (#0F1829, #1B2A4A, #2C3E6B)
- **Text**: Ivory (#FDFAF5)
- **Fonts**: Playfair Display, Source Sans 3, Source Serif 4

## 📝 Documentation

Detailed documentation is available in the `/docs` directory:

- Executive Summary
- Methodology
- Research Papers
- Data Specifications

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines (coming soon).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- **Website**: [https://huiglobal.github.io/hhindex](https://huiglobal.github.io/hhindex)
- **Organization**: [HUI Global](https://github.com/huiglobal)
- **Issues**: [Report a bug or request a feature](https://github.com/huiglobal/hhindex/issues)

## 📧 Contact

For questions or inquiries, please open an issue on GitHub.

---

**Note**: This platform is built with Kiro AI assistance. The `.kiro/specs` directory contains the AI-driven development specifications and workflows.
