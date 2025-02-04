import { Box, Button } from "@chakra-ui/react"
import { ColorModeButton } from "./components/ui/color-mode"


function App() {
  return (
    <Box>
      <Button m={5} colorPalette="blue" variant='ghost'>Button</Button>
      <ColorModeButton />
    </Box>
  )
}

export default App
