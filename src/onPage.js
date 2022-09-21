import React from 'react';
import './styles/popup.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import start from './functions/start'
import { useWakeLock } from 'react-screen-wake-lock';
import ServiceNowTabActive from './components/serviceNowTabActive';
import IsRunning from './components/isRunning';


export default function OnPage() {

  const {request, release } = useWakeLock();

  const [startStopText, setStartStopText] = React.useState("Start");
  
  const [menuState, setMenuState] = React.useState(null);
  const open = Boolean(menuState);
  const handleMenuClick = (event) => {
    setMenuState(event.currentTarget);
  };
  const handleClose = () => {
    setMenuState(null);
  };

  const handleStartStop = () => {
    if (startStopText === "Start"){
      setStartStopText("Stop")
      start()
      //request()
    }else{
      setStartStopText("Start")
      //release()
    }
  };
  return (
    <Box sx={{ flexGrow: 1}} style={{marginRight: '-300px', width: '600px'}}>
      <AppBar position="static">
        <Toolbar  style = {{ minHeight: '30px' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={menuState}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Options</MenuItem>
          </Menu>
          
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
            <ServiceNowTabActive />
          </Typography>
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
            <IsRunning />
          </Typography>
          <Button style={{minWidth: '100px'}} onClick={handleStartStop} variant="contained" color="secondary">{startStopText}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

