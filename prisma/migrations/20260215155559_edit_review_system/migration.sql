/*
  Warnings:

  - You are about to drop the column `rating` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `Review_userId_fkey`;

-- DropIndex
DROP INDEX `Review_userId_fkey` ON `review`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `rating`,
    DROP COLUMN `title`,
    DROP COLUMN `userId`;
