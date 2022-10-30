import React , {useEffect} from 'react';
import './styles/popup.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Status from './components/status';
import Setup from './components/setup/setup';
import findAssignedToOfFirstTicket from './functions/findAssignedToOfFirstTicket';
import GetiframUrlFromUserInputUrl from './functions/getiframUrlFromUserInputUrl';
import MakeAvalibleAssigneeList from './functions/makeAvalibleAssigneeList';
import FindAssignedToPopUp from './functions/findAssignedToPopUp';
import MakeAvalibleListsList from './functions/makeAvalibleListsList';
import MakeAssigneesOnLeaveSNowIDList from './functions/makeAssigneesOnLeaveSNowIDList';
import injectionScript from './components/script'
import axios from 'axios';

const sleep = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

export default function Popup() {

  if (localStorage.getItem("shiftPresets") === null || localStorage.getItem("shiftPresets") === 'null') {
    console.log("shiftPresets Var has been set to default")
    localStorage.setItem("shiftPresets", JSON.stringify([]))
  }
  
  if (localStorage.getItem("ticketLists") === null || localStorage.getItem("ticketLists") === 'null') {
    console.log("ticketLists Var has been set to default")
    localStorage.setItem("ticketLists", JSON.stringify([]))
  }
  
  if (localStorage.getItem("assignees") === null || localStorage.getItem("assignees") === 'null') {
    console.log("Assignees Var has been set to default")
    localStorage.setItem("assignees", JSON.stringify([]))
  }
  
  if (localStorage.getItem("options") === null || localStorage.getItem("options") === 'null' || localStorage.getItem("options") === "[]") {
    console.log("options Var has been set to default")
    localStorage.setItem("options", JSON.stringify({loopTimer: 8, stopBeforeShiftEnd: 10, unassigeTicketsFromOnLeaveAssignees: false}))
  }
  

  const [startStopText, setStartStopText] = React.useState("Start");
  const [setupText, setSetupText] = React.useState("Open Setup");
  const [statusText, setStatusText] = React.useState("Stopped");
  const [statusTextColor, setStatusTextColor] = React.useState("white");
  const [iframeURL, setIframeURL] = React.useState("");
  
  // loop timer
  let searchInterval = JSON.parse(localStorage.getItem("options")).loopTimer * 1000
  let flipFlop = 1 
  let runURLNumber = 0
  let assigneeAssignedToNumber = 0
  let assigneeOnLeaveNumber = 0
  let wakeLock = null;

  const keepAwake = async () => {
    try {
      wakeLock = await navigator.wakeLock.request();
      wakeLock.addEventListener('release', () => {
      });
    } catch (err) {
      console.log(`${err.name}, ${err.message}`);
    }
  }

  const handleStartStop = () => {
    if (startStopText === "Start"){


      chrome.runtime.sendMessage({method:"runFunction"}, function(response) {
        console.log("getting Back!!! ",response);
      });

      var evt = new CustomEvent("MyEventType", {detail: "Any Object Here"});
      window.dispatchEvent(evt);

      


        setStartStopText("Stop")
      setSetupText("Open Setup")
      setStatusText("Running")
      setStatusTextColor("#7FFFD4")
      keepAwake();
    }else{
      setStartStopText("Start")
      setStatusText("Stopped")
      setStatusTextColor("white")
    }
  };

  const handleSetup = () => {
    if (setupText === "Open Setup"){
      setSetupText("Close Setup")
      setStartStopText("Start")
      setStatusText("Stopped")
      setStatusTextColor("white")
      keepAwake();
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

  const focus = new FocusEvent('focus');

  const backspaceKeyEvent = new KeyboardEvent('keydown', {
    bubbles: true, cancelable: true, keyCode: 8
  });

  var backspaceEvnt = new KeyboardEvent('keydown', {'keyCode': 8, 'which': 8});  

  const downArrowKeyEvent = new KeyboardEvent('keydown', {
    bubbles: true, cancelable: true, keyCode: 40
  });
  
  async function testIfCanBeAssigned(assignee, assigneeList) {
    await sleep(searchInterval/4);
    let isThereATicketInList = findAssignedToOfFirstTicket(document)
    if (isThereATicketInList !== undefined) {
      inserAssigneeInToTicket(assignee)
      console.log("All avalible assignees : ", assigneeList)
      console.log("And the winner is : ", assignee)
     }
  }

  async function getTodos(href) {
    // Simple one
     let todos = await axios.get(href);
    console.log("axios!!!!!!",todos.data.g_builddate);
  }

  async function inserAssigneeInToTicket(assignee) {
    //let iframe = document.getElementById("gsft_main").contentWindow.document

    await sleep(searchInterval/8);

    let iframe = document.getElementById("gsft_main").contentWindow.document;

    console.log("iframe", iframe)
    console.log("linked formlink", iframe.getElementsByClassName("linked formlink"))


    setIframeURL(iframe.getElementsByClassName("linked formlink")[0].href)   
    document.getElementById("gsft_main").src = iframe.getElementsByClassName("linked formlink")[0].href;
    
    //document.getElementById("miniIframe").src = iframe.getElementsByClassName("linked formlink")[0].href;
    await sleep(searchInterval/4);


    getTodos(iframe.getElementsByClassName("linked formlink")[0].href)
    

    // iframe = document.getElementById("gsft_main").contentWindow.document;
    // console.log("click!!!!!!!", iframe.getElementsByClassName("container-fluid")[0])
    // iframe.getElementsByClassName("container-fluid")[0].click()


    // await sleep(searchInterval/8);

    // let currentTabId = ""
    // chrome.runtime.sendMessage({ text: "what is my tab_id?" }, tabId => {
    //   console.log('My tabId is', tabId);
    //   currentTabId = tabId
    // });


    // console.log("currentTabId".currentTabId)

    // console.log("g_form!!!!!!!", document.getElementById('gsft_main').contentWindow.g_form)
    //document.getElementById('gsft_main').contentWindow.g_form.setValue('assigned_to', 'a182e1ed6fc67100089be4021c3ee434');
    // await sleep(searchInterval/4);
    // document.getElementById('gsft_main').contentWindow.g_form.save()


    //iframe.contentDocument.querySelector('.breadcrumb_container').click()
    // let ticket = iframe.getElementsByClassName('breadcrumb_container')
    // ticket[1].dispatchEvent(singleClickEvent)
    // await sleep(searchInterval/16);
    // ticket[1].dispatchEvent(singleClickEvent)

    // let isThereATicketInList = findAssignedToOfFirstTicket(document)
    // isThereATicketInList.dispatchEvent(doubleClickEvent)
    // await sleep(searchInterval/16);
    // let assignedToPopUp = FindAssignedToPopUp(document)
    // assignedToPopUp.value = assignee//.slice(0, -1)

    // assignedToPopUp.dispatchEvent(focus)
    // await sleep(searchInterval/16);
    // assignedToPopUp.dispatchEvent(downArrowKeyEvent)
    // await sleep(searchInterval/2);
    // assignedToPopUp.dispatchEvent(enterKeyEvent)
    // iframe.contentDocument.querySelector('#cell_edit_ok').click()
    //assignedToPopUp.dispatchEvent(enterKeyEvent)

  }

  async function UnassignAssigneesOnLeave() {
    await sleep(searchInterval/16);
    let iframe = document.getElementById("gsft_main").contentWindow.document
    let ticket = iframe.getElementsByClassName('breadcrumb_container')
    ticket[1].dispatchEvent(singleClickEvent)
    await sleep(searchInterval/16);
    ticket[1].dispatchEvent(singleClickEvent)
    let isThereATicketInList = findAssignedToOfFirstTicket(document)
    isThereATicketInList.dispatchEvent(doubleClickEvent)
    await sleep(searchInterval/16);
    let assignedToPopUp = FindAssignedToPopUp(document)
    assignedToPopUp.value = ''
    await sleep(searchInterval/16);
    iframe.contentDocument.querySelector('#cell_edit_ok').click()
    //assignedToPopUp.dispatchEvent(enterKeyEvent)

  }

  // loop every searchInterval
  useEffect(() => {
    
    const interval = setInterval(() => {

    let UnassignTickets = JSON.parse(localStorage.getItem("options")).unassigeTicketsFromOnLeaveAssignees
    let today = new Date();
    let systemTime = parseInt(today.toLocaleTimeString('en-US', {hour12: false,}).replace(":", "").slice(0, -1))
    //console.log("the system time is: ", systemTime)
    let assigneesOnLeaveSNowIDList = MakeAssigneesOnLeaveSNowIDList()
    // stop at midnight
    if(systemTime >= 3333 ){
      if (startStopText === "Stop"){
        setStartStopText("Start")
        setStatusText("Stopped for the night")
        setStatusTextColor("orange")
        console.log("AA stoped for the night")
      }
    } else {
      // if not stoped
      if (startStopText === "Stop"){
        // test if we are unassigningtickests
        if (UnassignTickets === false || assigneesOnLeaveSNowIDList.length === 0 || (UnassignTickets === true && flipFlop === 1)) {
          flipFlop = 0
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

              //if the ticker in > the number of people avalible then user the 0th person. 
              if (assigneeAssignedToNumber > (avalibleAssigneeList.length - 1)){
                assigneeAssignedToNumber = 0
              }

              testIfCanBeAssigned(avalibleAssigneeList[assigneeAssignedToNumber], avalibleAssigneeList )

              // add one to the ticker
              assigneeAssignedToNumber += 1

              //move to next list
              if (ticketList.length - 1 === runURLNumber){
                runURLNumber = 0
              } else {
                runURLNumber += 1
              }
            }
          }

        } else if (assigneesOnLeaveSNowIDList.length > 0 || (UnassignTickets === true && flipFlop === 0)){
          flipFlop = 1

          let onLeaveUrl = '/task_list.do?sysparm_query=active%3Dtrue%5Eassigned_to%3D' + assigneesOnLeaveSNowIDList[assigneeOnLeaveNumber] + '%5Estate%3D200&sysparm_view='

          document.getElementById("gsft_main").src = onLeaveUrl;

          UnassignAssigneesOnLeave()

          if (assigneesOnLeaveSNowIDList.length - 1 === assigneeOnLeaveNumber){
            assigneeOnLeaveNumber = 0
          } else {
            assigneeOnLeaveNumber += 1
          }
        }
      }
    }
    }, searchInterval);
    return () => clearInterval(interval);

  }, [startStopText])


// <iframe id='miniIframe' src={iframeURL} style={{marginRight: '-400px', Height: '400px',width: '800px',border: '1px solid', boxShadow: '2px 2px 10px'}} />

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
