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
import GetiframUrlFromUserInputUrl from './functions/getiframUrlFromUserInputUrl';
import MakeAvalibleAssigneeList from './functions/makeAvalibleAssigneeList';
import FindCellEditOk from './functions/findCellEditOk';
import FindAssignedToPopUp from './functions/findAssignedToPopUp';
import MakeAvalibleListsList from './functions/makeAvalibleListsList';

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function Popup() {

  const {request, release } = useWakeLock();

  const [startStopText, setStartStopText] = React.useState("Start");
  const [setupText, setSetupText] = React.useState("Open Setup");
  const [statusText, setStatusText] = React.useState("Stopped");
  const [statusTextColor, setStatusTextColor] = React.useState("white");
  
  // loop timer
  let searchInterval = 6000
  if (JSON.parse(localStorage.getItem("options")) === null || JSON.parse(localStorage.getItem("options")) === 'null'){
  } else {
    searchInterval = JSON.parse(localStorage.getItem("options")).loopTimer * 1000
  }
  let runURLNumber = 0
  let assigneeAssignedToNumber = 0

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
      setStartStopText("Start")
      setStatusText("Stopped")
      setStatusTextColor("white")
    }else{
      setSetupText("Open Setup")
    }
  };

  const doubleClickEvent = new MouseEvent('dblclick', {
    view: window, bubbles: true, cancelable: true
  });

  const singleClickEvent = new MouseEvent('click', {
    view: window, bubbles: true, cancelable: true
  });

  const enterKeyEvent = new KeyboardEvent('keydown', {
    bubbles: true, cancelable: true, keyCode: 13
  });
  
  async function testIfCanBeAssigned(assignee) {
    await sleep(searchInterval/4);
    let isThereATicketInList = findAssignedToOfFirstTicket(document)
    if (isThereATicketInList != undefined) {
      inserAssigneeInToTicket(assignee)
    } 
  }


  async function inserAssigneeInToTicket(assignee) {

    let iframe = document.getElementById("gsft_main").contentWindow.document
    let think = iframe.getElementsByClassName('breadcrumb_container')
    think[1].dispatchEvent(singleClickEvent)
    await sleep(searchInterval/16);
    let isThereATicketInList = findAssignedToOfFirstTicket(document)
    isThereATicketInList.dispatchEvent(doubleClickEvent)
    await sleep(searchInterval/4);
    let assignedToPopUp = FindAssignedToPopUp(document)

    assignedToPopUp.value = assignee
    assignedToPopUp.dispatchEvent(enterKeyEvent)

  }

  // loop every searchInterval
  useEffect(() => {
    
    const interval = setInterval(() => {

    let today = new Date();
    let systemTime = parseInt(today.toLocaleTimeString().replace(":", "").slice(0, -1))
    // stop at midnight
    if(systemTime >= 2355 ){
      if (startStopText === "Stop"){
        setStartStopText("Start")
        setStatusText("Stopped for the night")
        setStatusTextColor("orange")
        console.log("AA stoped for the night")
      }
    } else {
      // if not stoped
      if (startStopText === "Stop"){
        //if there are avalible assignees
        let avalibleAssigneeList = MakeAvalibleAssigneeList()
        if (avalibleAssigneeList.length > 0) {
          //it there are activated lists
          let ticketList = MakeAvalibleListsList()

          if (ticketList.length > 0) {
            //set list to list name
            let listIframURL = GetiframUrlFromUserInputUrl(ticketList[runURLNumber])
            document.getElementById("gsft_main").src = listIframURL;
            //test is loaded after 1 sec
            
            testIfCanBeAssigned(avalibleAssigneeList[assigneeAssignedToNumber])

            if (avalibleAssigneeList.length - 1 === assigneeAssignedToNumber){
              assigneeAssignedToNumber = 0
            } else {
              assigneeAssignedToNumber += 1
            }

            //move to next list
            if (ticketList.length - 1 === runURLNumber){
              runURLNumber = 0
            } else {
              runURLNumber += 1
            }
          }
        }
      }
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

