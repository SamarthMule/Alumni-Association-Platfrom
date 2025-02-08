import Navbar from "../components/common/Navbar";
import { Flex, Box, Heading, Image, Input, Button, Text, Link, Fieldset } from "@chakra-ui/react";
import { Field } from "../components/ui/field";
import { PasswordInput } from "../components/ui/password-input";
const RegisterPage = () => {
  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register");
  };
  return (
    <>
    <Navbar />
    <Flex bg="purple.50" justify="center" align="center"
          direction={{ base: "column", md: "row" }} gap={{base: '4' , md: '0'}} p={4} h="90vh" >
          <Box
            flex="1"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            margin={{ base: "0", md: "4" }}
            display={{ base: "none", md: "flex" }}
          >
            <Heading color="purple.500" mb={6}>
              Walchand Institute Of Technology
            </Heading>
            <Image
              src="/Logo.png"
              alt="Alumni Association Platform"
              boxSize="300px"
              shadowColor={"purple.500"}
              shadow={"lg"}
              rounded="full"
            />
          </Box>
          <Box
            flex="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="purple.50"
          >
            <Fieldset.Root size='lg' maxW='400px' mx='auto' p={8} bg='white' borderRadius='md' boxShadow='lg'>
              <Heading
                as="h2"
                size="xl"
                mb={4}
                textAlign="center"
                color="orange.500"
              >
                Register
              </Heading>
    
              <Fieldset.Content onSubmit={handleRegister}>
                <Field label="Name">
                  <Input type="text" placeholder="Name" focusBorderColor="purple.500" borderColor="purple.300" />
                </Field>

                <Field label="PRN Number">
                  <Input type="text" placeholder="PRN Number" focusBorderColor="purple.500" borderColor="purple.300" />
                </Field>

                <Field label="Email">
                  <Input type="email" placeholder="Email" focusBorderColor="purple.500" borderColor="purple.300" />
                </Field>
    
                <Field label="Password">
                  <PasswordInput placeholder="Password" focusBorderColor="purple.500" borderColor="purple.300"/>
                </Field>
              </Fieldset.Content>
    
                <Button type="submit" variant="subtle" w="full" colorPalette={"purple"}>
                Register
                </Button>
    
                <Text fontSize="sm" textAlign="center">
                  Already Having Account?{" "}
                  <Link
                    color="purple.500"
                    fontWeight="semibold"
                    href="/login"
                  >
                    Login
                  </Link>
                </Text>
            </Fieldset.Root>
          </Box>
        </Flex>
    </>
  )
}

export default RegisterPage