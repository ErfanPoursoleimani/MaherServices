/*
  Warnings:

  - The values [SENT,CANCELLED] on the enum `Order_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `images` on the `undertag` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('IN_PROGRESS', 'DONE') NOT NULL DEFAULT 'IN_PROGRESS';

-- AlterTable
ALTER TABLE `undertag` DROP COLUMN `images`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL DEFAULT 'https://i.imgur.com/wcZelbB.jpeg';

-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `role`;
