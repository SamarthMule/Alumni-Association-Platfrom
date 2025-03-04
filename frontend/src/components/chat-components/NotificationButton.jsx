import {
  Avatar,
  Box,
  HStack,
  IconButton,
  // Menu,
  // MenuButton,
  // MenuItem,
  // MenuList,
  Text,
  VStack
} from "@chakra-ui/react";

import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "../ui/menu";

import { FaBell } from "react-icons/fa6";
// import NotificationBadge from "react-notification-badge";
import useChatContext from "../../hooks/useChatContext";

const NotificationButton = () => {
  const { notifications } = useChatContext();
  return (
    <MenuRoot>
      <MenuTrigger as={Box} color="pink.500" position={"relative"}>
        <IconButton
          icon={<FaBell />}
          variant="ghost"
          fontSize="20px"
          colorPalette="pink"
        />
        {notifications && (
          <Box position="absolute" top={0} right={-1}>
            {/* <NotificationBadge count={notifications.length} /> */}
          </Box>
        )}
      </MenuTrigger>
      <MenuContent>
        {console.log("===  NotificationButton.jsx [21] ===", notifications)}
        {notifications ? notifications.map((notification) => (
          <MenuItem key={notification._id}>
            {notification.chat.isGroupChat ? (
              <HStack>
                <Avatar.Root size="sm">
                  <Avatar.Fallback name={notification.sender.name} />
                  <Avatar.Image src={notification.sender.profilePic} />
                </Avatar.Root>
                <VStack>
                  <Text>{notification.chat.chatName}</Text>
                  <HStack gap={1}>
                    <Text fontWeight="bold">
                      {notification.sender.name}:
                    </Text>
                    <Text>{notification.content}</Text>
                  </HStack>
                </VStack>
              </HStack>
            ) : (
              <HStack>
                <Avatar.Root size="sm" alignSelf="flex-start">
                  <Avatar.Fallback name={notification.sender.name} />
                  <Avatar.Image src={notification.sender.profilePic} />
                </Avatar.Root>
                <Text fontWeight="bold">
                  {notification.sender.name}:
                </Text>
                <Text>{notification.content}</Text>
              </HStack>
            )}
          </MenuItem>
        )) : "No new notifications"}
      </MenuContent>
    </MenuRoot>
  );
};

export default NotificationButton;
