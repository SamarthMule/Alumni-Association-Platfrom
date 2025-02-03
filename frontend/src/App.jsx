import { Button } from "@chakra-ui/react";
import { ColorModeButton } from "./components/ui/color-mode";

function App() {
  return (
    <>
    <ColorModeButton/>
    <Button colorPalette='teal' variant="outline" size="2xl" rounded='xl'>
      Ghost
    </Button>
    </>
  );
}

export default App;

