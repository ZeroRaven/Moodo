import { Flex } from "@chakra-ui/react";
import Post from "./Post";

const AllPosts = ({ posts, setPosts }) => {
  return (
    <Flex alignItems="start" spacing={4} w="100%" flexWrap="wrap" gap="3rem">
      {posts && posts.map((post) => <Post post={post} posts={posts} setPosts={setPosts} key={post.id}/>)}
    </Flex>
  );
};

export default AllPosts;
