import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/styles';
import { purple, green } from '@material-ui/core/colors';

const applicationTheme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: green
    }
});

const styles = ({mixins, spacing, breakpoints}: Theme) => createStyles({
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
