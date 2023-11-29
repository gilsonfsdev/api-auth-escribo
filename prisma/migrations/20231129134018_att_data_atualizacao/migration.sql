/*
  Warnings:

  - Made the column `data_atualizacao` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "data_atualizacao" SET NOT NULL,
ALTER COLUMN "data_atualizacao" SET DEFAULT CURRENT_TIMESTAMP;
