ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;

ALTER TYPE "Role" RENAME TO "Role_old";

CREATE TYPE "Role" AS ENUM (
  'techlinx_admin',
  'techlinx_webdev',
  'techlinx_marketing',
  'client_admin',
  'client_user'
);

ALTER TABLE "User"
ALTER COLUMN "role" TYPE "Role"
USING (
  CASE "role"::text
    WHEN 'admin' THEN 'techlinx_admin'
    WHEN 'customer' THEN 'client_user'
  END
)::"Role";

ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'client_user';

DROP TYPE "Role_old";
