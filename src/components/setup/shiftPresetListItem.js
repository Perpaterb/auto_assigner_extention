import React, {useEffect} from 'react';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import BreakItem from './breakItem'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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
    return data.replace(/[`~!@#$%^&*()|+\-=?;'",.<>{}[\]\\/]/gi, '')
}

export default function ShiftPresetListItem(props) {
    let shiftPreset = props.shiftPreset
     
    const [nameValue, setNameValue] = React.useState(shiftPreset.name);
    const [startTimeValue, setStartTimeValue] = React.useState(shiftPreset.startTime);
    const [endTimeValue, setEndTimeValue] = React.useState(shiftPreset.endTime);  

    useEffect(() => {
        setEndTimeValue(shiftPreset.endTime)
    }, [shiftPreset.endTime])  

    useEffect(() => {
        setStartTimeValue(shiftPreset.startTime)
    }, [shiftPreset.startTime])   

   
    const handleUpdateName = (e) => {
        let data = textCleaner(e.target.value)
        setNameValue(data)
        shiftPreset.name = data.trim()
        props.passBackInfo(shiftPreset, props.shiftPresetID)
    };

    const handleAddBreak = () => {
        props.handleAddBreak(props.shiftPresetID)
    };

    const handleStartTimeChange = (e) =>{
        let data = timeMaker(e.target.value)
        setStartTimeValue(data)
        shiftPreset.startTime = data
        props.passBackInfo(shiftPreset, props.shiftPresetID)
    };

    const handleEndTimeChange = (e) =>{
        let data = timeMaker(e.target.value)
        setEndTimeValue(data)
        shiftPreset.endTime = data
        props.passBackInfo(shiftPreset, props.shiftPresetID)
    };

    let listBreaks = props.shiftPreset.breaks.map((item, i) => (
        <Item>
            <BreakItem assigneeID={props.shiftPresetID} breakID={item.id} break={item} number={i} handleDeleteBreak={props.handleDeleteBreak} updateBreakStartTime={props.updateBreakStartTime} updateBreakLength={props.updateBreakLength}/>
        </Item>   
    ))

    return (
        <Grid container spacing={3}>
            <Grid xs={4.2} style={{ paddingBottom: 0 }}>
                <TextField size="small" style={{minWidth: '260px'}} id="full-name" label="Shift Preset Name" variant="outlined" value={nameValue}  onChange={handleUpdateName} />
            </Grid>
            <Grid xs={1.67} style={{ padding: 0 }}></Grid>
            <Grid xs={3} style={{paddingRight: 10, paddingBottom: 0, maxWidth: '140px'}}>
                <TextField size="small" id="shift_start_time" label="Shift Start Time" variant="outlined" value={startTimeValue}  onChange={handleStartTimeChange} />
            </Grid>
            <Grid xs={3} style={{paddingBottom: 0, maxWidth: '140px'}}>
                <TextField size="small" id="shift_End_time" label="Shift End Time" variant="outlined" value={endTimeValue}  onChange={handleEndTimeChange} />
            </Grid>
            <Grid xs={1} >
                <IconButton aria-label="delete" onClick={(data) => props.handleDelete(props.shiftPresetID)}>
                    <DeleteIcon />
                </IconButton>
            </Grid>
            <Grid xs={3} style={{ padding: 0 }}></Grid>
            <Grid xs={2} style={{ paddingTop: 10}}>
                <Button color='secondary' style={{minWidth: '100px' ,fontSize: '11px', marginBottom: '20px'}} onClick={(data) => handleAddBreak(props.shiftPresetID)} variant="contained">Add break
                </Button>
            </Grid>
            <Grid xs={6} style={{paddingTop: 0}}>
                {listBreaks}
            </Grid>
        </Grid>
    );
}

