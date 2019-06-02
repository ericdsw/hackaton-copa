import React from 'react';
import './App.css';
import ApplicationWrapper from './components/commons/ApplicationWrapper';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { CssBaseline, withStyles, createStyles } from '@material-ui/core';
import { purple, green } from '@material-ui/core/colors';

const applicationTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

const styles = ({mixins, breakpoints}: Theme) => createStyles({
  root: {
    display: 'flex'
  },
  toolbar: mixins.toolbar,
  content: {
    flexGrowt: 1,
    [breakpoints.up('sm')]: {

    }
  }
});

interface AppProps {
  classes: any;
}

const App: React.FC<AppProps> = props => {
  
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={applicationTheme}>
        <CssBaseline />
        <ApplicationWrapper>
          Hello W
        </ApplicationWrapper>
      </MuiThemeProvider>
    </div>
  );

}

export default withStyles(styles)(App);
