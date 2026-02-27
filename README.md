# Techlinx Workspace

## Environment

Set the following variables before running the app in development or production:

```bash
AUTH_SECRET=
AUTH_URL=https://workspace.techlinx.se
AUTH_TRUST_HOST=true
DATABASE_URL=postgres://USER:PASS@127.0.0.1:5432/workspace
SEED_ADMIN_EMAIL=
SEED_ADMIN_PASSWORD=
SEED_ADMIN_NAME=Workspace Admin
```

- `AUTH_SECRET` should be a 32+ character random secret.
- Do not put secrets in any `NEXT_PUBLIC_` environment variable.

## VPS Bootstrap

After the env vars are set on the VPS:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed:admin
npm run build
pm2 restart <your-app-name>
```

- `npm run seed:admin` creates or updates the first admin from `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, and `SEED_ADMIN_NAME`.
- The seed script also deletes existing sessions for that user so the updated credentials take effect immediately.
- Keep `AUTH_URL` set to the public aaPanel/nginx domain, for example `https://workspace.techlinx.se`.

## Auth Notes

- Auth is handled server-side with Auth.js route handlers and server actions.
- Sessions are stored in Postgres so admins can revoke access by deleting session rows or disabling a user.
- Login attempts are rate-limited in memory for now.
  TODO: replace the in-memory limiter with Redis before scaling to multiple app instances.
- Reverse-proxy deployments should keep `AUTH_TRUST_HOST=true` so forwarded host/proto headers are trusted behind aaPanel/nginx.

## Verification Checklist

- Unauthenticated requests to `/dashboard` redirect to `/login`.
- Logged in as a customer: `/admin/*` redirects to `/dashboard`, and admin API routes return `403`.
- Logged in as an admin: `/admin/users` can list, create, disable, re-role, and reset passwords for users.
- Disabling a user deletes active sessions so new protected requests are blocked immediately.
- Behind aaPanel/nginx, `AUTH_URL` and `AUTH_TRUST_HOST=true` should preserve correct callback and redirect behavior.
