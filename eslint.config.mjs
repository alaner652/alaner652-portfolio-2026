import tsPlugin from '@typescript-eslint/eslint-plugin'
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import tailwindPlugin from 'eslint-plugin-tailwindcss'

export default defineConfig([
  // Next.js core-web-vitals + TypeScript base
  ...nextVitals,
  ...nextTs,

  // Tailwind class ordering
  // no-custom-classname disabled: v4 design tokens defined in CSS are false positives
  ...tailwindPlugin.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        config: {},
        cssFiles: ['./src/app/globals.css'],
      },
    },
  },

  // Stricter TypeScript
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      'no-undef': 'off', // TypeScript handles undefined checks
    },
  },

  // Import ordering
  {
    plugins: { import: importPlugin },
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'index', 'object'],
          'newlines-between': 'always',
          pathGroups: [{ pattern: '@app/**', group: 'external', position: 'after' }],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  // Code quality
  {
    rules: {
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },

  // Ignore generated / build output
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'src/components/ui/**']),

  // Prettier last — disables all formatting rules that conflict
  prettierConfig,
])
