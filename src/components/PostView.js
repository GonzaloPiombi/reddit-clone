import CardSidebar from './CardSidebar';
import CardTop from './CardTop';
import CardBottom from './CardBottom';
import { PostCard } from './styles/Card.styled';
import ReactMarkdown from 'react-markdown';
import AddHttps from './AddHttps';

const PostView = ({ post, signIn }) => {
  return (
    <div>
      <PostCard>
        <CardSidebar votes={post.votes} path={post.path} signIn={signIn} />
        <CardTop author={post.author} date={post.date} subName={post.subName} />
        <h1>{post.title}</h1>
        <ReactMarkdown
          components={{
            a: ({ ...props }) => <AddHttps {...props} />,
          }}
        >
          {post.content}
        </ReactMarkdown>
        <CardBottom comments={post.comments} />
      </PostCard>
    </div>
  );
};

export default PostView;
