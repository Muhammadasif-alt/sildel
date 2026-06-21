-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(120) NOT NULL,
    `name` VARCHAR(160) NOT NULL,
    `tagline` VARCHAR(255) NOT NULL DEFAULT '',
    `category` ENUM('Sculpture', 'Tables', 'Lighting', 'FineArts') NOT NULL,
    `priceCents` INTEGER NOT NULL,
    `currency` VARCHAR(8) NOT NULL DEFAULT 'EUR',
    `badge` VARCHAR(120) NULL,
    `material` VARCHAR(255) NULL,
    `description` TEXT NOT NULL,
    `longDescription` JSON NOT NULL,
    `image` VARCHAR(500) NOT NULL,
    `gallery` JSON NOT NULL,
    `inStock` BOOLEAN NOT NULL DEFAULT true,
    `editionSize` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_slug_key`(`slug`),
    INDEX `Product_category_idx`(`category`),
    INDEX `Product_inStock_idx`(`inStock`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Blog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(160) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `image` VARCHAR(500) NOT NULL,
    `imageAlt` VARCHAR(255) NOT NULL DEFAULT '',
    `author` VARCHAR(120) NOT NULL,
    `authorRole` VARCHAR(160) NOT NULL DEFAULT '',
    `date` DATETIME(3) NOT NULL,
    `readMinutes` INTEGER NOT NULL DEFAULT 5,
    `tag` ENUM('Atelier', 'Forest', 'Craft', 'Material', 'Collectors') NOT NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `body` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Blog_slug_key`(`slug`),
    INDEX `Blog_tag_idx`(`tag`),
    INDEX `Blog_featured_idx`(`featured`),
    INDEX `Blog_published_idx`(`published`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MediaAsset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(500) NOT NULL,
    `filename` VARCHAR(255) NOT NULL,
    `mimeType` VARCHAR(120) NOT NULL,
    `size` INTEGER NOT NULL DEFAULT 0,
    `width` INTEGER NOT NULL DEFAULT 0,
    `height` INTEGER NOT NULL DEFAULT 0,
    `altPt` VARCHAR(255) NOT NULL DEFAULT '',
    `altEn` VARCHAR(255) NOT NULL DEFAULT '',
    `title` VARCHAR(255) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MediaAsset_url_key`(`url`),
    INDEX `MediaAsset_mimeType_idx`(`mimeType`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
