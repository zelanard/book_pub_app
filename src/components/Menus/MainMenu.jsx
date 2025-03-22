import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Logout } from "@mui/icons-material";
import { ListItemIcon, ListItemText } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
//icons
import {
    MenuBook
} from "@mui/icons-material";

import ButtonBox from '../Boxes/ButtonBox';
import { useState } from 'react';
import pages from '../../Objects/pages';

const drawerWidth = 240;

/**
 * Main styled component that defines the layout of the main content area with sliding margin transition
 * when the drawer is open or closed.
 */
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        /**
         * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
         * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
         * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
         * proper interaction with the underlying content.
         */
        position: 'relative',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    transition: theme.transitions.create('margin', {
                        easing: theme.transitions.easing.easeOut,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    marginRight: 0,
                },
            },
        ],
    }),
);

/**
 * AppBar styled component that defines the top navigation bar layout and transition
 * when the drawer is open or closed.
 */
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginRight: drawerWidth,
            },
        },
    ],
}));

/**
 * DrawerHeader styled component that defines the header layout of the drawer with padding 
 * to align the toolbar and ensure content remains under the app bar.
 */
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

/**
 * DrawerHeader styled component that defines the header layout of the drawer with padding 
 * to align the toolbar and ensure content remains under the app bar.
 */
export default function MainMenu() {
    const theme = useTheme();
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState("home");

    /**
     * Handle opening of the drawer
     */
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    /**
     * Handle closing of the drawer
     */
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <Typography component="div" variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        <ButtonBox>
                            <MenuBook sx={{ marginRight: "10px", height: "40px", width: "40px" }} /> BookPub <ArrowRightIcon /> {page.charAt(0).toUpperCase() + page.slice(1)}
                        </ButtonBox>
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        sx={[open && { display: 'none' }]}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Main open={open}>
                <DrawerHeader />
                <Typography component="div" sx={{ marginBottom: 2 }}>
                    {pages[page].body}
                </Typography>
            </Main>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {Object.keys(pages).map((key) => (
                        <ListItem key={key} disablePadding>
                            <ListItemButton
                                onClick={() => setPage(key)}
                            >
                                <ListItemIcon>
                                    {pages[key].icon}
                                </ListItemIcon>
                                <ListItemText primary={pages[key].text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem key={"exit"} disablePadding>
                        <ListItemButton
                            onClick={() => { logout() }}
                        >
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary={"Logout"} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    );
}