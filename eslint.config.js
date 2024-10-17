import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },

  // Use recommended type-checked configuration for TypeScript
  tseslint.configs.recommendedTypeChecked, // Updated based on Vite's recommendation

  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    languageOptions: {
      parserOptions: {
        // Set the parser options as recommended
        project: ['./tsconfig.node.json', './tsconfig.app.json'], // Adjust to your tsconfig paths
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Disable the rule that requires React in JSX scope
      'react/prop-types': 'off', // Disable prop-types rule for TypeScript
      // Add any other rules as necessary
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
