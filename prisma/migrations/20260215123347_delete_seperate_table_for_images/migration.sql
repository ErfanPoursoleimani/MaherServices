/*
  Warnings:

  - You are about to drop the column `productImageId` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `tagImageId` on the `tag` table. All the data in the column will be lost.
  - You are about to drop the column `underTagImageId` on the `undertag` table. All the data in the column will be lost.
  - You are about to drop the `productimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tagimage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `undertagimage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_productImageId_fkey`;

-- DropForeignKey
ALTER TABLE `tag` DROP FOREIGN KEY `Tag_tagImageId_fkey`;

-- DropForeignKey
ALTER TABLE `undertag` DROP FOREIGN KEY `UnderTag_underTagImageId_fkey`;

-- DropIndex
DROP INDEX `Product_productImageId_key` ON `product`;

-- DropIndex
DROP INDEX `Tag_tagImageId_key` ON `tag`;

-- DropIndex
DROP INDEX `UnderTag_underTagImageId_key` ON `undertag`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `productImageId`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT 'https://i.imgur.com/wcZelbB.jpeg';

-- AlterTable
ALTER TABLE `tag` DROP COLUMN `tagImageId`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT 'https://i.imgur.com/wcZelbB.jpeg';

-- AlterTable
ALTER TABLE `undertag` DROP COLUMN `underTagImageId`,
    ADD COLUMN `images` VARCHAR(191) NOT NULL DEFAULT 'https://i.imgur.com/wcZelbB.jpeg';

-- DropTable
DROP TABLE `productimage`;

-- DropTable
DROP TABLE `tagimage`;

-- DropTable
DROP TABLE `undertagimage`;
