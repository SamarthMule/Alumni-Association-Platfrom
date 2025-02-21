import { Box, Flex, Text, Button, Wrap, WrapItem, useBreakpointValue } from "@chakra-ui/react";

const StudentSection = ({ title, items = [] }) => {
  const visibleItems = useBreakpointValue({ base: items.slice(0, 1), sm: items }); 

  return (
    <Box border="2px solid purple" borderRadius="lg" p={5} my={4} boxShadow="md">
      <Flex justify="space-between" align="center" mb={3} flexWrap="wrap">
        <Text fontSize="lg" fontWeight="bold" color="pink.500">
          {title}
        </Text>
        <Button
          size="sm"
          colorScheme="pink"
          variant="solid"
          borderRadius="full"
          bg="orange.500"
        >
          View All {title}
        </Button>
      </Flex>

      <Wrap spacing={4} justify="center">
        {visibleItems.length > 0 ? (
          visibleItems.map((item, index) => (
            <WrapItem 
              key={index} 
              flexBasis={{ base: "100%", sm: "48%", md: "30%" }} 
              minWidth="200px"
            >
              <Box
                bg="purple.600"
                color="white"
                p={4}
                borderRadius="full"
                textAlign="center"
                boxShadow="md"
                w="full"
              >
                <Text fontSize="md" fontWeight="bold">{item.heading}</Text>
                <Text fontSize="sm">{item.subHeading}</Text>
                <Text fontSize="xs">{item.dateModeLocation}</Text>
              </Box>
            </WrapItem>
          ))
        ) : (
          <Text color="gray.500">No {title} available</Text>
        )}
      </Wrap>
    </Box>
  );
};

export default StudentSection;
