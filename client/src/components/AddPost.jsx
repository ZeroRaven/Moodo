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
  import { createPost } from "../FirestoreQueries";
  import { useAuth } from "../contexts/AuthProvider";
  import { format } from "date-fns";
  
  const AddPost = ({ posts, setPosts}) => {
    const toast = useToast();
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);
    const { user } = useAuth();
  
  
    const handleClick = async () => {
      if (input.length > 0) {
        setError("")
        const body = {
          userId: user.uid,
          username: user.displayName,
          text: input.trim(),
          created_on: Date.now(),
          updated_on: Date.now(),
          likes: []
        };
        try{
            const postRes = await createPost(user.uid, body);
            const data = {
              id: postRes.id,
              ...body,
            }  
            setPosts([ data, ...posts])
      
            toast({
              title: "You just made a new post!",
              description: "Your post has been added to the discussion board.",
              status: "success",
              position: "bottom-right",
              duration: 9000,
              isClosable: true,
            });
            setInput("");
        }catch(err){
            console.error(err)
        }
        
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
            bgColor='white'
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
  
  export default AddPost;
  