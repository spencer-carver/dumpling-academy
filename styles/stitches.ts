import { createStitches } from "@stitches/react";

export const {
    keyframes,
    styled,
    getCssText,
    globalCss,
    createTheme,
} = createStitches({
    media: {
        xs: "(max-width: 359px)",
        sm: "(min-width: 360px)",
        md: "(min-width: 500px)",
        lg: "(min-width: 760px)",
        xl: "(min-width: 1020px)",
        xxl: "(min-width: 1240px)",
        xxxl: "(min-width: 1440px)",
        dark: "(prefers-color-scheme: dark)",
        light: "(prefers-color-scheme: light)"
    }
});

export const darkTheme = createTheme({
    colors: {
        background: "#34260C",
        surface: "#2C2C2C",
        surfaceAccent: "#565656",
        primary: "#9ACD32",
        secondary: "#BAC628",
        error: "#CF6679",
        onBackground: "#F7E2A5",
        onSurface: "#E9DEBF",
        onSurfaceAccent: "#E9DEBF",
        onPrimary: "#000000",
        onSecondary: "#000000",
        onError: "#000000",
        border: "#121212"
    },
    radii: {
        borderRadius: "20px"
    },
    shadows: {
        background: "#34260C",
        onBackground: "#F7E2A5"
    }
});

export const lightTheme = createTheme({
    colors: {
        background: "#E4D6A0",
        surface: "#FFFFFF",
        surfaceAccent: "#E4E4DC",
        primary: "#9ACD32",
        secondary: "#BAC628",
        error: "#B00020",
        onBackground: "#000000",
        onSurface: "#34260C",
        onSurfaceAccent: "#34260C",
        onPrimary: "#000000",
        onSecondary: "#000000",
        onError: "#FFFFFF",
        border: "#000000"
    },
    radii: {
        borderRadius: "20px"
    },
    shadows: {
        background: "#E4D6A0",
        onBackground: "#000000"
    }
});

export const globalStyles = globalCss({
    "body": {
        margin: "0",
        padding: "0",
        fontFamily: "'Lato', sans-serif",
        visibility: "hidden",
        opacity: "0",
        "@dark": {
            backgroundColor: "#34260C"
        }
    },
    "a:visited": {
        textDecoration: "none"
    },
    "main": {
        background: "$background",
        minHeight: "calc(100vh - 101px)"
    }
});

export const defaultTheme = lightTheme;
