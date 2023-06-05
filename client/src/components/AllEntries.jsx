import {
  Card,
  CardBody,
  HStack,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { format } from "date-fns";

const AllEntries = ({ groupedData }) => {
  return (
    <VStack
      w="80%"
      spacing={6}
      align="stretch"
    >

      {Object.entries(groupedData).map(([date, entries]) => (
        <Card
          bg="themeColor.beige"
          variant="elevated"
          borderRadius={20}
          key={date}
          minHeight="1rem"
        >
          <CardBody>
            <HStack
              display={{ md: "flex" }}
              px={3}
              py={8}
              m={3}
              height="100%"
              borderRadius={7}
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
                      {each.created_on.seconds?format(
                        new Date(each.created_on.toDate() ),
                        "hh ':' mm aaa"
                      ): format(
                        new Date(each.created_on ),
                        "hh ':' mm aaa")}
                    </Heading>
                    <Text mt=".4rem">{each.text}</Text>
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
