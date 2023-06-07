import {
  Badge,
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import { useRef } from "react";

const PostDetails = (
  {finalRef,
  isOpen,
  onClose,
  handleLike,
  handlePostDelete,
  post,
  user}
) => {

  return (
    <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={5} borderRadius="1.6rem">
        <ModalHeader>
          <Heading>{post.username}</Heading>
          <Badge
           colorScheme="yellow" variant="outline">
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
  );
};

export default PostDetails;
