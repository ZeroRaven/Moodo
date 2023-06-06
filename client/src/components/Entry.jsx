import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Spinner,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { deleteJournalEntry, updateJournalEntry } from "../FirestoreQueries";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit3 } from "react-icons/fi";

const Entry = ({ each, setGroupedData, groupedData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const cancelRef = useRef(null);

  const [isEditable, setIsEditable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [entryDeleteId, setEntryDeleteId] = useState(null);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState({
    text: each.text,
    updated_on: each.updated_on,
  });
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const handleEntryDelete = async (id) => {
    await deleteJournalEntry(id);
    setGroupedData(
      Object.fromEntries(
        Object.entries(groupedData).map(([date, data]) => [
          date,
          data.filter((each) => each.id !== id),
        ])
      )
    );
    toast({
      title: `Entry Deleted!`,
      description: ` The entry has been deleted from your journal.`,
      status: "warning",
      position: "bottom-right",
      duration: 6000,
      isClosable: true,
    });
    onClose();
  };

  const handleEditSection = (e) => {
    setIsEditable((prevIsEditable) => !prevIsEditable);
    if (isEditable) {
      setError("");
    }
    if (e.target.value.trim() === "") {
      setFields({
        ...fields,
        text: each.text,
        updated_on: each.updated_on,
      });
    }
  };

  const onValueChange = (event) => {
    const { name, value } = event.target;
    if (event.target.value.trim() === "") {
      setIsInputEmpty(true);
    } else {
      setError("");
      setIsInputEmpty(false);
    }
    setFields({
      ...fields,
      [name]: value.trim(),
      updated_on: new Date(),
    });
  };

  const onBlur = async (event) => {
    const { name, value } = event.target;
    if (value.trim() === "") {
      setIsInputEmpty(true);
      setError("Sorry, you can't update a blank field.");
    } else if (value !== each.text) {
      setIsInputEmpty(false);
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value.trim(),
        updated_on: new Date(),
      }));
      try {
        setIsLoading(true);
        await updateJournalEntry(each.id, fields);
        setGroupedData((prevGroupedData) =>
          Object.fromEntries(
            Object.entries(prevGroupedData).map(([date, data]) => [
              date,
              data.map((eachData) =>
                eachData.id === each.id
                  ? {
                      ...eachData,
                      [name]: value.trim(),
                      updated_on: new Date(),
                    }
                  : eachData
              ),
            ])
          )
        );
        toast({
          title: `Entry Updated!`,
          description: ` The entry has been updated in your journal.`,
          status: "success",
          position: "bottom-right",
          duration: 6000,
          isClosable: true,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
        setIsEditable(false);
      }
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape" || e.key === "Enter") {
      if (!isInputEmpty) {
        e.target.blur();
        setIsEditable(false);
        setError("");
      } else {
        setError("Sorry, you can't update a blank field.");
      }
    }
  };

  return (
    <VStack alignItems="start" key={each.created_on} w="100%">
      <Heading size="md" mt={3}>
        {each.created_on.seconds
          ? format(new Date(each.created_on.toDate()), "hh ':' mm aaa")
          : format(new Date(each.created_on), "hh ':' mm aaa")}
      </Heading>

      {!isLoading ? (
        isEditable ? (
          <Textarea
            type="text"
            name="text"
            onChange={onValueChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            value={fields.text}
            maxLength={400}
            borderColor="gray.400"
            focusBorderColor="themeColor.brown"
            w={{ lg: "30rem" }}
            minH="6rem"
            resize="horizontal"
            autoFocus
          />
        ) : (
          <Text mt=".4rem" minW='15rem' maxWidth="85%">
            {each.text}{" "}
          </Text>
        )
      ) : (
        <Spinner emptyColor="gray.200" color="orange.500" size="md" />
      )}
      {error && <Text color="red">{error}</Text>}

      <ButtonGroup position={{ md: "absolute" }} right="3rem">
        <IconButton
          icon={<FiEdit3 />}
          colorScheme="yellow"
          ml={4}
          onClick={handleEditSection}
        >
          Edit
        </IconButton>
        <IconButton
          icon={<AiFillDelete />}
          bgColor="themeColor.red"
          colorScheme="red"
          onClick={() => {
            onOpen();
            setEntryDeleteId(each.id);
          }}
        >
          Delete
        </IconButton>
      </ButtonGroup>

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
                onClick={() => handleEntryDelete(entryDeleteId)}
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
export default Entry;
