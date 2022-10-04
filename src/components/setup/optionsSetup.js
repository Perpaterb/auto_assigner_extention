import React , {useEffect, useState}from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormControl from '@mui/material/FormControl';

export default function Options() {

  if (localStorage.getItem("options") === null) {
    console.log("options Var has been set to default")
    localStorage.setItem("options", JSON.stringify({stopBeforeShiftEnd: 10, unassigeTicketsFromOnLeaveAssignees: false}))
  }

  const [options, setOptions] = useState(JSON.parse(localStorage.getItem("options")))
  const [stopBeforeShiftEnd, setStopBeforeShiftEnd] = useState(options.stopBeforeShiftEnd)
  const [unassigeTicketsFromOnLeaveAssignees, setUnassigeTicketsFromOnLeaveAssignees] = useState(options.unassigeTicketsFromOnLeaveAssignees)

  useEffect(() => {
      localStorage.setItem("options", JSON.stringify(options))
      console.log("options Have been Updated", options)
  }, [options])   

  const handleUpdateStopBeforeShiftEnd = (e) => {
      setStopBeforeShiftEnd(e.target.value);
      options.stopBeforeShiftEnd = e.target.value
      passBackInfo(options)
    };
  
  const handleUpdateUnassigeTicketsFromOnLeaveAssignees = (e) => {
      setUnassigeTicketsFromOnLeaveAssignees(e.target.value);
      options.unassigeTicketsFromOnLeaveAssignees = e.target.value
      passBackInfo(options)
  } ;

  const passBackInfo = (options) => {
      let temp = JSON.parse(JSON.stringify(options))
      temp.stopBeforeShiftEnd = options.stopBeforeShiftEnd
      temp.unassigeTicketsFromOnLeaveAssignees = options.unassigeTicketsFromOnLeaveAssignees
      setOptions(temp)
  }

  return (
    <Grid container spacing={1} >
        <Grid xs={11} >
            <TextField type="number" size="small" style={{minWidth: '400px'}} id="stopBeforeShiftEnd" label="Stop assining before end of shift in min" variant="outlined" value={stopBeforeShiftEnd}  onChange={handleUpdateStopBeforeShiftEnd} />
        </Grid>
        <Grid xs={10} >
          <FormControl>
              <FormControlLabel disabled control={<Switch checked={unassigeTicketsFromOnLeaveAssignees} onChange={handleUpdateUnassigeTicketsFromOnLeaveAssignees}/>} label="Unassign tickets from on leave assignees (Coming Soon)" />
          </FormControl>
      </Grid>
    </Grid> 
  );
}



