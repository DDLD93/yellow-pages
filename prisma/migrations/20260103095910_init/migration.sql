-- CreateTable
CREATE TABLE "businesses" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessRegCatType" TEXT NOT NULL,
    "businessLGA" TEXT NOT NULL,
    "businessWard" TEXT,
    "businessAddress" TEXT,
    "ownerAtBusinessPhotoUrl" TEXT,
    "status" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bvn" TEXT,
    "dob" TIMESTAMP(3),
    "bankAccountNumber" TEXT,
    "bankName" TEXT,
    "ownerPersonalPhoto" TEXT,

    CONSTRAINT "businesses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "businesses_status_idx" ON "businesses"("status");

-- CreateIndex
CREATE INDEX "businesses_businessLGA_idx" ON "businesses"("businessLGA");

-- CreateIndex
CREATE INDEX "businesses_businessRegCatType_idx" ON "businesses"("businessRegCatType");

-- CreateIndex
CREATE INDEX "businesses_businessName_idx" ON "businesses"("businessName");
