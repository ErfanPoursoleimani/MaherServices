/*
  Warnings:

  - You are about to drop the column `city` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `plaque` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `address` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `cartproduct` table. All the data in the column will be lost.
  - You are about to drop the column `originalPriceFa` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `priceFa` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `tagId` on the `tagimage` table. All the data in the column will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `notification` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productImageId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tagImageId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productImageId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `underTagId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tagImageId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cartproduct` DROP FOREIGN KEY `CartProduct_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `cartproduct` DROP FOREIGN KEY `CartProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_tagId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_productId_fkey`;

-- DropForeignKey
ALTER TABLE `tagimage` DROP FOREIGN KEY `TagImage_tagId_fkey`;

-- DropIndex
DROP INDEX `Address_userId_fkey` ON `address`;

-- DropIndex
DROP INDEX `CartProduct_productId_fkey` ON `cartproduct`;

-- DropIndex
DROP INDEX `Product_tagId_fkey` ON `product`;

-- DropIndex
DROP INDEX `Review_productId_fkey` ON `review`;

-- DropIndex
DROP INDEX `TagImage_tagId_fkey` ON `tagimage`;

-- AlterTable
ALTER TABLE `address` DROP COLUMN `city`,
    DROP COLUMN `isActive`,
    DROP COLUMN `plaque`,
    DROP COLUMN `postalCode`,
    DROP COLUMN `province`,
    DROP COLUMN `unit`,
    MODIFY `address` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `cartproduct` DROP COLUMN `quantity`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `originalPriceFa`,
    DROP COLUMN `priceFa`,
    DROP COLUMN `stock`,
    ADD COLUMN `productImageId` INTEGER NOT NULL,
    ADD COLUMN `underTagId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `isRead`,
    DROP COLUMN `productId`,
    ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `tagImageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tagimage` DROP COLUMN `tagId`;

-- DropTable
DROP TABLE `image`;

-- DropTable
DROP TABLE `notification`;

-- CreateTable
CREATE TABLE `UnderTag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `underTagImageId` INTEGER NOT NULL,
    `tagId` INTEGER NOT NULL,

    UNIQUE INDEX `UnderTag_underTagImageId_key`(`underTagImageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UnderTagImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Address_userId_key` ON `Address`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_productImageId_key` ON `Product`(`productImageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Review_orderId_key` ON `Review`(`orderId`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_tagImageId_key` ON `Tag`(`tagImageId`);

-- AddForeignKey
ALTER TABLE `Address` ADD CONSTRAINT `Address_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartProduct` ADD CONSTRAINT `CartProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_tagImageId_fkey` FOREIGN KEY (`tagImageId`) REFERENCES `TagImage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnderTag` ADD CONSTRAINT `UnderTag_underTagImageId_fkey` FOREIGN KEY (`underTagImageId`) REFERENCES `UnderTagImage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UnderTag` ADD CONSTRAINT `UnderTag_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_productImageId_fkey` FOREIGN KEY (`productImageId`) REFERENCES `ProductImage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_tagId_fkey` FOREIGN KEY (`tagId`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_underTagId_fkey` FOREIGN KEY (`underTagId`) REFERENCES `UnderTag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
