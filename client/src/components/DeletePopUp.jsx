import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

const DeletePopUp = ({ deleteId, isOpen, onClose, handleDelete }) => {
  const cancelRef = useRef(null);

  return (
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
              // ml={3}
              bgColor="themeColor.yellow"
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              bgColor="themeColor.red"
              // mr={3}
              onClick={() => handleDelete(deleteId)}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeletePopUp;
