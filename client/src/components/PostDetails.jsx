import {
  Badge,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { useState } from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

const PostDetails = ({
  finalRef,
  isOpen,
  onClose,
  handleLike,
  handlePostDelete,
  post,
  user,
  comments,
  setComments,
}) => {
  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
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
          <Text p={3} m={3} bgColor="themeColor.beige" borderRadius={15}>
            {post.text}
          </Text>

          <AddComment
            post={post}
            comments={comments}
            setComments={setComments}
          />
          {comments &&
            comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
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
  );
};

export default PostDetails;
