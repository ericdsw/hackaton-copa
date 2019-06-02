import React, { useState, FormEvent } from 'react';
import { Theme } from '@material-ui/core/styles';
import { 
  withStyles,
  createStyles,
  MenuItem,
  Typography,
  TextField, 
  Grid, 
  Button,
  CircularProgress,
  Paper
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider, 
  DatePicker, 
  TimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Airport, NoShow } from '../../../api/api';

const styles = (theme: Theme) => createStyles({
  textField: {
  },
  circularProgress: {
    margin: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(3)
  }
});

interface WontShowProps {
  classes: any;
  airports: any;
  isLoading: boolean;
  handleSearchWontShow(data: any): void;
  result?: NoShow
}

const WontShow : React.FC<WontShowProps> = props => {

  const { 
    classes, airports, handleSearchWontShow, isLoading, result
  } = props;

  const selectElements = airports.map((airport: Airport) => {
    return (
      <MenuItem key={airport.code} value={airport.code}>
        <Typography>
          {airport.name} ({airport.code})
        </Typography>
      </MenuItem>
    );
  });
  selectElements.splice(0,0, 
    <MenuItem key='' value=''>
      <Typography>
        ---
      </Typography>
    </MenuItem>
  )

  const [selectedDate, setSelectedDate] = useState<Date|null>(new Date());
  const [curOrigin, setOrigin] = useState<string>('');
  const [curDest, setDest] = useState<string>('');

  function handleDateChange(date: Date | null) {
    setSelectedDate(date);
  }

  function submitForm(event: FormEvent) {
    event.preventDefault();
    handleSearchWontShow({
      origin: curOrigin,
      destination: curDest,
      date: selectedDate
    });
  }

  return (
    <Grid container spacing={2} alignItems='stretch'>
      <Grid item xs={12} md={7}>
        <Paper className={classes.paper}>
          <form onSubmit={submitForm}>

            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Typography variant='h6'>
                  Flight Information
                </Typography>
              </Grid>

              <Grid item xs md={6}>

                <TextField
                  select
                  fullWidth
                  variant='outlined'
                  id='from'
                  label='From'
                  className={classes.textField}
                  margin='normal'
                  value={curOrigin}
                  onChange={e => { setOrigin(e.target.value)} }> 
                  {selectElements}
                </TextField>

              </Grid>

              <Grid item xs md={6}>
                <TextField 
                  select
                  fullWidth 
                  variant='outlined'
                  id='to'
                  label='To'
                  className={classes.textField}
                  margin='normal'
                  value={curDest}
                  onChange={e => setDest(e.target.value)}>
                  {selectElements}
                </TextField>
                  
              </Grid>

              <Grid item xs={12}>
                <Typography variant='h6'>
                  Date / Time
                </Typography>
              </Grid>

              <Grid item xs md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    margin='normal'
                    label='Select Day' 
                    value={selectedDate}
                    className={classes.textField}
                    onChange={handleDateChange}
                    fullWidth
                  />
                  <TimePicker
                    margin='normal'
                    label='Select Time' 
                    value={selectedDate}
                    className={classes.textField}
                    onChange={handleDateChange}
                    fullWidth
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              
              <Grid item xs={12}>
                <Grid 
                  container
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                >
                  <Button
                    variant='contained'
                    type='submit'
                    color='primary'
                  >
                  Submit
                  </Button>

                  {isLoading &&
                    <CircularProgress className={classes.circularProgress} />
                  }
                </Grid>

              </Grid>

            </Grid>
          </form>
        </Paper>
      </Grid>

      <Grid item xs={12} md={5}>
        <Paper className={classes.paper}>
          <Typography variant='h6' gutterBottom>
            Estimated Result
          </Typography>

          {result &&
            <div>{result}</div>
          }

          {!result &&
            <Typography align='center' variant='subtitle1'>
              Nothing to show
            </Typography>
          }

        </Paper>
      </Grid>

    </Grid>
  );
}

export default withStyles(styles)(WontShow);

