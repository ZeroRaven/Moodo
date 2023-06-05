import {
  Card,
  Container,
  Heading,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import AddEntry from "../components/AddEntry";
import { useEffect, useState } from "react";
import { queryJournalEntries } from "../FirestoreQueries";
import AllEntries from "../components/AllEntries";
import { useAuth } from "../contexts/AuthProvider";
import { format } from "date-fns";

const Journal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [entryData, setEntryData] = useState(null);
  const [groupedData, setGroupedData] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    const getQuery = async () => {
      const queryArr = [];
      const groupedEntries = {};

      try {
        const queryRes = await queryJournalEntries(user.uid);
        queryRes.forEach((snap) => {
          const data = {id:snap.id, ...snap.data()};
          queryArr.push(data);
        //   console.log((new Date().seconds))
          const date = format(new Date(data.created_on.toDate()), "yyyy-MM-dd");
          if (!groupedEntries[date]) {
            groupedEntries[date] = [];
          }
          groupedEntries[date].push(data);
        });
        setEntryData(queryArr);
        setGroupedData(groupedEntries);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    setIsLoading(true);
    getQuery();
  }, []);
  return (
    <VStack
      m={20}
      bg="themeColor.pastel"
      p="5rem"
      w="80%"
      borderRadius={40}
      mx="auto"
    >
      <Heading>My Journal</Heading>
      <AddEntry
        setEntryData={setEntryData}
        setGroupedData={setGroupedData}
        entryData={entryData}
        groupedData={groupedData}
      />

      {entryData && (
        <AllEntries entryData={entryData} groupedData={groupedData} />
      )}
    </VStack>
  );
};

export default Journal;
