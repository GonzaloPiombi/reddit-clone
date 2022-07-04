import { StyledCommentSection, NoComments } from './styles/Comments.styled';
import Loader from './Loader';
import Comment from './Comment';

const Comments = ({
  comments,
  status,
  showCommentBox,
  commentBox,
  commentToReply,
  hideCommentBox,
  submitReply,
  isLoading,
}) => {
  const renderReplies = (replies) => {
    return (
      <Comments
        comments={replies}
        status={status}
        showCommentBox={showCommentBox}
        hideCommentBox={hideCommentBox}
        commentBox={commentBox}
        commentToReply={commentToReply}
        submitReply={submitReply}
        isLoading={isLoading}
      />
    );
  };

  if (!status) {
    return (
      <StyledCommentSection>
        <NoComments>
          <Loader />
        </NoComments>
      </StyledCommentSection>
    );
  }

  return (
    <StyledCommentSection>
      {comments.length === 0 ? (
        <NoComments>
          <p>No Comments Yet</p>
        </NoComments>
      ) : (
        comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              renderReplies={renderReplies}
              commentBox={commentBox}
              commentToReply={commentToReply}
              showCommentBox={showCommentBox}
              hideCommentBox={hideCommentBox}
              isLoading={isLoading}
              submitReply={submitReply}
            />
          );
        })
      )}
    </StyledCommentSection>
  );
};

export default Comments;
