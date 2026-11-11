# Fort Sokera Maintenance Scheduler

Fort Sokera Maintenance Scheduler is a frontend prototype for a property-maintenance workspace. Its dashboard presents an overview for property administrators, including maintenance-request statistics and a recent-requests table.

The current dashboard is a UI prototype: its statistics are placeholders, the request list is empty, and the navigation items are not connected to pages. The project does not yet include a backend, authentication, or persistent storage.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

The Vite application is in the `maintenance-app/` directory:

```bash
cd maintenance-app
npm ci
npm run dev
```

Open the local URL printed by Vite in your browser (normally <http://localhost:5173>).

## Available commands

Run these commands from `maintenance-app/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload. |
| `npm run build` | Create a production build in `maintenance-app/dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint on the application. |

## Technology

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint

For application-specific setup notes, see [`maintenance-app/README.md`](maintenance-app/README.md).
