import React, { useState } from 'react';
import { Typography, AppBar, Toolbar, Box, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import FilterListIcon from '@material-ui/icons/FilterList';
import useStyles from './styles';

const Header = ({ setCoordinates }) => {
  const classes = useStyles();
  const [date, setDate] = useState('');

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <div className={classes.dateInputContainer}>
            <CalendarTodayIcon className={classes.dateIcon} />
            <input
              type="date"
              value={date}
              onChange={handleDateChange}
              className={classes.dateInput}
            />
          </div>
          {date && (
            <Typography variant="h3" className={classes.selectedDate}>
              Selected Date: {date}
            </Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center" className={classes.searchBox}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Where to?"
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div>
          <IconButton color="inherit">
            <FilterListIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
