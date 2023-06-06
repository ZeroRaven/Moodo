import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";

import { format, formatDistance } from "date-fns";
import { useAuth } from "../contexts/AuthProvider";
import { deletePost, updatePostLike } from "../FirestoreQueries";
import PostDetails from "./PostDetails";
import { useRef } from "react";

const Post = ({ post, setPosts, posts }) => {
  const finalRef = useRef(null);
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const handleLike = async (postToLike) => {
    try {
      await updatePostLike(postToLike, user.uid);
      if (!postToLike.likes.includes(user.uid)) {
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost.id === postToLike.id
              ? { ...prevPost, likes: [...prevPost.likes, user.uid] }
              : prevPost
          )
        );
      } else {
        setPosts((prevPosts) =>
          prevPosts.map((prevPost) =>
            prevPost.id === postToLike.id
              ? {
                  ...prevPost,
                  likes: prevPost.likes.filter((userId) => userId !== user.uid),
                }
              : prevPost
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter((post) => post.id !== postId));
      toast({
        title: "Post Deleted!",
        description: "Your post has been deleted from the discussion board.",
        status: "warning",
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Card
      as="button"
      bg="themeColor.pastel"
      opacity=".85"
      variant="elevated"
      borderRadius="3rem"
      key={post.id}
      width="30%"
      minW="20rem"
      textAlign="start"
    >
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={5} borderRadius="1.6rem">
          <ModalHeader>
            <Heading>{post.username}</Heading>
            <Badge colorScheme="yellow" variant="outline">
              {formatDistance(Date.now(), post.created_on)} ago
            </Badge>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text>{post.text}</Text>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              {post.likes.includes(user.uid) ? (
                <Button colorScheme="orange" onClick={() => handleLike(post)}>
                  Unlike
                </Button>
              ) : (
                <Button
                  bgColor="themeColor.pastel"
                  color="black"
                  colorScheme="green"
                  onClick={() => handleLike(post)}
                >
                  Like
                </Button>
              )}
              <Button colorScheme="yellow" onClick={onClose}>
                Comment
              </Button>
              {user.uid === post.userId && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handlePostDelete(post.id)}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <CardBody w="100%" px="3rem" pt="3rem" pb="0" onClick={onOpen}>
        <HStack display={{ xl: "flex" }} maxW="100%">
          <Avatar name={post.username} bg="orange.300" size="md" />
          <Heading fontSize="lg">{post.username}</Heading>
          <Badge colorScheme="yellow" variant="outline">
            {formatDistance(Date.now(), post.created_on)} ago
          </Badge>
        </HStack>
        <Text
          mt={5}
          fontSize="md"
          minH="4rem"
          overflow="hidden"
          textOverflow="ellipsis"
          css={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {post.text}
          {format(post.created_on, "yyyy-MM-dd") ===
          format(post.updated_on, "yyyy-MM-dd") ? (
            <></>
          ) : (
            <Tooltip label={formatDistance(Date.now(), post.updated_on)}>
              <Badge size="xs" variant="outline" colorScheme="orange" ml={3}>
                Edited
              </Badge>
            </Tooltip>
          )}
        </Text>
      </CardBody>
      <CardFooter pt="0" pb="2rem">
        <ButtonGroup>
          <Box>
            <IconButton
              icon={<AiFillHeart />}
              bg="transparent"
              fontSize="1.6rem"
              color="themeColor.red"
              _hover={{ bg: "transparent", color: "red.600" }}
              onClick={() => handleLike(post)}
            />
            <Badge fontSize="1rem" bg="transparent">
              {post.likes.length}
            </Badge>
          </Box>

          <IconButton
            icon={<FaComment />}
            bg="transparent"
            fontSize="1.6rem"
            color="themeColor.yellow"
            _hover={{ bg: "transparent", color: "yellow.500" }}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Post;
