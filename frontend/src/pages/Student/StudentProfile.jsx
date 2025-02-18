import Navbar from "../../components/Student/StudentNavbar";
import { Avatar, Box, Flex, IconButton, Editable, Button } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu";

const StudentProfile = () => {
  const fields = [
    { label: "First Name", defaultValue: "Jane" },
    { label: "Last Name", defaultValue: "Doe" },
    { label: "Email", defaultValue: "jane.doe@example.com", disabled: true },
    { label: "Contact No.", defaultValue: "123-456-7890" },
    { label: "Enrollment No.", defaultValue: "EN123456", disabled: true },
    { label: "Date of Birth", defaultValue: "01/01/2000" },
    { label: "Branch", defaultValue: "Computer Science" },
    { label: "Joining Year", defaultValue: "2018" },
    { label: "Passout Year", defaultValue: "2022" },
  ];

  return (
    <Box bg="purple.50" minH="100vh" p={5} pt="80px">
      <Navbar />
      <Flex direction={{ base: "column", md: "row" }} align="center" justify="center" gap="5">
        <Flex direction="column" align="center" justify="center" p={5} bg="white" borderRadius="lg" boxShadow="md">
        <Avatar.Root colorPalette={"purple"} size="2xl" h="100%">
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Button colorScheme="purple" mt={5}> Change The Image </Button>
        </Flex>

        <Flex direction={{ base: "column", md: "row" }} p={5} bg="white" borderRadius="lg" boxShadow="md" w="100%">
          <Flex direction="column" w={{ base: "100%", md: "50%" }}>
            {fields.slice(0, 5).map((field, index) => (
              <Field label={field.label} key={index} disabled={field.disabled}>
                <Editable.Root defaultValue={field.defaultValue}>
                  <Editable.Preview minW={{md: "70%", base:"90%"}} />
                  <Editable.Input minW={{md: "70%", base:"90%"}} />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs" aria-label="Edit">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs" aria-label="Cancel">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs" aria-label="Submit">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Field>
            ))}
          </Flex>

          <Flex direction="column" w={{ base: "100%", md: "50%" }}>
            {fields.slice(5).map((field, index) => (
              <Field label={field.label} key={index} disabled={field.disabled}>
                <Editable.Root defaultValue={field.defaultValue} minW={{md: "70%", base:"90%"}}>
                  <Editable.Preview minW={{md: "70%", base:"90%"}}/>
                  <Editable.Input minW={{md: "70%", base:"90%"}} />
                  <Editable.Control>
                    <Editable.EditTrigger asChild>
                      <IconButton variant="ghost" size="xs" aria-label="Edit">
                        <LuPencilLine />
                      </IconButton>
                    </Editable.EditTrigger>
                    <Editable.CancelTrigger asChild>
                      <IconButton variant="outline" size="xs" aria-label="Cancel">
                        <LuX />
                      </IconButton>
                    </Editable.CancelTrigger>
                    <Editable.SubmitTrigger asChild>
                      <IconButton variant="outline" size="xs" aria-label="Submit">
                        <LuCheck />
                      </IconButton>
                    </Editable.SubmitTrigger>
                  </Editable.Control>
                </Editable.Root>
              </Field>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default StudentProfile;