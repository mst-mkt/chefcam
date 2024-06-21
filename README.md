<h1 align="center">ChefCam.</h1>

## Project description

Just take a picture of your refrigerator and you can instantly search for your dinner recipe.

### Features

- Upload a photo and food ingredients are automatically detected by AI
- Unwanted ingredients can be manually selected from the detected materials
- Search for recipes from cookpad based on the selected ingredients

### Tech stack

#### Frontend

- React
- Vite
- Tanstack Router
- Tailwind CSS

#### Backend

- Hono
- langchain
- cheerio

## Development

### install dependencies

```bash
pnpm i
```

### create environment files

```bash
cp apps/frontend/.env.local.example apps/frontend/.env.local
cp apps/backend/.dev.vars.example apps/backend/.dev.vars
```

### run dev server

```bash
pnpm dev
```

### check format and lint

```bash
pnpm check
```

### format and lint fix

```bash
pnpm fix
```

### typecheck

```bash
pnpm typecheck
```
