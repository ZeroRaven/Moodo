import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Button,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteComment } from "../FirestoreQueries";
import { useAuth } from "../contexts/AuthProvider";

const Comment = ({ comment, setComments, comments }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const {user} = useAuth()


  const handleCommentDelete =async(commentId) => {
    await deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId))
    toast({
      title: `Comment Deleted!`,
      description: ` The comment has been deleted from the post.`,
      status: "warning",
      position: "bottom-right",
      duration: 6000,
      isClosable: true,
    });
    onClose();
  }

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
          {comment.userId===user.uid &&<IconButton
            icon={<AiFillDelete />}
            color="themeColor.red"
            bgColor="transparent"
            position="absolute"
            right="0"
            top="0"
            mr=".6rem"
            mt="4rem"
            onClick={() => {
              onOpen();
              setEntryDeleteId(each.id);
            }}
            _hover={{ backgroundColor: "transparent", color: "#FF7878" }}
          ></IconButton>}
        </VStack>
      </HStack>
      <Text bgColor="themeColor.darkPastel" p={3} borderRadius={15} w="97%">
        {comment.text}
      </Text>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bgColor="themeColor.beige">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Entry
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                colorScheme="yellow"
                bgColor="themeColor.yellow"
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                ml={3}
                bgColor="themeColor.red"
                // mr={3}
                onClick={() => handleCommentDelete(comment.id)}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </VStack>
  );
};
export default Comment;
