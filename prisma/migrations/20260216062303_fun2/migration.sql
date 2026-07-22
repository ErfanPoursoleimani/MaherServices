/*
  Warnings:

  - You are about to drop the column `tagId` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_underTagId_fkey`;

-- DropIndex
DROP INDEX `Product_tagId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Product_underTagId_fkey` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `tagId`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_underTagId_fkey` FOREIGN KEY (`underTagId`) REFERENCES `UnderTag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
