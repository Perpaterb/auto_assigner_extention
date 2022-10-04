import React , {useEffect} from 'react';
import './styles/popup.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useWakeLock } from 'react-screen-wake-lock';
import Status from './components/status';
import Setup from './components/setup/setup';
import findAssignedToOfFirstTicket from './functions/findAssignedToOfFirstTicket';

export default function Popup() {

  const {request, release } = useWakeLock();

  const [startStopText, setStartStopText] = React.useState("Start");
  const [setupText, setSetupText] = React.useState("Open Setup");
  const [statusText, setStatusText] = React.useState("Stopped");
  const [statusTextColor, setStatusTextColor] = React.useState("white");
  
  const handleStartStop = () => {
    if (startStopText === "Start"){
      setStartStopText("Stop")
      setSetupText("Open Setup")
      setStatusText("Running")
      setStatusTextColor("#7FFFD4")
      //request()
    }else{
      setStartStopText("Start")
      setStatusText("Stopped")
      setStatusTextColor("white")
      //release()
    }
  };

  const handleSetup = () => {
    if (setupText === "Open Setup"){
      setSetupText("Close Setup")
    }else{
      setSetupText("Open Setup")
    }
  };

  var doubleClickEvent = new MouseEvent('dblclick', {
    'view': window,
    'bubbles': true,
    'cancelable': true
  });

  let searchInterval = 4000

  useEffect(() => {
    const interval = setInterval(() => {

      if (startStopText === "Stop"){
        let ticketAssigneeElement = findAssignedToOfFirstTicket(document)
        ticketAssigneeElement.dispatchEvent(doubleClickEvent)
      }

    }, searchInterval);
  
    return () => clearInterval(interval);
  }, [startStopText])

  return (
    <Box sx={{ flexGrow: 1}} style={{marginRight: '-400px', width: '800px', border: '1px solid', boxShadow: '2px 2px 10px'}}>
      <AppBar position="static">
        <Toolbar  style = {{ minHeight: '30px' }}>
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
            <Status statusText={statusText} statusTextColor={statusTextColor}/>
          </Typography>
          <Button style={{minWidth: '80px', fontSize: '11px', marginRight: 5 }} onClick={handleStartStop} variant="contained" color="secondary">{startStopText}</Button>
          <Button style={{minWidth: '140px', fontSize: '11px'}} onClick={handleSetup} variant="contained" color="secondary">{setupText}</Button>
        </Toolbar>
      </AppBar>
      {(() => {
        if (setupText === "Close Setup"){
          return (
            <Setup />
          )
        }      
      })()}
    </Box>
  );
}

