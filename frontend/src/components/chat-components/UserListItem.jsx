import { Box, Flex, Avatar, Text, Button } from "@chakra-ui/react";

// import PropTypes from "prop-types";

const UserListItem = ({ username, email, avatarUrl, onClick }) => {
  return (
    <Button
      display="flex"
      py={8}
      px={4}
      gap={2}
      width="100%"
      overflow="hidden"
      justifyContent="flex-start"
      variant="ghost"
      onClick={onClick}
      colorPalette='pink'
    >
      <Avatar.Root size='sm'>
        <Avatar.Fallback name={username} />
        <Avatar.Image src={avatarUrl} />
      </Avatar.Root>

      <Box>
        <Text textAlign="left">{username}</Text>
        <Flex fontSize=".8rem">
          <Text mr={1} fontWeight="bold">
            Email:
          </Text>
          <Text>{email}</Text>
        </Flex>
      </Box>
    </Button>
  );
};

// UserListItem.propTypes = {
//   username: PropTypes.string.isRequired,
//   email: PropTypes.string.isRequired,
//   avatarUrl: PropTypes.string,
//   onClick: PropTypes.func.isRequired,
// };

export default UserListItem;
