import React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TicketListsItem(props) {
  let ticketLists = props.ticketLists
  const [switchPos, setSwitchPos] = React.useState(() => {
    if (props.running === "Active"){
      return true
    } else {
      return false
    }
    });

  const [listName, setListName] = React.useState(props.listName);
  const [listUrl, setListUrl] = React.useState(props.listUrl);
  const [switchLable, setSwitchLable] = React.useState(props.running);

  const handleRunningChange = (event) => {
    setSwitchPos(event.target.checked);
    if(event.target.checked){
      setSwitchLable("Active")
      ticketLists.running = "Active"
    } else{
      setSwitchLable("Inactive")
      ticketLists.running = "Inactive"
    }
    props.passBackInfo(ticketLists, props.ticketListsID)
  };

  const handleUpdateName = (e) => {
    setListName(e.target.value);
    ticketLists.name = e.target.value
    props.passBackInfo(ticketLists, props.ticketListsID)
  };

  const handleUpdateUrl = (e) => {
    setListUrl(e.target.value);
    ticketLists.url = e.target.value
    props.passBackInfo(ticketLists, props.ticketListsID)
  };



  return (
    <Grid container spacing={3} >
    <Grid xs={10} >
        <TextField size="small" style={{minWidth: '600px'}} id="name" label="Name of list" variant="outlined" value={listName}  onChange={handleUpdateName} />
    </Grid>
    <Grid xs={2} >
        <IconButton aria-label="delete" onClick={(data) => props.handleDelete(props.ticketListsID)}>
            <DeleteIcon />
        </IconButton>
    </Grid>
    <Grid xs={10} style={{paddingTop: 0, paddingBottom: 30}}>
        <TextField multiline rows={4} size="small" style={{minWidth: '600px'}} id="url" label="URL to ServiceNow list of unassinged tickets" variant="outlined" value={listUrl}  onChange={handleUpdateUrl} />
    </Grid>
    <Grid xs={2} >
        <FormControl>
            <FormControlLabel control={<Switch checked={switchPos} onChange={handleRunningChange}/>} label={switchLable} />
        </FormControl>
    </Grid>
    </Grid>

  );
}

