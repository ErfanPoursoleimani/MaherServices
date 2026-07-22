/*
  Warnings:

  - You are about to drop the column `orderId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `cartId` on the `order` table. All the data in the column will be lost.
  - Made the column `phoneNumber` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cartId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_cartId_fkey`;

-- DropIndex
DROP INDEX `Cart_orderId_key` ON `cart`;

-- DropIndex
DROP INDEX `Cart_userId_key` ON `cart`;

-- DropIndex
DROP INDEX `Order_cartId_key` ON `order`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `orderId`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `cartId`;

-- AlterTable
ALTER TABLE `user` MODIFY `phoneNumber` VARCHAR(191) NOT NULL,
    MODIFY `cartId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `_OrderToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderToProduct_AB_unique`(`A`, `B`),
    INDEX `_OrderToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToProduct` ADD CONSTRAINT `_OrderToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
