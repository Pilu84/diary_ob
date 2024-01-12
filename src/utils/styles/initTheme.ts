import React from 'react';
import { createTheme } from '@mui/material/styles'
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';
import { Theme } from '@emotion/react';
import createPalette from '@mui/material/styles/createPalette';
import { grey, teal } from '@mui/material/colors';


const fontFamily = '"Roboto","Helvetica Neue","Helvetica","Arial","sans-serif"';

const baseTheme = createTheme({
  typography: {
    fontSize: 14,
    htmlFontSize: 16,
    fontFamily
  },
})

function roundForEm(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

const buildVariant = (
  fontWeight: React.CSSProperties['fontWeight'],
  size: number,
  lineHeight: number,
  letterSpacing: number,
  casing: TypographyStyleOptions = {}
) => ({
  fontFamily: baseTheme.typography.fontFamily,
  fontWeight,
  fontSize: baseTheme.typography.pxToRem(size),
  lineHeight,
  letterSpacing: `${roundForEm(letterSpacing / size)}em`,
  ...casing
})


const muiTheme: Theme = createTheme({
  typography: {
    fontSize: baseTheme.typography.fontSize,
    htmlFontSize: baseTheme.typography.htmlFontSize,
    fontFamily: baseTheme.typography.fontFamily,

    h1: buildVariant(
      baseTheme.typography.fontWeightMedium,
      24,
      1.334,
      0
    ),

    h2: buildVariant(
      baseTheme.typography.fontWeightMedium,
      18,
      1.6,
      0.15
    ),

    h3: buildVariant(
      baseTheme.typography.fontWeightMedium,
      16,
      1.6,
      0.15
    ),

    body1: buildVariant(
      baseTheme.typography.fontWeightRegular,
      16,
      1.5,
      0.15
    ),

    button: buildVariant(
      baseTheme.typography.fontWeightMedium,
      16,
      1.6,
      0.15
    )
  },

  palette: createPalette({
    primary: {
      main: teal["600"]
    },
    secondary: {
      main: grey["600"]
    }
  })
});


export const mainTheme: Theme = muiTheme;

