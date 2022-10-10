import React, {useEffect} from 'react';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import BreakItem from './breakItem'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function timeMaker(data){
    data = data.replace(/\D/g, "").trim().substring(0, 4)
    if(data.length === 4) {
        return data.slice(0, 2) + ":" + data.slice(2)
    }
    return data
}

function textCleaner(data){
    return data.replace(/[`~!@#$%^&*()|+\-=?;:'",.<>{}[\]\\/0-9]/gi, '')
}

export default function AssigneeListItem(props) {
    let assignee = props.assignee
     
    const [statusValue, setStatusValue] = React.useState(assignee.status);
    const [nameValue, setNameValue] = React.useState(assignee.name);
    const [shiftPresetValue, setShiftPresetValue] = React.useState("none");
    const [startTimeValue, setStartTimeValue] = React.useState(assignee.startTime);
    const [endTimeValue, setEndTimeValue] = React.useState(assignee.endTime);
    const [sNowId, setSNowId] = React.useState(assignee.serviceNowId);
    const [sNowIdPopUp, setSNowIdPopUp] = React.useState(false);
    


    useEffect(() => {
        setEndTimeValue(assignee.endTime)
    }, [assignee.endTime])  

    useEffect(() => {
        setStartTimeValue(assignee.startTime)
    }, [assignee.startTime])   

   
    const handleUpdateName = (e) => {
        let data = textCleaner(e.target.value)
        setNameValue(data)
        assignee.name = data.trim()
        props.passBackInfo(assignee, props.assigneeID)
    };

    const handleStatusChange = (e) => {
        setStatusValue(e.target.value)
        assignee.status = e.target.value
        props.passBackInfo(assignee, props.assigneeID)
    };

    const handleAddBreak = () => {
        props.handleAddBreak(props.assigneeID)
    };

    const handlePresetChange = (e) =>{
        let value = e.target.value
        setShiftPresetValue(value)
        if(e.target.value !== "none") {
            shiftPresets = JSON.parse(localStorage.getItem("shiftPresets"))
            let shiftDetails = shiftPresets.find(x => x.id === value)

            setEndTimeValue(shiftDetails.endTime)
            assignee.endTime = shiftDetails.endTime
            props.passBackInfo(assignee, props.assigneeID)

            setStartTimeValue(shiftDetails.startTime)
            assignee.startTime = shiftDetails.startTime
            props.passBackInfo(assignee, props.assigneeID)

            props.overrideBreakValue(shiftDetails.breaks, props.assigneeID)
        }
    };

    const handleStartTimeChange = (e) =>{
        let data = timeMaker(e.target.value)
        setStartTimeValue(data)
        assignee.startTime = data
        props.passBackInfo(assignee, props.assigneeID)
    };

    const handleEndTimeChange = (e) =>{
        let data = timeMaker(e.target.value)
        setEndTimeValue(data)
        assignee.endTime = data
        props.passBackInfo(assignee, props.assigneeID)
    };

    const handleGetID = (e) =>{
        setSNowIdPopUp(true)
    };

    const handleCloseSNowIdPopUp = (e) =>{
        setSNowIdPopUp(false)
    };

    const canSplit = function(str, token){
        return (str || '').split(token).length > 1;         
    }

    const handleAssigneeProfilePageUrlUpdate = (e) =>{
        if (canSplit(e.target.value,"id%3D") === false && canSplit(e.target.value,"%26sy") === false){
            setSNowId("error")
            assignee.serviceNowId = "error"
        } else {
            let result = e.target.value.split("id%3D")
            result = result[1].split("%26sy")[0]
            setSNowId(result)
            assignee.serviceNowId = result
        }
        setSNowIdPopUp(false)
        props.passBackInfo(assignee, props.assigneeID)
    };
    
    let shiftPresets = JSON.parse(localStorage.getItem("shiftPresets")).map((item, i) => (
        <MenuItem value={item.id}>{item.name}</MenuItem>
    ))


    let listBreaks = props.assignee.breaks.map((item, i) => (
        <Item>
            <BreakItem assigneeID={props.assigneeID} breakID={item.id} break={item} number={i} handleDeleteBreak={props.handleDeleteBreak} updateBreakStartTime={props.updateBreakStartTime} updateBreakLength={props.updateBreakLength}/>
        </Item>   
    ))

    return (
        <div>
            {(() => {
                if (sNowIdPopUp){
                    return (
                        <Grid container spacing={3} >
                            <Grid xs={9} style={{ paddingBottom: 4}}>
                                <div style={{ margin:0 , paddingTop: 0}}>Copy the URL of the assignee's profile page into the field below.</div>
                                <div style={{ margin:0 }}>This "User - Assignee's Name" page where you can see all their details</div>
                            </Grid>
                            <Grid xs={1} >
                                <IconButton aria-label="delete" onClick={(e) => handleCloseSNowIdPopUp()}>
                                    <CancelIcon />
                                </IconButton>
                            </Grid>
                            <Grid xs={10} style={{paddingTop: 0, paddingBottom: 0}}>
                                <TextField size="small" style={{minWidth: '600px'}} id="url" label="Assignee's profile page URL" variant="outlined" onChange={handleAssigneeProfilePageUrlUpdate} />
                            </Grid>
                        </Grid>
                        )
                } else {
                    return (
                        <Grid container spacing={3}>
                            <Grid xs={4.2} >
                                <TextField size="small" style={{minWidth: '260px'}} id="full-name" label="Full name as on the ServiceNow" variant="outlined" value={nameValue}  onChange={handleUpdateName} />
                            </Grid>
                            <Grid xs={4} >
                                <TextField disabled size="small" style={{minWidth: '250px'}} id="full-name" label="ServiceNow ID" variant="outlined" value={sNowId}  onChange={handleUpdateName} />
                            </Grid>
                            <Grid xs={2} style={{ paddingTop: 10 }}>
                                <Button color='secondary' style={{minWidth: '100px' ,fontSize: '11px', marginTop: '5px' }} onClick={(data) => handleGetID()} variant="contained">Get ID
                                </Button>
                            </Grid>
                            <Grid xs={1} >
                                <IconButton aria-label="delete" onClick={(data) => props.handleDelete(props.assigneeID)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                            <Grid xs={3} style={{paddingTop: 0, paddingBottom: 0}}>
                                <FormControl>
                                    <InputLabel htmlFor="status">Status</InputLabel>
                                    <Select
                                        size="small"
                                        id="status"
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        value={statusValue}
                                        onChange={handleStatusChange}
                                        style={{minWidth: '120px', maxHeight: 40}}
                                        label={"Status"}
                                        >
                                        <MenuItem value={"Working"}>Working</MenuItem>
                                        <MenuItem value={"On Leave"}>On Leave</MenuItem>
                                        <MenuItem value={"Invisible"}>Invisible</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={3.1} style={{paddingTop: 0, paddingBottom: 0}}>
                                <FormControl>
                                    <InputLabel htmlFor="shift-sresets">Shift Presets</InputLabel>
                                    <Select
                                        size="small"
                                        id="shift-sresets"
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        value={shiftPresetValue}
                                        onChange={handlePresetChange}
                                        style={{minWidth: '180px', maxHeight: 40}}
                                        label="Shift Presets"
                                        >
                                        <MenuItem value={"none"}>none</MenuItem>
                                        {shiftPresets}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={3} style={{paddingTop: 0, paddingRight: 10, paddingBottom: 0, maxWidth: '140px'}}>
                                <TextField size="small" id="shift_start_time" label="Shift Start Time" variant="outlined" value={startTimeValue}  onChange={handleStartTimeChange} />
                            </Grid>
                            <Grid xs={3} style={{paddingTop: 0 , paddingBottom: 0,maxWidth: '140px'}}>
                                <TextField size="small" id="shift_End_time" label="Shift End Time" variant="outlined" value={endTimeValue}  onChange={handleEndTimeChange} />
                            </Grid>

                        </Grid>
                    )
                }
            })()}
            <Grid container spacing={3} style={{paddingTop:15}}>
                <Grid xs={1} style={{ padding: 0 }}></Grid>
                <Grid xs={2} style={{ padding: 0 }}></Grid>
                <Grid xs={2} style={{ paddingTop: 10 }}>
                    <Button color='secondary' style={{minWidth: '100px' ,fontSize: '11px', marginBottom: '20px'}} onClick={(data) => handleAddBreak(props.assigneeID)} variant="contained">Add break
                    </Button>
                </Grid>
                <Grid xs={6} style={{paddingTop: 5}}>
                {listBreaks}
                </Grid>

            </Grid>
        </div>
    );
}

