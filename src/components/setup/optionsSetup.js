import React , {useEffect, useState}from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

export default function Options() {

  let assigneesLable = ' "assignees": '
  let shiftPresetsLable = ' "shiftPresets": '
  let ticketListsLabel = ' "ticketLists": '
  let optionsLabe = ' "options": '

  const [options, setOptions] = useState(JSON.parse(localStorage.getItem("options")))
  const [loopTimer, setLoopTimer] = useState(options.loopTimer)
  const [stopBeforeShiftEnd, setStopBeforeShiftEnd] = useState(options.stopBeforeShiftEnd)
  const [unassigeTicketsFromOnLeaveAssignees, setUnassigeTicketsFromOnLeaveAssignees] = useState(options.unassigeTicketsFromOnLeaveAssignees)
  
  const [congif, setCongif] = useState( ('{' + 
      assigneesLable + JSON.stringify(localStorage.getItem("assignees")) +
      "," + 
      shiftPresetsLable + JSON.stringify(localStorage.getItem("shiftPresets")) +
      "," + 
      ticketListsLabel + JSON.stringify(localStorage.getItem("ticketLists")) +
      "," +
      optionsLabe + JSON.stringify(localStorage.getItem("options")) + 
      '}')
    )

  useEffect(() => {
      localStorage.setItem("options", JSON.stringify(options))
      //console.log("options Have been Updated", options)
  }, [options])   

  const handleUpdateStopBeforeShiftEnd = (e) => {
      setStopBeforeShiftEnd(e.target.value);
      options.stopBeforeShiftEnd = e.target.value
      passBackInfo(options)
    };
  
  const handleUpdateUnassigeTicketsFromOnLeaveAssignees = (e) => {
      setUnassigeTicketsFromOnLeaveAssignees(e.target.checked);
      options.unassigeTicketsFromOnLeaveAssignees = e.target.checked
      passBackInfo(options)
  } ;

  const handleUpdateLoopTimer = (e) => {
    setLoopTimer(e.target.value)
    options.loopTimer = e.target.value
    passBackInfo(options)
  }

  const passBackInfo = (options) => {
      let temp = JSON.parse(JSON.stringify(options))
      temp.stopBeforeShiftEnd = options.stopBeforeShiftEnd
      temp.unassigeTicketsFromOnLeaveAssignees = options.unassigeTicketsFromOnLeaveAssignees
      setOptions(temp)
  }

  const handleLoadConfig = (e) => {
    let obj = JSON.parse(congif)
    localStorage.setItem("options", obj.options)
    localStorage.setItem("assignees", obj.assignees)
    localStorage.setItem("shiftPresets", obj.shiftPresets)
    localStorage.setItem("ticketLists", obj.ticketLists)
  }

  const handleUpdateCongif = (e) => {
    setCongif(e.target.value)
  }

  const handleResetConfig = (e) => {
    localStorage.removeItem("options")
    localStorage.removeItem("assignees")
    localStorage.removeItem("ticketLists")
    localStorage.removeItem("shiftPresets")
  }
  

  return (
    <Grid container spacing={1} >
        <Grid xs={11} style={{ paddingTop: 20 }}>
            <TextField type="number" size="small" style={{minWidth: '400px'}} id="loopTimer" label="Loops timmer in seconds" variant="outlined" value={loopTimer}  onChange={handleUpdateLoopTimer} />
        </Grid>
        <Grid xs={11} style={{ paddingTop: 20 }}>
            <TextField type="number" size="small" style={{minWidth: '400px'}} id="stopBeforeShiftEnd" label="Stop assigning before end of shift in min" variant="outlined" value={stopBeforeShiftEnd}  onChange={handleUpdateStopBeforeShiftEnd} />
        </Grid>
        <Grid xs={10} style={{ paddingTop: 20 }}>
          <FormControl>
              <FormControlLabel control={<Switch checked={unassigeTicketsFromOnLeaveAssignees} onChange={handleUpdateUnassigeTicketsFromOnLeaveAssignees}/>} label='Unassign "User Responded" tickets from on leave assignees' />
          </FormControl>
      </Grid>
      <Grid xs={10} style={{ paddingTop: 20 }}>
        <TextField multiline rows={15} size="small" style={{minWidth: '700px'}} id="config" label="Configuration File" variant="outlined" value={congif}  onChange={handleUpdateCongif} />
      </Grid>
      <Grid xs={11}>
          <Button style={{minWidth: '230px' , marginTop: '5px' }} onClick={(data) => handleLoadConfig(data)} variant="contained">Load Config Changes
          </Button>
      </Grid>
      <Grid xs={11}>
          <Button style={{minWidth: '230px' , marginTop: '5px' }} onClick={(data) => handleResetConfig(data)} variant="contained">Reset Config
          </Button>
      </Grid>
    </Grid> 
  );
}



