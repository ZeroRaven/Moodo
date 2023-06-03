import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  ListItem,
  OrderedList,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import moodActions from "../assets/moodActions";


const MoodTips = () => {
  const [response, setResponse] = useState("");

  const handleSelectChange = async (e) => {
    e.preventDefault();
    setResponse(moodActions.find(each => each['mood'] === e.target.value))
  };

  return (
    <VStack my='3rem' w={[300, 500, 900]}>
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
          <HStack gap={4}>
            <Text fontSize="xl">What to do when I am feeling...</Text>
            <form onChange={handleSelectChange} aria-label="mood options" 	>
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
          <OrderedList my={5}>
            {response && response.tips.map(each => (
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
