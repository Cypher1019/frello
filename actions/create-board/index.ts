"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CreateBoard } from "./schema";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/org-limit";

const handler = async (data: InputType): Promise<ReturnType> => {
  // Log the input data for debugging
  console.log("Received data:", data);

  // Authenticate user and organization
  const { userId, orgId } = await auth();
  
  // Log user authentication details
  console.log("Authenticated userId:", userId);
  console.log("Authenticated orgId:", orgId);

  if (!userId || !orgId) {
    console.error("Unauthorized: Missing userId or orgId");
    return {
      error: "Unauthorized"
    };
  }

  const canCreate = await hasAvailableCount();

  if (!canCreate) {
    return{
      error: "You have reached your limit of free boards . Please upgrade to create more."
    }
  }

  const { title, image } = data;

  // Split the image URL into components
  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  ] = image.split("|");

  // Log the split image components
  console.log("Parsed image details:", {
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName
  });

  // Check if any required image fields are missing
  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
    console.error("Missing image fields. Cannot create board.");
    return {
      error: "Missing fields. Failed to create Board."
    };
  }

  let board;

  try {
    // Try to create the board in the database
    console.log("Attempting to create board in DB...");
    board = await db.board.create({
      data: {
        title,
        orgId: orgId as string,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      }
    });

    await incrementAvailableCount();

    await createAuditLog({
                entityTitle: board.title,
                entityId: board.id,
                entityType: ENTITY_TYPE.BOARD,
                action: ACTION.CREATE,
     })

    // Log the created board object
    console.log("Board created successfully:", board);
  } catch (error) {
    // Log the actual error if something goes wrong
    console.error("Error while creating board:", error);
    return {
      error: "Failed to create."
    };
  }

  // Revalidate the path to update the UI
  console.log("Revalidating path for board:", board.id);
  revalidatePath(`/board/${board.id}`);

  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
