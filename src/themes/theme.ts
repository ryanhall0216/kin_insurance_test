import { createTheme } from "@mui/material/styles"

/**
 * Redefine the material Theme
 */

export const themes = createTheme({
    palette: {
        primary: {
            main: "#007055",   //green
        },
        secondary: {
            main: "#545C52",    //gray
        },
        warning: {
            main: "#167C80",     //teal
        },
        text: {
            primary: "#212121",     //black
            secondary: "#ffffff",   //white
            disabled: "#545C52",    //gray
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                }
            } 
        }
    }
})