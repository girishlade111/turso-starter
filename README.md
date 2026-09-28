# Turso Starter

A minimal todo app starter built on Next.js 15 + Turso (libSQL) + Drizzle ORM — a ready-to-clone template for serverless SQLite apps. Originally generated with [v0.app](https://v0.app).

## What it does

A clean, minimal todo list app backed by a Turso database:

- Add todos with title + optional description
- Toggle complete/incomplete, delete todos
- Live completed/total counter
- If no database is configured, the UI shows a setup checklist instead of crashing

## Features

- Server actions (`lib/actions.ts`) for get/create/toggle/delete todos with `revalidatePath`
- Drizzle ORM with the `turso` dialect (`drizzle.config.ts`)
- Graceful degradation when `TURSO_*` env vars are missing
- Radix UI primitives + Tailwind CSS + Geist fonts
- SQL setup script (`scripts/001-create-todos-table.js`)

## Tech stack

- **Next.js** 15.2.4 (App Router) + **React** 19 + TypeScript
- **Turso** (libSQL edge database) via `@libsql/client`
- **Drizzle ORM** + `drizzle-kit`
- **Tailwind CSS** 3.4, **Radix UI**, **lucide-react**, **next-themes**

## Quick start

1. Create a free Turso database at [turso.tech](https://turso.tech):

```bash
turso db create my-todos
turso db tokens create my-todos
```

2. Set the env vars (see below), then:

```bash
npm install
node scripts/001-create-todos-table.js   # or run the SQL in the Turso shell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
app/
  page.tsx            # Todo list page (reads via getTodos server action)
  layout.tsx          # Root layout
db/
  schema.ts           # todos table (id, title, description, completed, timestamps)
  index.ts            # libsql client + drizzle instance
lib/
  actions.ts          # Server actions: getTodos, createTodo, toggleTodo, deleteTodo
components/
  todo-form.tsx       # Add-todo form
  todo-item.tsx       # Single todo row
  ui/                 # Radix-based UI primitives
scripts/
  001-create-todos-table.js   # DB init script
drizzle.config.ts     # drizzle-kit config (turso dialect)
```

## Env vars

| Variable | Required | Description |
|---|---|---|
| `TURSO_DATABASE_URL` | yes | Turso DB URL (e.g. `libsql://<name>-<org>.turso.io`) |
| `TURSO_AUTH_TOKEN` | yes | Turso auth token |

Never commit these — `.env*` is gitignored.

## Deployment

This app needs a **Node server** (server actions) and a Turso database, so it cannot be statically exported. Deploy on **Vercel** (set the two env vars in project settings) or any Node host with `npm run build && npm start`.

**Not deployed to GitHub Pages** — server actions and secret env vars require a server.

## Credits

Built by Girish Lade — [https://ladestack.in](https://ladestack.in)
