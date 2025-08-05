# React Bootstrap Demo Package

A comprehensive showcase of React Bootstrap components built with React 18, Vite 6, and Bootstrap 5.

## Features

- **React 18** - Latest React with improved performance and features
- **Vite 6** - Next-generation frontend build tool with lightning-fast HMR
- **React Bootstrap** - Bootstrap components built for React
- **TypeScript** - Full type safety and developer experience
- **ESLint** - Code linting and quality checks

## Getting Started

### Installation

From the monorepo root:

```bash
pnpm install
```

### Development

Start the development server:

```bash
pnpm run --filter @core/bootstrap dev
```

This will start the Vite development server at `http://localhost:5173`.

### Build

Build for production:

```bash
pnpm run --filter @core/bootstrap build
```

### Preview

Preview the production build:

```bash
pnpm run --filter @core/bootstrap preview
```

## Components Showcase

This package demonstrates various React Bootstrap components:

### Navigation & Layout
- Navbar with responsive collapse
- Breadcrumb navigation
- Container, Row, and Col grid system

### Components
- Buttons and Button Groups
- Dropdowns and Split Buttons
- Badges and Progress Bars
- Cards and List Groups
- Tables with various styles
- Accordions

### Forms
- Basic form controls with validation
- Advanced form elements (select, textarea, file input)
- Input groups with prepends/appends
- Floating labels
- Form switches and ranges

### Modals
- Basic modal with header/body/footer
- Large modal with scrollable content
- Form modal with state management
- Confirmation modal with custom styling

## Project Structure

```
packages/bootstrap/
├── src/
│   ├── components/
│   │   ├── ComponentShowcase.tsx
│   │   ├── FormExamples.tsx
│   │   └── ModalExample.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Configuration

### Vite Configuration

The Vite configuration includes:
- React plugin for JSX transformation
- Development server on port 5173
- Production build optimizations
- Code splitting for vendor and bootstrap bundles
- Path alias (`@` -> `/src`)

### TypeScript Configuration

- Target ES2020 with modern features
- Strict type checking enabled
- Path mapping for cleaner imports
- React JSX transformation

### ESLint Configuration

- TypeScript ESLint rules
- React Hooks linting
- React Refresh plugin for HMR

## Usage

Import React Bootstrap components:

```tsx
import { Button, Card, Modal } from 'react-bootstrap'
// or for better tree-shaking
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
```

Bootstrap CSS is automatically imported in `src/index.css`:

```css
@import 'bootstrap/dist/css/bootstrap.min.css';
```

## Dependencies

### Production Dependencies
- `react` & `react-dom` ^18.3.1
- `react-bootstrap` ^2.10.5
- `bootstrap` ^5.3.3

### Development Dependencies
- `vite` ^6.0.1
- `@vitejs/plugin-react` ^4.3.4
- `typescript` ^5.6.3
- `eslint` & plugins for code quality

## Contributing

This package serves as a demonstration of React Bootstrap integration. Feel free to extend it with additional components or examples.

## Learn More

- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Bootstrap Documentation](https://getbootstrap.com/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)