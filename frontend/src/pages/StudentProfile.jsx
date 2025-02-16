import Navbar from "../components/common/Student/StudentNavbar";
import { Avatar, Box, Flex, Button,} from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { Editable, IconButton } from "@chakra-ui/react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

const StudentProfile = () => {
  return (
    <Box bg="purple.50" minH="100vh" p={5} pt="80px" h="100vh">
      <Navbar />
      <Flex direction="row" align="center" justify="center" gap="5" >
        <Flex direction="column" align="center" justify="center" p={5} bg="white" borderRadius="lg" boxShadow="md">
          <Avatar.Root shape="rounded" size="2xl">
            <Avatar.Fallback name="Segun Adebayo" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
          </Avatar.Root>
          <Button colorScheme="teal" size="sm" mt={5}>
            Change Profile Picture
          </Button>
        </Flex>
        <Flex direction={{base: "column" , md : "row"}} p={5} bg="white" borderRadius="lg" boxShadow="md" h="100%" w="100%">
          <Flex direction="column" w="50%">
          <Field label="First Name" w="100%">
            <Editable.Root defaultValue="Jane" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>
          
          <Field label="Last Name" w="100%">
            <Editable.Root defaultValue="Doe" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>

          <Field label="Email" w="100%" disabled >
            <Editable.Root defaultValue="jane.doe@example.com" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>

          <Field label="Contact No." w="100%">
            <Editable.Root defaultValue="123-456-7890" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>

          <Field label="Enrollment No." w="100%" disabled >
            <Editable.Root defaultValue="EN123456" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>
          </Flex>
          <Flex direction="column" w="50%">
          <Field label="Date of Birth" w="100%">
            <Editable.Root defaultValue="01/01/2000" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>

          <Field label="Branch" w="100%">
            <Editable.Root defaultValue="Computer Science" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>

          <Field label="Joining Year" w="100%">
            <Editable.Root defaultValue="2018" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>

          <Field label="Passout Year" w="100%">
            <Editable.Root defaultValue="2022" w="100%">
              <Editable.Preview w="50%" />
              <Editable.Input w="50%" />
              <Editable.Control>
                <Editable.EditTrigger asChild>
                  <IconButton variant="ghost" size="xs">
                    <LuPencilLine />
                  </IconButton>
                </Editable.EditTrigger>
                <Editable.CancelTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuX />
                  </IconButton>
                </Editable.CancelTrigger>
                <Editable.SubmitTrigger asChild>
                  <IconButton variant="outline" size="xs">
                    <LuCheck />
                  </IconButton>
                </Editable.SubmitTrigger>
              </Editable.Control>
            </Editable.Root>
          </Field>
          </Flex>

        </Flex>
      </Flex>
    </Box>
  )
}

export default StudentProfile