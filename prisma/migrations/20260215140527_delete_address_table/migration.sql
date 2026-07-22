/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `address` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `address`;
