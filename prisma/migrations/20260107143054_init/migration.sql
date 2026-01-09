-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `annoInizio` INTEGER NOT NULL,
    `annoFine` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Championship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` ENUM('LEAGUE', 'CUP') NOT NULL,
    `seasonId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fcMatchId` VARCHAR(191) NULL,
    `championshipId` INTEGER NULL,
    `data` DATETIME(3) NOT NULL,
    `avversario` VARCHAR(191) NOT NULL,
    `golFatti` INTEGER NOT NULL,
    `golSubiti` INTEGER NOT NULL,
    `youtubeUrl` VARCHAR(191) NULL,
    `stato` ENUM('DRAFT', 'PUBLISHED', 'REJECTED') NOT NULL DEFAULT 'DRAFT',
    `importedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Match_fcMatchId_key`(`fcMatchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `cognome` VARCHAR(191) NOT NULL,
    `numeroMaglia` INTEGER NOT NULL,
    `gamertag` VARCHAR(191) NOT NULL,
    `posizione` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Player_gamertag_key`(`gamertag`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayerStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `matchId` INTEGER NOT NULL,
    `voto` DOUBLE NOT NULL,
    `gol` INTEGER NOT NULL,
    `assist` INTEGER NOT NULL,
    `tiri` INTEGER NOT NULL,
    `salvataggi` INTEGER NOT NULL,
    `golSubiti` INTEGER NOT NULL,

    UNIQUE INDEX `PlayerStat_playerId_matchId_key`(`playerId`, `matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Championship` ADD CONSTRAINT `Championship_seasonId_fkey` FOREIGN KEY (`seasonId`) REFERENCES `Season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_championshipId_fkey` FOREIGN KEY (`championshipId`) REFERENCES `Championship`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerStat` ADD CONSTRAINT `PlayerStat_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayerStat` ADD CONSTRAINT `PlayerStat_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
