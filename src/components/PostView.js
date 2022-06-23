import CardSidebar from './CardSidebar';
import CardTop from './CardTop';
import CardBottom from './CardBottom';
import { PostCard } from './styles/Card.styled';

const PostView = ({ post }) => {
  return (
    <div style={{ marginTop: '75px' }}>
      <PostCard>
        <CardSidebar votes={post.votes} />
        <CardTop author={post.author} date={post.date} subName={post.subName} />
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <CardBottom comments={post.comments} />
      </PostCard>
    </div>
  );
};

export default PostView;
