import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Common hydration pattern in Next.js should not be an error
      "react-hooks/set-state-in-effect": "warn",
      // Keep unused vars as warnings, not errors, for better DX during development
      "@typescript-eslint/no-unused-vars": "warn",
      // Disabling some overly strict rules
      "@typescript-eslint/no-explicit-any": "warn",
      "react/no-unescaped-entities": "off",
    }
  },
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**"
    ]
  }
];

export default eslintConfig;
