import { Theme } from "@mui/material";
import React, { Context } from "react";
import { mainTheme } from "./initTheme";

export interface MainThemeContextValue {
  theme: () => Theme;
}

export const MaintThemeContext: Context<MainThemeContextValue> = React.createContext({
  theme: (): Theme => {
    return mainTheme as Theme;
  }
})