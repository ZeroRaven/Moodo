import {
  FormControl,
  FormHelperText,
  Textarea,
  Button,
  useToast,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { addJournalEntry } from "../FirestoreQueries";
import { useAuth } from "../contexts/AuthProvider";
import { format } from "date-fns";

const AddEntry = ({ groupedData, setGroupedData }) => {
  const toast = useToast();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuth();


  const handleClick = async () => {
    if (input.length > 0) {
      setError("")
      const body = {
        userId: user.uid,
        text: input.trim(),
        created_on: new Date(),
        updated_on: new Date()
      };
      const entryRes = await addJournalEntry(body);
      const data = {
        id: entryRes.id,
        ...body,
      }
      const date = format((body.created_on), "yyyy-MM-dd");

      if(!groupedData[date]){
        setGroupedData({[date]:[data], ...groupedData})
      }else{
        setGroupedData( {[date]: groupedData[date].unshift(data), ...groupedData});
      }

      toast({
        title: "New entry! Woohoo!",
        description: "Your entry has been added to your journal.",
        status: "success",
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
      });
      setInput("");
    } else {
      setError("Oh no! You can't post a blank entry.");
    }
  };

  return (
    <VStack mx={5} my={7} alignItems="end" w="70%">
      <FormControl>
        <Textarea
          borderColor="gray.400"
          focusBorderColor="themeColor.brown"
          maxLength="400"
          width="100%"
          minH="8rem"
          type="text"
          bgColor='themeColor.beige'
          placeholder="What's on your mind?"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        <FormHelperText textAlign="end">
          {400 - input.length} characters left.
        </FormHelperText>
        {input.length===0 && error && <Text color="red">{error}</Text>}
      </FormControl>
      <Button
        px={7}
        size="md"
        colorScheme="yellow"
        type="submit"
        onClick={handleClick}
      >
        Submit
      </Button>
    </VStack>
  );
};

export default AddEntry;
