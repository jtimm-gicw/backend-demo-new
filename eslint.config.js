import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([

  // Ignore build output
  globalIgnores(['dist']),

  // =========================
  // FRONTEND REACT FILES
  // =========================
  {
    files: ['src/**/*.{js,jsx}'],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {

      // ✅ CHANGED:
      // Previously you had:
      // globals: globals.browser,
      // globals: globals.node,
      //
      // The second line overwrote the first.
      // If you need both browser and node globals,
      // combine them with the spread operator.
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // =========================
  // BACKEND NODE FILES
  // =========================
  {
    files: ['server.js'],

    languageOptions: {

      // ✅ CHANGED:
      // Expanded to object format for consistency.
      globals: {
        ...globals.node,
      },
    },
  },

]);