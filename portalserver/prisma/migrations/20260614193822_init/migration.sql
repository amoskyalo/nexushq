/*
  Warnings:

  - A unique constraint covering the columns `[email,orgId]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber,orgId]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "employees_email_phoneNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "employees_email_orgId_key" ON "employees"("email", "orgId");

-- CreateIndex
CREATE UNIQUE INDEX "employees_phoneNumber_orgId_key" ON "employees"("phoneNumber", "orgId");
