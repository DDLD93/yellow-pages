-- CreateTable
CREATE TABLE "business_registrations" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessRegCatType" TEXT NOT NULL,
    "businessLGA" TEXT NOT NULL,
    "businessWard" TEXT,
    "businessAddress" TEXT,
    "ownerFirstName" TEXT,
    "ownerSurname" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "search_logs" (
    "id" TEXT NOT NULL,
    "query" TEXT,
    "lga" TEXT,
    "category" TEXT,
    "verified" BOOLEAN,
    "resultsCount" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "search_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "business_registrations_status_idx" ON "business_registrations"("status");

-- CreateIndex
CREATE INDEX "search_logs_createdAt_idx" ON "search_logs"("createdAt");

-- CreateIndex
CREATE INDEX "search_logs_query_idx" ON "search_logs"("query");
