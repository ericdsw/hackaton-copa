import React, { useState, FormEvent } from 'react';
import { withStyles, createStyles, MenuItem, Typography } from '@material-ui/core';
import { 
  TextField, Grid, Button, Select, FormControl, InputLabel
} from '@material-ui/core';

interface WontShowProps {
  classes: any;
  airports: Array<any>;
}

class WontShow extends React.Component<WontShowProps> {

  state = {
    
    from: '',
    to: '',
    day: '',
    time: '',

    airports: [],

    wontShow: -1,
    confidence: -1,
    records: 0
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  }

  // handleInputChange = (identifier: string) => (event: FormEvent<HTMLInputElement>) => {
  //   this.setState({
  //     [identifier]: (event.target as HTMLInputElement).value
  //   })
  // }

  render() {

    const { classes, airports } = this.props;

    const emptyOption = (
      <MenuItem key='---' value=''>
        <Typography>---</Typography>
      </MenuItem>
    );
    const airportOptions = airports.map(airport => {
      <MenuItem key={airport.key} value={airport.key}>
        <Typography>{airport.name}</Typography>
      </MenuItem>
    });

    return (
      <form onSubmit={this.handleSubmit}>

        <Grid container>

          <Grid item xs md={6}>
            <TextField 
              select
              id='from'
              label='From'
              value={this.state.from}
              fullWidth variant='outlined' margin='normal'>
                {airportOptions}
            </TextField>
          </Grid>

          <Grid item xs md={6}>
            <TextField 
              select
              id='to'
              label='To'
              value={this.state.from}
              fullWidth variant='outlined' margin='normal'>
                {airportOptions}
            </TextField>
          </Grid>
          
        </Grid>
      </form>
    );
  }
}

export default WontShow;
