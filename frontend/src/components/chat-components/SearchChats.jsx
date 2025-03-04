import { Input } from "@chakra-ui/react";

import useChatContext from "../../hooks/useChatContext";
const SearchChats = () => {
  const { search, setSearch } = useChatContext();


  return (

      <Input
        flex="1"
        type="text"
        placeholder="Connect to a mentor"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

  );
};

export default SearchChats;
