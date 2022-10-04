import React, {useEffect} from 'react';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
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
        setShiftPresetValue(e.target.value)
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

    let listBreaks = props.assignee.breaks.map((item, i) => (
        <Item>
            <BreakItem assigneeID={props.assigneeID} breakID={item.id} break={item} number={i} handleDeleteBreak={props.handleDeleteBreak} updateBreakStartTime={props.updateBreakStartTime} updateBreakLength={props.updateBreakLength}/>
        </Item>   
    ))


    return (
            <Grid container spacing={3} >
                <Grid xs={7} >
                    <TextField size="small" style={{minWidth: '400px'}} id="full-name" label="Full name as it is on the ServiceNow" variant="outlined" value={nameValue}  onChange={handleUpdateName} />
                </Grid>
                <Grid xs={3} >
                    <FormControl>
                        <InputLabel htmlFor="status">Status</InputLabel>
                        <Select
                            id="status"
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            value={statusValue}
                            onChange={handleStatusChange}
                            style={{minWidth: '140px', maxHeight: 30}}
                            label={"Status"}
                            >
                            <MenuItem value={"Working"}>Working</MenuItem>
                            <MenuItem value={"On Leave"}>On Leave</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={2} >
                    <IconButton aria-label="delete" onClick={(data) => props.handleDelete(props.assigneeID)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
                <Grid xs={5} style={{paddingTop: 0, paddingBottom: 0}}>
                    <FormControl>
                        <InputLabel htmlFor="shift-sresets">Shift Presets</InputLabel>
                        <Select
                            id="shift-sresets"
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            value={shiftPresetValue}
                            onChange={handlePresetChange}
                            style={{minWidth: '280px', maxHeight: 30}}
                            label="Shift Presets"
                            >
                            <MenuItem value={"none"}>none</MenuItem>
                            {/* <MenuItem value={"8am1130"}>8am1130</MenuItem>
                            <MenuItem value={"9am1230"}>9am1230</MenuItem>
                            <MenuItem value={"9am1330"}>9am1330</MenuItem>
                            <MenuItem value={"1:30"}>1:30</MenuItem> */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid xs={3} style={{paddingTop: 0, paddingRight: 10, paddingBottom: 0, maxWidth: '140px'}}>
                    <TextField size="small" id="shift_start_time" label="Shift Start Time" variant="outlined" value={startTimeValue}  onChange={handleStartTimeChange} />
                </Grid>
                <Grid xs={3} style={{paddingTop: 0 , paddingBottom: 0,maxWidth: '140px'}}>
                    <TextField size="small" id="shift_End_time" label="Shift End Time" variant="outlined" value={endTimeValue}  onChange={handleEndTimeChange} />
                </Grid>
                <Grid xs={1} style={{ padding: 0 }}></Grid>
                <Grid xs={2} style={{ padding: 0 }}></Grid>
                <Grid xs={2} style={{ paddingTop: 10 }}>
                    <Button color='secondary' style={{minWidth: '100px' ,fontSize: '11px', marginBottom: '20px'}} onClick={(data) => handleAddBreak(props.assigneeID)} variant="contained">Add break
                    </Button>
                </Grid>
                <Grid xs={8} style={{paddingTop: 5}}>
                    {listBreaks}
                </Grid>
            </Grid>
    );
}

