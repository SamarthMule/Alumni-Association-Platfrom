import { createContext, useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";

export const GlobalThemeContext = createContext();

const GlobalThemeProvider = ({ children }) => {
    
    const customThemes = {
        chatBoxHeaderFooterBG: useColorModeValue("gray.50", "gray.700"),
        typingBadgeBG: useColorModeValue("pink.500", "pink.500"),
        inputBG: useColorModeValue("white", "white"),
        homeBG: useColorModeValue("pink.100", "gray.800"),
    }


    return (
        <GlobalThemeContext.Provider value={{
            ...customThemes
        }}>
            {children}
        </GlobalThemeContext.Provider>
    )

}

export default GlobalThemeProvider;