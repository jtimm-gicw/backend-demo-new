import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([

  // Ignore dist folder
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

      // Browser globals for React
      globals: globals.browser,
      globals: globals.node, //for inline comments in server.js

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

      // Node globals for Express
      globals: globals.node,
    },
  },

]);