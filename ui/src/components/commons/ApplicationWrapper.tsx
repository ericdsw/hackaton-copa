import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import {
  AppBar, Toolbar, Typography, IconButton, Icon, Divider, Hidden,
  List, ListItem, ListItemText, ListItemIcon, Drawer
} from '@material-ui/core';

const drawerWidth = 240;

const styles = (theme: Theme) => createStyles({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    }
  },
  content: {
    flexGrow: 1,
    padding: 16,
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth
    }
  }
});

interface ApplicationBarProps {
  classes: any;
  theme: any;
  children?: any;
}

const ApplicationWrapper: React.FC<ApplicationBarProps> = props => {

  const { classes, children, theme } = props;
  const [isOpen, toggleDrawer] = useState(false);

  const handleClose = () => {
    toggleDrawer(!isOpen);
  }

  const drawerContent = (
    <React.Fragment>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        
      </List>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <AppBar
        position='fixed'
        color='primary'
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open-drawer'
            className={classes.menuButton}>
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant='h6' color='inherit'>
            FooApplication
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={isOpen}
            classes={{paper: classes.drawerPaper }}
            onClose={handleClose}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            variant='permanent'
            open
            classes={{paper: classes.drawerPaper }}>
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </React.Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(ApplicationWrapper);
