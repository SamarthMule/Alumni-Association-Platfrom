import { useContext } from "react"
import { GlobalThemeContext } from "../context/GlobalThemeProvider"

const useColorTheme = () => {
    const context = useContext(GlobalThemeContext)
    if(!context){
        throw new Error("useColorTheme must be used within a ThemeProvider")
    }

    return context
}

export default useColorTheme