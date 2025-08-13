# Copilot Instructions for react-ai-chatbot Workspace

## Overview
This workspace contains multiple React projects, each in its own folder. The main projects are:
- `react-ai-chatbot`: Vite-based React chatbot with modular assistant integration
- `react-crash-course`: Create React App (CRA) e-commerce demo
- `react-todo-list`: Vite-based React todo app

## Project Structure & Patterns
- Each project is self-contained with its own `src/`, `public/`, and config files.
- `react-ai-chatbot/src/assistants/` contains logic for different AI providers (e.g., `openai.js`, `googleai.js`). Each file exports functions for interacting with a specific provider.
- `react-ai-chatbot/src/components/` is organized by feature (e.g., `chat`, `messages`, `sidebar`). Each feature has its own folder with a main component and CSS module.
- The `Messages` component groups messages by user/assistant turns and renders markdown using `react-markdown`.
- All styles use CSS modules for local scoping.

## Key Workflows
- **Development (Vite projects):**
  - Start dev server: `npm run dev` (default port 5173)
  - Build: `npm run build`
  - Preview: `npm run preview`
- **Development (CRA project):**
  - Start dev server: `npm start` (default port 3000)
  - Test: `npm test`
  - Build: `npm run build`
- **Linting:**
  - Vite projects: `npm run lint` (if configured)
- **Adding a new AI assistant:**
  - Add a new file in `src/assistants/` following the pattern in `openai.js`.
  - Export a function that takes user input and returns a response.
  - Register the assistant in the main app if needed.

## Conventions & Integration
- Use functional React components and hooks (`useState`, `useEffect`, `useMemo`, etc.).
- Group related UI and logic in feature folders.
- Use markdown for assistant message rendering.
- All cross-component communication is via props; no global state management is used by default.
- No TypeScript or Redux in these projects.
- External dependencies: `react-markdown` for markdown rendering, Vite or CRA for build tooling.

## Examples
- To add a new message type, update the `Messages` component and its CSS module.
- To add a new assistant, copy the structure of `src/assistants/openai.js`.
- To add a new UI feature, create a new folder in `src/components/` and use CSS modules for styling.

## References
- See each project's `README.md` for project-specific scripts and details.
- Key files: `src/assistants/`, `src/components/messages/messages.jsx`, `vite.config.js`, `package.json`.

---
For questions or unclear patterns, review the code in `src/assistants/` and `src/components/` for concrete examples.
