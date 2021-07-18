import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import background from "./background.jpg";
import ThemeToggler from "./ThemeToggler";
import Routes from "./Routes";
import MusicPlayerDrawer from "./MusicPlayerDrawer";
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import MenuOptions from "./MenuOptions";

const drawerWidth = 400;
const appBarHeight = 65;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        padding: 0,
    },
    drawerContainer: {
        marginTop: appBarHeight,
        overflow: 'auto',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),

    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            width: drawerWidth,
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        backgroundImage: `url(${background})`,
        backgroundSize: `100%`,
        height: '100%',
        minHeight: window.innerHeight - appBarHeight + 10,
        marginTop: appBarHeight - 10,
    },
    themeToggler: {
        marginLeft: 'auto',
    },

}));

function Nav(props) {
    const { window, toggleTheme, isLight } = props;
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const classes = useStyles();
    const theme = useTheme();

    const [queriesOpen, setQueriesOpen] = React.useState(false);
    const handleQueriesToggle = () => {
        setQueriesOpen(!queriesOpen);
    };

    const [musicOpen, setMusicOpen] = React.useState(false);
    const handleMusicPlayerDrawerToggle = () => {
        setMusicOpen(!musicOpen);
    };

    const [music, setMusic] = useState(null);


    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleQueriesToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon fontSize='large' />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{ flex: 1 }}>
                        Grateful Deadabase
                    </Typography>
                    <div classsName={classes.themeToggler}>
                        <ThemeToggler isLight={isLight} toggleTheme={toggleTheme} />
                    </div>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleMusicPlayerDrawerToggle}

                    >
                        <QueueMusicIcon fontSize='large' />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <nav aria-label="filter drawer">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                <SwipeableDrawer
                    disableBackdropTransition={!iOS} disableDiscovery={iOS}
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={queriesOpen}
                    onClose={handleQueriesToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    transitionDuration={0}
                >
                    <div>
                        <MenuOptions toggle={handleQueriesToggle} />
                    </div>
                </SwipeableDrawer>


            </nav>
            <main className={classes.content}>
                <div>
                    <Routes setMusic={setMusic} openMusic={setMusicOpen} />
                </div>

            </main>

            <MusicPlayerDrawer musicOpen={musicOpen} continer={container} toggle={handleMusicPlayerDrawerToggle} music={music} />

        </div>
    );
}


export default Nav;
