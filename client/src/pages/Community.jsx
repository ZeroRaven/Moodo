import {
  Container,
  Heading,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { queryAllPosts } from "../FirestoreQueries";
import { useAuth } from "../contexts/AuthProvider";
import { format } from "date-fns";
import AddPost from "../components/AddPost";
import AllPosts from "../components/AllPosts";

const Community = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const getQuery = async () => {
      const queryArr = [];

      try {
        const queryRes = await queryAllPosts();
        queryRes.forEach((snap) => {
          const data = { id: snap.id, ...snap.data() };
          queryArr.push(data);
        });
        setPosts(queryArr);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    setIsLoading(true);
    getQuery();
  }, []);
  if (isLoading)
    return (
      <Container centerContent>
        <Heading size="lg">
          <Spinner
            mr="1rem"
            mt="10rem"
            size="xl"
            emptyColor="gray.200"
            color="orange.500"
          />
          ...LOADING
        </Heading>
      </Container>
    );

  return (
    <VStack
      bg="themeColor.beige"
      p={{base:"1.5rem", sm:"2rem",md:"5rem"}}
      w="100%"
      mx="auto"    
    >
      <Heading>Discussion Board</Heading>
      <AddPost posts={posts} setPosts={setPosts}/>
      <AllPosts posts={posts} setPosts={setPosts}/>
    </VStack>
  );
};

export default Community;
