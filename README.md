# Setting Up Husky, Prettier and Lint-Staged in your Next App

```sh
npm i husky lint-staged prettier --save-dev
```

Add to `package.json`:

```json
"scripts": {
    ...
    "prepare": "husky"
},
```

Run

```sh
npm run prepare
```

Create pre-commit command

```sh
echo "npx lint-staged" > .husky/pre-commit
```

Add to `package.json`

```json
"lint-staged": {
    "*.{js,jsx,ts,tsx}": "eslint --fix",
    "*.{js,jsx,ts,tsx,css,md}": "prettier --write"
},
```

Test commit

```sh
git add .
git commit -m "feat: Add husky, lint-staged and prettier"
```

If you get the following error:

```
.husky/pre-commit: .husky/pre-commit: cannot execute binary file
husky - pre-commit script failed (code 126)
```

Delete `.husky/pre-commit` and manually recreate the file, and try again

Now, we set up plugins for prettier and eslint

## Prettier

Create a `.prettierrc` in the root.

```sh
npm install -D prettier-plugin-tailwindcss
```

```json
{
    "trailingComma": "es5",
    "tabWidth": 4,
    "semi": true,
    "singleQuote": false,
    "plugins": ["prettier-plugin-tailwindcss"]
}
```

## ESLint

```sh
npm install eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier eslint-plugin-jsx-a11y --save-dev --force
```

> Might need to add `--force` due to version conflict

Then fill up `.eslint.json`

```json
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:jsx-a11y/recommended",
        "next/core-web-vitals",
        "prettier"
    ],
    "plugins": ["@typescript-eslint", "import", "prettier"]
}
```
