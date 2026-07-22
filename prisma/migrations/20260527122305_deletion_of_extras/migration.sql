/*
  Warnings:

  - You are about to drop the column `underTagId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `address` DROP FOREIGN KEY `Address_userId_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_underTagId_fkey`;

-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_orderId_fkey`;

-- DropIndex
DROP INDEX `Order_underTagId_fkey` ON `order`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `underTagId`;

-- DropTable
DROP TABLE `address`;

-- DropTable
DROP TABLE `review`;
