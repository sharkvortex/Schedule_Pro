/*
  Warnings:

  - You are about to drop the `Subjects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Works` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Images` DROP FOREIGN KEY `Images_workId_fkey`;

-- DropForeignKey
ALTER TABLE `Works` DROP FOREIGN KEY `Works_subject_id_fkey`;

-- DropIndex
DROP INDEX `Images_workId_fkey` ON `Images`;

-- DropTable
DROP TABLE `Subjects`;

-- DropTable
DROP TABLE `Works`;

-- CreateTable
CREATE TABLE `Subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` VARCHAR(191) NOT NULL,
    `subject_name` VARCHAR(191) NOT NULL,
    `teacher_name` VARCHAR(191) NOT NULL,
    `study_day` ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    `time_start` VARCHAR(191) NOT NULL,
    `time_end` VARCHAR(191) NOT NULL,
    `period` ENUM('MORNING', 'AFTERNOON', 'EVENING') NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Subject_subject_id_key`(`subject_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Work` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `assignedDate` DATETIME(3) NOT NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `link` VARCHAR(191) NULL,
    `linkCode` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Work` ADD CONSTRAINT `Work_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Images` ADD CONSTRAINT `Images_workId_fkey` FOREIGN KEY (`workId`) REFERENCES `Work`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
