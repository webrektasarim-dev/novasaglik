-- CreateTable
CREATE TABLE IF NOT EXISTS "SiteSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Insert default settings
INSERT INTO "SiteSettings" ("id", "maintenanceMode", "updatedAt")
VALUES ('site-settings', false, NOW())
ON CONFLICT ("id") DO NOTHING;

