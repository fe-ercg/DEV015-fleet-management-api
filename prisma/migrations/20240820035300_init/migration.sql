/*
  Warnings:

  - You are about to drop the `Taxi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trajectory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Trajectory" DROP CONSTRAINT "Trajectory_taxi_id_fkey";

-- DropTable
DROP TABLE "Taxi";

-- DropTable
DROP TABLE "Trajectory";

-- CreateTable
CREATE TABLE "taxis" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,

    CONSTRAINT "taxis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trajectories" (
    "id" SERIAL NOT NULL,
    "taxi_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "trajectories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "taxis_plate_key" ON "taxis"("plate");

-- CreateIndex
CREATE INDEX "trajectories_taxi_id_idx" ON "trajectories"("taxi_id");

-- AddForeignKey
ALTER TABLE "trajectories" ADD CONSTRAINT "trajectories_taxi_id_fkey" FOREIGN KEY ("taxi_id") REFERENCES "taxis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
