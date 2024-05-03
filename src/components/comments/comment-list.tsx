import { fetchCommentsByPostId, type CommentWithAuthor } from "@/db/queries/comments";
import CommentShow from "@/components/comments/comment-show";

interface CommentListProps {
  //fetchData: () => Promise<CommentWithAuthor[]>
  postId: string;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList(
  // { fetchData }: CommentListProps
  { postId }: CommentListProps
) {
  // const comments = await fetchData();
  const comments = await fetchCommentsByPostId(postId);

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );

  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        // comments={comments}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
