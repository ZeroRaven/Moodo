import { Card, CardBody, HStack, Heading, VStack } from "@chakra-ui/react";

import Entry from "./Entry";
import { format } from "date-fns";

const AllEntries = ({ groupedData, setGroupedData }) => {
  return (
    <VStack w="80%" spacing={6} align="stretch">
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
                    <Entry
                      each={each}
                      setGroupedData={setGroupedData}
                      groupedData={groupedData}
                      key={each.id}
                    />
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
