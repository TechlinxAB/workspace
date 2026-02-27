# Techlinx Workspace

## Environment

Create a `.env` file in the project root with:

```bash
AUTH_SECRET=
AUTH_URL=https://workspace.techlinx.se
AUTH_TRUST_HOST=true
DATABASE_URL=postgres://USER:PASS@127.0.0.1:5432/workspace
SEED_ADMIN_EMAIL=
SEED_ADMIN_PASSWORD=
SEED_ADMIN_NAME=Workspace Admin
```

- `AUTH_SECRET` should be a stable 32+ character random secret.
- Do not put secrets in any `NEXT_PUBLIC_` environment variable.

## Auth Notes

- There is no public signup.
- There is no forgot-password flow.
- Users receive credentials from Techlinx.
- Auth runs server-side with Auth.js and Prisma-backed database sessions.
- Admin-only APIs verify the session and require the `techlinx_admin` role server-side.
- Login attempts are rate-limited in memory for now.
  TODO: move the limiter to Redis before scaling to multiple instances.

## VPS Bootstrap

After env vars are present on the VPS:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run seed:admin
npm run build
pm2 restart <your-app-name>
```

- `npm run seed:admin` creates or updates the first `techlinx_admin` user from the `SEED_ADMIN_*` variables.
- Keep `AUTH_URL` set to the public aaPanel/nginx domain, for example `https://workspace.techlinx.se`.

## Verification Checklist

- Visiting `/` redirects to `/login` when logged out.
- Visiting `/dashboard` redirects to `/login` when logged out.
- Successful login redirects to `/dashboard` and renders the workspace shell.
- Invalid credentials show an inline error and do not return a 500.
- `techlinx_admin` can access `/admin/users`.
- Non-admin roles are redirected away from `/admin/*`.
- Admin can change a user role and activate or deactivate users.
- Disabled users are blocked from protected routes and see the disabled-account message.
