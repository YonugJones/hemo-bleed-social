-- CreateEnum
CREATE TYPE "public"."HemophiliaType" AS ENUM ('A', 'B', 'C', 'VonWillebrand');

-- CreateEnum
CREATE TYPE "public"."HemophiliaSeverity" AS ENUM ('Mild', 'Moderate', 'Severe');

-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('Bleed', 'Infusion', 'Activity');

-- CreateEnum
CREATE TYPE "public"."BleedSeverity" AS ENUM ('Mild', 'Moderate', 'Severe');

-- CreateEnum
CREATE TYPE "public"."InfusionReason" AS ENUM ('Prophylaxis', 'ActivityRelated', 'ProcedureOrSurgery', 'Other');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "public"."HemophiliaType" NOT NULL DEFAULT 'A',
    "severity" "public"."HemophiliaSeverity" NOT NULL DEFAULT 'Mild',
    "medicineType" TEXT NOT NULL DEFAULT 'Unknown',
    "dosageAmount" INTEGER NOT NULL DEFAULT 0,
    "dosageFrequency" TEXT NOT NULL DEFAULT 'Unknown',
    "refreshToken" TEXT,
    "profilePic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "public"."EventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Bleed" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "severity" "public"."BleedSeverity" NOT NULL DEFAULT 'Mild',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "Bleed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Infusion" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "medicine" TEXT NOT NULL,
    "dosage" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "lotNumbers" TEXT NOT NULL,
    "reason" "public"."InfusionReason" NOT NULL,
    "note" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Infusion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "durationInMinutes" INTEGER NOT NULL,
    "isPhysicalTherapy" BOOLEAN NOT NULL,
    "note" TEXT,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bleed_eventId_key" ON "public"."Bleed"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Infusion_eventId_key" ON "public"."Infusion"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Activity_eventId_key" ON "public"."Activity"("eventId");

-- AddForeignKey
ALTER TABLE "public"."Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bleed" ADD CONSTRAINT "Bleed_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Infusion" ADD CONSTRAINT "Infusion_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
