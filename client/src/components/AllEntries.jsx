import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
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
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FiEdit3 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { deleteJournalEntry } from "../FirestoreQueries";
import { useRef, useState } from "react";

const AllEntries = ({ groupedData, setGroupedData }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [entryDeleteId, setEntryDeleteId] = useState(null);
  const initialRef = useRef(null);

  const handleEntryDelete = async (id) => {
    await deleteJournalEntry(id);
    setGroupedData(
      Object.fromEntries(Object.entries(groupedData).map(([date, data]) =>[
        date,
        data.filter((each) => each.id !== id)]
      ))
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

  return (
    <VStack w="80%" spacing={6} align="stretch">
      <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
        <ModalOverlay />
        <ModalContent bgColor="themeColor.beige">
          <ModalHeader>Are your sure you want to delete?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button
              bgColor="themeColor.yellow"
              colorScheme="yellow"
              mr={3}
              onClick={() => handleEntryDelete(entryDeleteId)}
              ref={initialRef}
            >
              Yes
            </Button>
            <Button
              bgColor="themeColor.red"
              colorScheme="red"
              mr={3}
              onClick={onClose}
            >
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {console.log(groupedData)}
      {groupedData &&
        Object.entries(groupedData).map(([date, entries]) => (
          <Card
            bg="themeColor.beige"
            variant="elevated"
            borderRadius={20}
            key={date}
          >
            <CardBody>
              <HStack
                display={{ md: "flex" }}
                px={3}
                py={8}
                m={3}
                height="100%"
                borderRadius={7}
                maxW="100%"
              >
                <Heading size="lg">{format(new Date(date), "dd")} </Heading>
                <Heading size="lg">{format(new Date(date), "MMM")}</Heading>
                <VStack
                  alignItems="start"
                  spacing={4}
                  borderLeftColor="themeColor.brown"
                  borderLeftWidth="1px"
                  pl="2rem"
                >
                  {entries.map((each) => (
                    <VStack alignItems="start" key={each.created_on}>
                      <Heading size="md" mt={3}>
                        {each.created_on.seconds
                          ? format(
                              new Date(each.created_on.toDate()),
                              "hh ':' mm aaa"
                            )
                          : format(new Date(each.created_on), "hh ':' mm aaa")}
                      </Heading>

                      <Text mt=".4rem">{each.text}</Text>
                      <ButtonGroup position={{ md: "absolute" }} right="3rem">
                        <IconButton
                          icon={<FiEdit3 />}
                          colorScheme="yellow"
                          ml={4}
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
                    </VStack>
                  ))}
                </VStack>
              </HStack>
            </CardBody>
          </Card>
        ))}
    </VStack>
  );
};

export default AllEntries;
