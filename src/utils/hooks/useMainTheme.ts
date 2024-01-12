import { Theme } from "@mui/material";
import { useContext } from "react";
import { MainThemeContextValue, MaintThemeContext } from "../styles/mainThemeProvide";


export function useMainTheme(): Theme {
  return useContext<MainThemeContextValue>(MaintThemeContext).theme();
}