/*
  Warnings:

  - You are about to drop the column `inStock` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `underTagId` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `inStock`;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_underTagId_fkey` FOREIGN KEY (`underTagId`) REFERENCES `UnderTag`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
