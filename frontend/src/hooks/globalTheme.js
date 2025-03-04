import { useContext } from "react";
import {  GlobalThemeContext } from "../context/GlobalThemeProvider";

const useGlobalTheme = () => {
    return useContext(GlobalThemeContext);
}

export default useGlobalTheme ;