/*
  Warnings:

  - You are about to drop the column `receiverId` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `transactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountHash]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverHashAccount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderHashAccount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - The required column `accountHash` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_senderId_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "receiverHashAccount" TEXT NOT NULL,
ADD COLUMN     "senderHashAccount" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "accountHash" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_accountHash_key" ON "users"("accountHash");

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_senderHashAccount_fkey" FOREIGN KEY ("senderHashAccount") REFERENCES "users"("accountHash") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_receiverHashAccount_fkey" FOREIGN KEY ("receiverHashAccount") REFERENCES "users"("accountHash") ON DELETE RESTRICT ON UPDATE CASCADE;
