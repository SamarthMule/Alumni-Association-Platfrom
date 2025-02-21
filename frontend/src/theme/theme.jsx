// theme.js
import { createSystem, defineConfig, mergeConfigs, defaultConfig } from "@chakra-ui/react";

const customTheme = defineConfig({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  theme: {
    tokens: {
      // Define your custom tokens here
    },
  },
});

const config = mergeConfigs(defaultConfig, customTheme);
export const system = createSystem(config);
