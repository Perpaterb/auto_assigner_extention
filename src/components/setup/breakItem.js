import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function timeMaker(data){
    data = data.replace(/\D/g, "").trim().substring(0, 4)
    if(data.length === 4) {
        return data.slice(0, 2) + ":" + data.slice(2)
    }
    return data
}

function numberCleaner(data){
    return data.replace(/\D/g, "").trim()
}

export default function BreakItem(props) {


    const item = props.break    

    const [startTime, setStartTime] = React.useState(item.startTime);
    const [breakLength, setBreakLength] = React.useState(item.length);

    useEffect(() => {
        setStartTime(item.startTime)
    }, [item.startTime]);

    useEffect(() => {
        setBreakLength(item.length)
    }, [item.length]);

    const updateBreakStartTime = (e) => {
        let data = timeMaker(e.target.value)
        setStartTime(data)
        props.updateBreakStartTime(props.assigneeID, props.breakID, data)
    };

    const updateBreakLength = (e) => {
        let data = numberCleaner(e.target.value)
        setBreakLength(data)
        props.updateBreakLength(props.assigneeID, props.breakID, data)
    };

    return (
            <Grid container spacing={3} style={{backgroundColor: '#f0e9e4', padding: 0}}>
                <Grid xs={5} style={{paddingTop: 9, paddingRight: 0 ,maxWidth: '180px'}}>
                    <TextField size="small" id="break-start-time" label="Break Start Time" variant="outlined" value={startTime} onChange={(data) => {updateBreakStartTime(data)}} />
                </Grid>
                <Grid xs={5} style={{paddingTop: 9, paddingRight: 0 ,maxWidth: '180px'}}>
                    <TextField type="number" size="small" id="break-length" label="Break length in min" variant="outlined" value={breakLength}  onChange={(data) => {updateBreakLength(data)}} />
                </Grid>

                <Grid xs={2} style={{paddingTop: 9, paddingLeft: 0}}>
                    <IconButton style={{paddingLeft: 0}} aria-label="delete" onClick={(data) => props.handleDeleteBreak(props.assigneeID, props.breakID)}>
                        <DeleteIcon color='secondary'/>
                    </IconButton>
                </Grid>
            </Grid>
    );
}

