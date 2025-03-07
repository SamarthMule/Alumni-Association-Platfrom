import {
  Box,
  Flex,
  Text,
  Button,
  Wrap,
  WrapItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import useChatContext from "../../hooks/useChatContext";

const StudentSection = ({ title, items = [] }) => {
  const { user } = useChatContext();
  const visibleItems = useBreakpointValue({
    base: items.slice(0, 1),
    sm: items,
  });
  const navigate = useNavigate();

  const role = user?.role;

  const handleNavigate = () => {
    switch (title) {
      case "Events":
        navigate(`/${role}/events`);
        break;
      case "Mentors":
        navigate(`/${role}/mentor-connect`);
        break;
      case "Jobs":
        navigate(`/${role}/jobs`);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      borderRadius="lg"
      p={6}
      my={6}
      boxShadow="lg"
      bgGradient="linear(to-r, purple.50, blue.50)"
    >
      <Flex justify="space-between" align="center" mb={4} flexWrap="wrap">
        <Text fontSize="xl" fontWeight="bold" color="purple.700">
          {title}
        </Text>
        <Button
          size="md"
          colorScheme="purple"
          variant="solid"
          borderRadius="md"
          _hover={{ transform: "scale(1.05)", boxShadow: "xl" }}
          onClick={handleNavigate}
        >
          View All {title}
        </Button>
      </Flex>

      <Wrap spacing={6} justify="center">
        {visibleItems.length > 0 ? (
          visibleItems.map((item, index) => (
            <WrapItem
              key={index}
              flexBasis={{ base: "100%", sm: "48%", md: "30%" }}
              minWidth="250px"
            >
              <Box
                bg="purple.600"
                color="white"
                p={5}
                borderRadius="lg"
                textAlign="center"
                boxShadow="md"
                w="full"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Text fontSize="lg" fontWeight="bold">
                  {item.heading}
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  {item.subHeading}
                </Text>
                <Text fontSize="xs" opacity={0.7}>
                  {item.dateModeLocation}
                </Text>
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
