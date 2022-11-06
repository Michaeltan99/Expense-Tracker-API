/*
  Warnings:

  - You are about to drop the column `created_at` on the `transaction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `created_at`,
    ADD COLUMN `creat_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `update_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
