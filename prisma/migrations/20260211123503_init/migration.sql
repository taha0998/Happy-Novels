-- CreateTable
CREATE TABLE "Novel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Novel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypeNovel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "novelId" TEXT NOT NULL,
    "typeId" TEXT NOT NULL,

    CONSTRAINT "TypeNovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Novel_title_key" ON "Novel"("title");

-- CreateIndex
CREATE INDEX "TypeNovel_novelId_idx" ON "TypeNovel"("novelId");

-- CreateIndex
CREATE INDEX "TypeNovel_typeId_idx" ON "TypeNovel"("typeId");

-- AddForeignKey
ALTER TABLE "TypeNovel" ADD CONSTRAINT "TypeNovel_novelId_fkey" FOREIGN KEY ("novelId") REFERENCES "Novel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TypeNovel" ADD CONSTRAINT "TypeNovel_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
