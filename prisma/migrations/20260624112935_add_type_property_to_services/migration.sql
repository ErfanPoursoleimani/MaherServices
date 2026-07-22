-- AlterTable
ALTER TABLE `product` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'Product';

-- AlterTable
ALTER TABLE `tag` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'Tag';

-- AlterTable
ALTER TABLE `undertag` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'UnderTag';
