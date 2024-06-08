-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `icon_url` VARCHAR(512) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SpotifyAuth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `spotify_id` VARCHAR(191) NOT NULL,
    `subscription_type` VARCHAR(32) NOT NULL,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `SpotifyAuth_spotify_id_key`(`spotify_id`),
    UNIQUE INDEX `SpotifyAuth_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SpotifyAuth` ADD CONSTRAINT `SpotifyAuth_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
