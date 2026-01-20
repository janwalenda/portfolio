import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    ".sst/**",
    ".vercel/**",
    ".netlify/**",
    "node_modules/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // ===== Formatting =====
      // Enforce double quotes
      "quotes": ["error", "double", { "avoidEscape": true }],
      "indent": ["error", 2, { "SwitchCase": 1 }],
      // Enforce final newline
      "eol-last": ["error", "always"],

      // ===== Import Organization =====
      // Temporarily disabled due to unrs-resolver native binding issues
      // See: https://github.com/npm/cli/issues/4828
      // "import/order": ["error", {
      //   "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
      //   "newlines-between": "always",
      //   "alphabetize": { "order": "asc", "caseInsensitive": true }
      // }],
      // "import/no-duplicates": "error",

      // ===== React Best Practices =====
      // No missing keys in lists (already in core-web-vitals, but explicit)
      "react/jsx-key": "error",
      // Warn against using index as key
      "react/no-array-index-key": "warn",
      // Self-closing tags for empty elements
      "react/self-closing-comp": ["error", {
        "component": true,
        "html": true
      }],

      // ===== TypeScript Best Practices =====
      // No unused vars (with _ prefix exception)
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      // Consistent type imports
      "@typescript-eslint/consistent-type-imports": ["error", {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }],

      // ===== General Best Practices =====
      // No console.log in production code
      "no-console": ["warn", { "allow": ["warn", "error"] }],

      // ===== Accessibility =====
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },
]);

export default eslintConfig;
