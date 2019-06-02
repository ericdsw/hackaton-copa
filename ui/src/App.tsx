import React from 'react';
import './App.css';
import ApplicationWrapper from './components/commons/ApplicationWrapper';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { CssBaseline, withStyles, createStyles } from '@material-ui/core';
import { purple, green } from '@material-ui/core/colors';

import WontShow from './components/pages/WontShow/WontShow';

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
});

interface AppProps {
  classes: any;
}

const App: React.FC<AppProps> = props => {
  
  const { classes } = props;
  const airports = [
    {
      code: 'foo',
      name: 'FooAirport'
    },
    {
      code: 'bar',
      name: 'BarAirport'
    }
  ];

  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={applicationTheme}>
        <CssBaseline />
        <ApplicationWrapper>
          <WontShow
            airports={airports}
            isLoading={true}
            handleSearchWontShow={data => console.log(data)}/>
        </ApplicationWrapper>
      </MuiThemeProvider>
    </div>
  );

}

export default withStyles(styles)(App);
