DROP INDEX IF EXISTS "vid-b-web_profiles_domain_domainVerified_index";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "vid-b-web_profiles_domain_userId_index" ON "vid-b-web_profiles" ("domain","userId");