import { Avatar, Badge, HStack, Heading, Text, VStack } from "@chakra-ui/react";
import { formatDistance } from "date-fns";

const Comment = ({ comment }) => {
  return (
    <VStack
      px={8} py={3}
      m={3}
      bgColor="themeColor.pastel"
      borderRadius={7}
      position="relative"
      alignItems='start'
    >
      <HStack>
        <Avatar name={comment.username} bg="green.300" size="sm" />

        <Heading fontSize="md">{comment.username}</Heading>
        <Badge
          colorScheme="black"
          fontSize=".6rem"
          position="absolute"
          right="0"
          mr="1rem"
        >
          {formatDistance(Date.now(), comment.created_on)} ago
        </Badge>
      </HStack>
      <Text  bgColor="themeColor.darkPastel" p={3} borderRadius={15} w='100%'>{comment.text}</Text>
    </VStack>
  );
};
export default Comment;
