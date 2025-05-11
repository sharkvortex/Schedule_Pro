/*
  Warnings:

  - You are about to drop the column `teacer_name` on the `Subjects` table. All the data in the column will be lost.
  - Added the required column `period` to the `Subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_name` to the `Subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Subjects_room_key` ON `Subjects`;

-- DropIndex
DROP INDEX `Subjects_study_day_key` ON `Subjects`;

-- DropIndex
DROP INDEX `Subjects_subject_name_key` ON `Subjects`;

-- DropIndex
DROP INDEX `Subjects_teacer_name_key` ON `Subjects`;

-- AlterTable
ALTER TABLE `Subjects` DROP COLUMN `teacer_name`,
    ADD COLUMN `period` ENUM('MORNING', 'AFTERNOON', 'EVENING') NOT NULL,
    ADD COLUMN `teacher_name` VARCHAR(191) NOT NULL;
