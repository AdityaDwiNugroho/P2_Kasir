-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('EMPLOYED', 'TERMINATED');

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "nama_user" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "Role" "Role" NOT NULL,
    "alamat" TEXT NOT NULL,
    "hp" TEXT NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Pelanggan" (
    "id_pelanggan" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "hp" TEXT NOT NULL,

    CONSTRAINT "Pelanggan_pkey" PRIMARY KEY ("id_pelanggan")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id_kategori" TEXT NOT NULL,
    "nama_kategori" TEXT NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "Produk" (
    "id_produk" SERIAL NOT NULL,
    "nama_produk" TEXT NOT NULL,
    "harga_beli" DECIMAL(65,30) NOT NULL,
    "harga_jual" DECIMAL(65,30) NOT NULL,
    "stok" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "kategoriId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produk_pkey" PRIMARY KEY ("id_produk")
);

-- CreateTable
CREATE TABLE "Penjualan" (
    "id_penjualan" SERIAL NOT NULL,
    "diskon" DECIMAL(65,30) NOT NULL,
    "total_harga" DECIMAL(65,30) NOT NULL,
    "tanggal_penjualan" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "pelangganId" INTEGER NOT NULL,

    CONSTRAINT "Penjualan_pkey" PRIMARY KEY ("id_penjualan")
);

-- CreateTable
CREATE TABLE "DetailPenjualan" (
    "id" SERIAL NOT NULL,
    "harga_jual" DECIMAL(65,30) NOT NULL,
    "qty" INTEGER NOT NULL,
    "sub_total" DECIMAL(65,30) NOT NULL,
    "tanggal_penjualan" TIMESTAMP(3) NOT NULL,
    "produkId" INTEGER NOT NULL,
    "penjualanId" INTEGER NOT NULL,

    CONSTRAINT "DetailPenjualan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Produk" ADD CONSTRAINT "Produk_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id_kategori") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penjualan" ADD CONSTRAINT "Penjualan_pelangganId_fkey" FOREIGN KEY ("pelangganId") REFERENCES "Pelanggan"("id_pelanggan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPenjualan" ADD CONSTRAINT "DetailPenjualan_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk"("id_produk") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DetailPenjualan" ADD CONSTRAINT "DetailPenjualan_penjualanId_fkey" FOREIGN KEY ("penjualanId") REFERENCES "Penjualan"("id_penjualan") ON DELETE RESTRICT ON UPDATE CASCADE;
