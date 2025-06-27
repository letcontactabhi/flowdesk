import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      // TypeScript best practices
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/prefer-const": "error",

      // React best practices
      "react/prop-types": "off", // Not needed with TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/display-name": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // General JavaScript/TypeScript best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-duplicate-imports": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-var": "error",

      // Code style and readability (non-formatting)
      "object-shorthand": "error",
      "prefer-template": "error",

      // Next.js specific
      "@next/next/no-img-element": "error",
      "@next/next/no-html-link-for-pages": "error",
    },
  },
  {
    ignores: [
      // Generated files
      "lib/generated/**/*",
      "prisma/generated/**/*",
      ".next/**/*",
      "out/**/*",
      "build/**/*",
      "dist/**/*",

      // Dependencies
      "node_modules/**/*",
      "pnpm-lock.yaml",
      "package-lock.json",
      "yarn.lock",

      // Config files (self-ignore)
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "tailwind.config.*",
      "postcss.config.*",

      // Static assets
      "public/**/*",

      // Database files
      "prisma/dev.db*",
      "*.sqlite",
      "*.db",

      // Logs and cache
      "*.log",
      ".cache/**/*",
      ".turbo/**/*",

      // IDE files
      ".vscode/**/*",
      ".idea/**/*",
      "*.swp",
      "*.swo",

      // Environment files
      ".env*",
      "!.env.example",
    ],
  },
]

export default eslintConfig
