# Setup

Copy `.env.example` to `.env.local` and fill in the details

-   `DATABASE_URL`: URL to postgres database

```sh
npm install
npm run dev
```

# Additional Comments

## Pushing Schema Changes to Supabase

```sh
npx drizzle-kit push:pg
```

## Setting Up Husky, Prettier and Lint-Staged in your Next App

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

### Prettier

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

### ESLint

```sh
npm install eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin eslint-config-prettier eslint-plugin-prettier eslint-plugin-jsx-a11y --save-dev
```

If you get errors with conflicting versions, try the following command:

```sh
npm i @typescript-eslint/parser@latest
```

Then run the install command again. If all else fails, force the install by using `--force`

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

# Resources

## Designs

-   https://dribbble.com/shots/22970964-Language-flashcards
-   https://dribbble.com/shots/14043352-Flashcard-App-Concept
-   https://dribbble.com/shots/22487908-Kanji-Study-Flashcards
-   https://dribbble.com/shots/18574591-Language-app-flashcard-decks

## Auth

-   https://lucia-auth.com/
-   https://www.youtube.com/watch?v=JIIy7VkiTqU
