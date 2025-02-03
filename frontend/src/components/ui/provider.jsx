'use client'

import { ChakraProvider, createSystem, defineConfig} from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

const config = defineConfig({
  theme: {
    tokens:{
      colors:{
        primary: 'purple',
      }
    }
  }
})
const system = createSystem(config)

export function Provider(props) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
