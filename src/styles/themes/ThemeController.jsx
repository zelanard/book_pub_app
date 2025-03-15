import React, { useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeController = ({ children }) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                    
                },
                components: {
                    MuiTablePagination: {
                        defaultProps: {
                            labelRowsPerPage: "Rows per page", // Removes the default <p> wrapper
                        },
                        styleOverrides: {
                            selectLabel: {
                                display: "inline", // Prevents MUI from nesting <p> tags
                            },
                        },
                    },
                },
            }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default ThemeController;

