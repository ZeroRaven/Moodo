import {
  Badge,
  Card,
  CardBody,
  HStack,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";

const MoodDisplays = ({ moodData }) => {
  const sortedMood = moodData.sort((a, b) => b.date - a.date);
  return (
    <VStack
      divider={<StackDivider borderColor="gray.200" />}
      spacing={6}
      align="stretch"
    >
      {sortedMood.map((each) => {
        return (
          <Card
            bg="themeColor.beige"
            variant="elevated"
            borderRadius={20}
            key={each.date}
          >
            <CardBody>
            <HStack p={3} m={3} bgColor="themeColor.pastel" borderRadius={7}>
              <Heading fontSize="md">I feel {each.feel[0]}</Heading>
              <Badge colorScheme="black">
                {formatDistance(Date.now(), Date.parse(each.date.toDate()))} ago
              </Badge>
            </HStack>
            
              <Text mx={3}>{each.description}</Text>
            </CardBody>
          </Card>
        );
      })}
    </VStack>
  );
};

export default MoodDisplays;
