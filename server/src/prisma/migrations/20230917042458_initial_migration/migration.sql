-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Disponivel', 'Reservado', 'EmUso');

-- CreateTable
CREATE TABLE "Tool" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "coletaEm" TIMESTAMP(3),
    "devolucaoEm" TIMESTAMP(3),
    "mecanico" TEXT,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);
