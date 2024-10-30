-- CreateEnum
CREATE TYPE "SentimentLabel" AS ENUM ('POSITIVE', 'NEGATIVE');

-- AlterTable
ALTER TABLE "QuestionAnswer" ADD COLUMN     "sentimentLabel" "SentimentLabel",
ADD COLUMN     "sentimentScore" DOUBLE PRECISION;
