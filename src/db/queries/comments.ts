import type { Comment } from "@prisma/client";
import { cache } from "react";
import { db } from "@/db";

export type CommentWithAuthor = Comment & { 
  user : { 
    name: string | null,
    image: string | null 
  }
};

export const fetchCommentsByPostId = cache(( // request memoization, also included with fetch()
  postId: string
): Promise<CommentWithAuthor[]> => {
  return db.comment.findMany({
    where: { postId },
    include: {
      user: { // look for all related users by userId reference
        select: {
          name: true,
          image: true
        }
      }
    }
  })
})
