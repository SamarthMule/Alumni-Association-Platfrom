import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider.jsx";
import ChatProvider from "./context/ChatProvider.jsx";
import GlobalThemeProvider from "./context/GlobalThemeProvider.jsx";
import { defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChatProvider>
      <GlobalThemeProvider value={defaultSystem}>
        <Provider>
          <App />
        </Provider>
      </GlobalThemeProvider>
    </ChatProvider>
  </StrictMode>
);
