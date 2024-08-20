-- CreateTable
CREATE TABLE "Taxi" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,

    CONSTRAINT "Taxi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trajectory" (
    "id" SERIAL NOT NULL,
    "taxi_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Trajectory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Taxi_plate_key" ON "Taxi"("plate");

-- CreateIndex
CREATE INDEX "Trajectory_taxi_id_idx" ON "Trajectory"("taxi_id");

-- AddForeignKey
ALTER TABLE "Trajectory" ADD CONSTRAINT "Trajectory_taxi_id_fkey" FOREIGN KEY ("taxi_id") REFERENCES "Taxi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
