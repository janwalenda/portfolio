import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import eslintConfigPrettier from "eslint-config-prettier";

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
    "public/**",
    "sanity.types.ts",
  ]),
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // ===== Structure / readability (Prettier handles formatting) =====
      "padding-line-between-statements": [
        "error",
        // Blank line after block statements (if, for, while, switch, try, etc.)
        { blankLine: "always", prev: "block-like", next: "*" },
        // Blank line after variable declarations (const, let, var)
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        // Blank line before return statements
        { blankLine: "always", prev: "*", next: "return" },
      ],

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
      "react/self-closing-comp": [
        "error",
        {
          component: true,
          html: true,
        },
      ],

      // ===== TypeScript Best Practices =====
      // No unused vars (with _ prefix exception)
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Consistent type imports
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      // ===== General Best Practices =====
      // No console.log in production code
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // ===== Accessibility =====
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },
  {
    files: ["./**/*.{tsx,jsx}"],
    rules: {
      // Keep UI components focused and easy to scan
      "max-lines": [
        "error",
        {
          max: 80,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },
  // Must be last: turn off ESLint rules that conflict with Prettier
  eslintConfigPrettier,
]);

export default eslintConfig;
