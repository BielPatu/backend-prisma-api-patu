/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "surname" TEXT,
    "role" TEXT NOT NULL DEFAULT 'CLIENT'
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ToDoList" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ToDoList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ToDoList" ("completed", "createdAt", "id", "title", "updatedAt", "userId") SELECT "completed", "createdAt", "id", "title", "updatedAt", "userId" FROM "ToDoList";
DROP TABLE "ToDoList";
ALTER TABLE "new_ToDoList" RENAME TO "ToDoList";
CREATE INDEX "ToDoList_userId_idx" ON "ToDoList"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
