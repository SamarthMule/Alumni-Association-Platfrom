import { Box, Flex, Text, Button } from "@chakra-ui/react";

const StudentSection = ({ title, items = [] }) => {
  return (
    <Box border="2px solid purple" borderRadius="lg" p={5} my={4} boxShadow="md">
      <Flex justify="space-between" align="center" mb={3}>
        <Text fontSize="lg" fontWeight="bold" color="pink.500">{title}</Text>
        <Button size="sm" colorScheme="pink" variant="solid" borderRadius="full" bg="orange.500">
          View All {title}
        </Button>
      </Flex>

      <Flex wrap="wrap" gap={4} justify="center">
        {items.length > 0 ? (
          items.map((item, index) => (
            <Box
              key={index}
              bg="purple.600"
              color="white"
              p={4}
              borderRadius="full"
              w="30%"
              textAlign="center"
              boxShadow="md"
            >
              <Text fontSize="md" fontWeight="bold">{item.heading}</Text>
              <Text fontSize="sm">{item.subHeading}</Text>
              <Text fontSize="xs">{item.dateModeLocation}</Text>
            </Box>
          ))
        ) : (
          <Text color="gray.500">No {title} available</Text>
        )}
      </Flex>
    </Box>
  );
};

export default StudentSection;
