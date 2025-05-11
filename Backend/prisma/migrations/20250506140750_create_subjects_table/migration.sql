-- CreateTable
CREATE TABLE `Subjects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` VARCHAR(191) NOT NULL,
    `subject_name` VARCHAR(191) NOT NULL,
    `teacer_name` VARCHAR(191) NOT NULL,
    `study_day` VARCHAR(191) NOT NULL,
    `time_start` DATETIME(3) NOT NULL,
    `time_end` DATETIME(3) NOT NULL,
    `room` VARCHAR(191) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Subjects_subject_id_key`(`subject_id`),
    UNIQUE INDEX `Subjects_subject_name_key`(`subject_name`),
    UNIQUE INDEX `Subjects_teacer_name_key`(`teacer_name`),
    UNIQUE INDEX `Subjects_study_day_key`(`study_day`),
    UNIQUE INDEX `Subjects_room_key`(`room`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
