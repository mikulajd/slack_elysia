-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Conversation" (
    "conversationId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conversationName" TEXT,
    "initiatorId" INTEGER NOT NULL,
    "recipientId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Conversation_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Conversation_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Conversation" ("conversationId", "conversationName", "createdAt", "initiatorId", "recipientId", "updatedAt") SELECT "conversationId", "conversationName", "createdAt", "initiatorId", "recipientId", "updatedAt" FROM "Conversation";
DROP TABLE "Conversation";
ALTER TABLE "new_Conversation" RENAME TO "Conversation";
CREATE TABLE "new_Message" (
    "messageId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "messageContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation" ("conversationId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Message" ("messageId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("conversationId", "createdAt", "messageContent", "messageId", "parentId", "updatedAt", "userId") SELECT "conversationId", "createdAt", "messageContent", "messageId", "parentId", "updatedAt", "userId" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_Reaction" (
    "reactionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reactionTypeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "messageId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Reaction_reactionTypeId_fkey" FOREIGN KEY ("reactionTypeId") REFERENCES "ReactionType" ("reactionTypeId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Reaction_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message" ("messageId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Reaction" ("createdAt", "messageId", "reactionId", "reactionTypeId", "updatedAt", "userId") SELECT "createdAt", "messageId", "reactionId", "reactionTypeId", "updatedAt", "userId" FROM "Reaction";
DROP TABLE "Reaction";
ALTER TABLE "new_Reaction" RENAME TO "Reaction";
CREATE UNIQUE INDEX "Reaction_userId_messageId_key" ON "Reaction"("userId", "messageId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
