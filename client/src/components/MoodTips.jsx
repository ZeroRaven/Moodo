import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Heading,
  ListItem,
  OrderedList,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import moodActions from "../assets/moodActions";
import axios from "axios";
import { addTipsInfoToFirestore, queryForTipsInfo } from "../FireStoreQueries";

const MoodTips = () => {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = "https://api.openai.com/v1/completions";
  const apiKey = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

  const handleSelectChange = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const input = e.target.value;
    const queryArr = [];
    let hasCalledToday = false;

    try {
      // setResponse(moodActions.find((each) => each["mood"] === input));
      const queryRes = await queryForTipsInfo(input);
      queryRes.forEach((snap) => {
        const data = snap.data();
        queryArr.push(data);
      });

      queryArr.forEach((each) => {
        if (
          each["date_created"].toDate().toLocaleDateString() ===
          new Date().toLocaleDateString()
        ) {
          hasCalledToday = true;
        }
      });

      if (!hasCalledToday || queryArr.length === 0) {
        setResponse("");
        const response = await axios.post(
          apiUrl,
          {
            model: "text-davinci-003",
            prompt: `Advice within 380 words, what to do when I am feeling ${input}?`,
            n: 1,
            max_tokens: 400,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const responseText = response.data.choices[0].text.trim();
        const responseTextArr = responseText.split("\n\n");
        setResponse({
          tips: responseTextArr,
        });

        await addTipsInfoToFirestore({
          mood: input,
          tips: responseTextArr,
          date_created: new Date(),
        });
      } else {
        const randomIndex = Math.floor(Math.random() * queryArr.length);
        setResponse(queryArr[randomIndex]);
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <VStack my="3rem" w={[300, 500, 900]}>
      <Card
        align="center"
        bgColor="themeColor.yellow"
        px={10}
        py={5}
        minW="100%"
        borderRadius={20}
      >
        <CardHeader>
          <Heading size="lg"> Tips & Tricks For You</Heading>
        </CardHeader>
        <CardBody>
          {isLoading ? (
            <Flex align="center" justify="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
            </Flex>
          ) : (
            <HStack gap={4}>
              <Text fontSize="xl">What to do when I am feeling...</Text>
              <form onChange={handleSelectChange} aria-label="mood options">
                <Select role="select" placeholder="Select mood" w="150px">
                  <option value="sad">Sad</option>
                  <option value="panicked">Panicked</option>
                  <option value="anxious">Anxious</option>
                  <option value="depressed">Depressed</option>
                  <option value="scared">Scared</option>
                  <option value="enraged">Enraged</option>
                  <option value="sleepless">Sleepless</option>
                </Select>
              </form>
            </HStack>
          )}
          <OrderedList my={5}>
            {response &&
              response.tips.map((each) => (
                <ListItem lineHeight={2} key={each}>
                  {each}
                </ListItem>
              ))}
          </OrderedList>
        </CardBody>
      </Card>
    </VStack>
  );
};
export default MoodTips;
