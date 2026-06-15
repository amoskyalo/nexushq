/*
  Warnings:

  - A unique constraint covering the columns `[email,phoneNumber]` on the table `employees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "employees_email_phoneNumber_key" ON "employees"("email", "phoneNumber");
