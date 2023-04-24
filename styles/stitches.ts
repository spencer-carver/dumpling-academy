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
        error: "#CF6679",
        onBackground: "#F7E2A5",
        onSurface: "#E9DEBF",
        onError: "#000000",
        border: "#121212",
        primary: "#BB86FC",
        primaryVariant: "#3700B3",
        secondary: "#9ACD32",
        secondaryVariant: "#9ACD32"
    },
    radii: {
        borderRadius: "20px"
    },
    shadows: {
        background: "#121212",
        onBackground: "#FFFFFF"
    }
});

export const lightTheme = createTheme({
    colors: {
        background: "#E9DEBF",
        surface: "#F7E2A5",
        error: "#B00020",
        onBackground: "#000000",
        onSurface: "#34260C",
        onError: "#FFFFFF",
        border: "#000000",
        primary: "#BB86FC",
        primaryVariant: "#3700B3",
        secondary: "#9ACD32",
        secondaryVariant: "#9ACD32"
    },
    radii: {
        borderRadius: "20px"
    },
    shadows: {
        background: "#ffffff",
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
        color: "$onBackground",
        textDecoration: "none"
    },
    "main": {
        background: "$background",
        minHeight: "calc(100vh - 101px)"
    }
});

export const defaultTheme = lightTheme;
