import {
  Avatar,
  Badge,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { AiFillDelete } from "react-icons/ai";
import { deleteComment } from "../../FirestoreQueries";
import { useAuth } from "../../contexts/AuthProvider";
import DeletePopUp from "../DeletePopUp";

const Comment = ({ comment, setComments, comments }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const toast = useToast();

  const handleCommentDelete = async (commentId) => {
    await deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
    toast({
      title: `Comment Deleted!`,
      description: ` The comment has been deleted from the post.`,
      status: "warning",
      position: "bottom-right",
      duration: 6000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <VStack
      px={8}
      py={5}
      m={3}
      bgColor="themeColor.pastel"
      borderRadius={7}
      position="relative"
      alignItems="start"
    >
      <HStack>
        <Avatar name={comment.username} bg="green.300" size="sm" />

        <Heading fontSize="md">{comment.username}</Heading>
        <VStack>
          <Badge
            colorScheme="black"
            fontSize=".6rem"
            position="absolute"
            right="0"
            mr="1rem"
          >
            {formatDistance(Date.now(), comment.created_on)} ago
          </Badge>
          {comment.userId === user.uid && (
            <IconButton
              icon={<AiFillDelete />}
              color="themeColor.red"
              bgColor="transparent"
              position="absolute"
              right="0"
              top="0"
              mr=".6rem"
              mt="4rem"
              onClick={onOpen}
              _hover={{ backgroundColor: "transparent", color: "#FF7878" }}
            ></IconButton>
          )}
        </VStack>
      </HStack>
      <Text bgColor="themeColor.darkPastel" p={3} borderRadius={15} w="97%">
        {comment.text}
      </Text>
      <DeletePopUp
        isOpen={isOpen}
        onClose={onClose}
        handleDelete={handleCommentDelete}
        deleteId={comment.id}
      />
    </VStack>
  );
};
export default Comment;
