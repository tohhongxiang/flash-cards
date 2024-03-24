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
