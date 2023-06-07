import {
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AddCommentToFirestore } from "../FirestoreQueries";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const AddComment = ({ post, comments, setComments }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const toast = useToast();
  const { user } = useAuth();
  const handleCommentSubmit = async () => {
    if (input.length > 0) {
      setError("");
      const body = {
        userId: user.uid,
        username: user.displayName,
        postId: post.id,
        text: input.trim(),
        created_on: Date.now(),
        updated_on: Date.now(),
      };
      try {
        const commentRes = await AddCommentToFirestore(body);
        const data = {
          id: commentRes.id,
          ...body,
        };
        setComments([data, ...comments]);

        toast({
          title: "Comment Added!",
          description: "Your comment has been added to the post.",
          status: "success",
          position: "bottom-right",
          duration: 9000,
          isClosable: true,
        });
        setInput("");
      } catch (err) {
        console.error(err);
      }
    } else {
      setError("Oh no! You can't post a blank entry.");
    }
  };
  return (
    <VStack my={7} alignItems="start" w="100%">
      <Heading size="md">Comments:</Heading>
      <FormControl>
        <Textarea
          borderColor="gray.400"
          focusBorderColor="themeColor.brown"
          maxLength="200"
          width="100%"
          minH="6rem"
          type="text"
          bgColor="white"
          placeholder="What's on your mind?"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <FormHelperText textAlign="end">
          {200 - input.length} characters left.
        </FormHelperText>
        {input.length === 0 && error && <Text color="red">{error}</Text>}
      </FormControl>

      <Button
        px={7}
        size="sm"
        colorScheme="green"
        bgColor="themeColor.pastel"
        color="black"
        type="submit"
        onClick={handleCommentSubmit}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default AddComment;
