import { createContext, useState } from "react";
import { useColorModeValue } from "../components/ui/color-mode";

export const GlobalThemeContext = createContext();

const GlobalThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
    }

    const customThemes = {
        chatBoxHeaderFooterBG: useColorModeValue("gray.50", "gray.50"),
        typingBadgeBG: useColorModeValue("pink.500", "pink.500"),
        inputBG: useColorModeValue("white", "white"),
    }


    return (
        <GlobalThemeContext.Provider value={{
            theme, toggleTheme,
            ...customThemes
        }}>
            {children}
        </GlobalThemeContext.Provider>
    )

}

export default GlobalThemeProvider;