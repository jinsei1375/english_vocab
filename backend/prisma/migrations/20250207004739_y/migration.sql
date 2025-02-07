/*
  Warnings:

  - A unique constraint covering the columns `[user_id,setting_key,deleted_at]` on the table `user_settings` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_settings_user_id_setting_key_key";

-- CreateIndex
CREATE UNIQUE INDEX "user_settings_user_id_setting_key_deleted_at_key" ON "user_settings"("user_id", "setting_key", "deleted_at");
