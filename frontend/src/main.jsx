import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import ChatProvider from "./context/ChatProvider.jsx";
import GlobalThemeProvider from "./context/GlobalThemeProvider.jsx";
import { defaultSystem } from "@chakra-ui/react";
import { ColorModeProvider } from "./components/ui/color-mode.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <GlobalThemeProvider >
        <Provider>
          <ColorModeProvider value={defaultSystem}>
            <App />
          </ColorModeProvider>
        </Provider>
      </GlobalThemeProvider>
    </ChatProvider>
  </StrictMode>
);
