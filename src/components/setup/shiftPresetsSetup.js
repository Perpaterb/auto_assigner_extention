import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import ShiftPresetListItem from './shiftPresetListItem'


export default function ShiftPresetsSetup(props) {

    const [shiftPresetsArray, setShiftPresetsArray] = useState(JSON.parse(localStorage.getItem("shiftPresets")))

    useEffect(() => {
        localStorage.setItem("shiftPresets", JSON.stringify(shiftPresetsArray))
        //console.log("ShiftPresets Have been Updated", shiftPresetsArray)
    }, [shiftPresetsArray])   

    const handleAddShiftPreset = () => {
        setShiftPresetsArray(shiftPresetsArray => [...shiftPresetsArray, {id: Math.random().toString().slice(2,11) ,name: "", startTime: "09:00", endTime: "17:00", breaks: []}])
    };

    const handleDelete = async (shiftPresetsID) => {
        setShiftPresetsArray(shiftPresetsArray.filter((a, i) => a.id !== shiftPresetsID))
    }   

    const handleAddBreak = async (shiftPresetsID) => {
        let temp = JSON.parse(JSON.stringify(shiftPresetsArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === shiftPresetsID) {
                temp[i].breaks.push({id: Math.random().toString().slice(2,11) , startTime: "12:00", length: "60"})
                setShiftPresetsArray(temp)
            }
        }
    }   

    const handleDeleteBreak = async (shiftPresetsID, presetsID) => {    
        let temp = JSON.parse(JSON.stringify(shiftPresetsArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === shiftPresetsID) {
                let temp2 = temp[i].breaks.filter((x, y) => x.id !== presetsID)
                temp[i].breaks = temp2
                setShiftPresetsArray(temp)
            }
        }
    }
    
    const updateBreakStartTime = async (shiftPresetsID, presetsID, data) => {
        let temp = JSON.parse(JSON.stringify(shiftPresetsArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === shiftPresetsID) {
                for (let x = 0; x < temp[i].breaks.length; x++){
                    if (temp[i].breaks[x].id === presetsID) {
                        temp[i].breaks[x].startTime = data
                        setShiftPresetsArray(temp)
                    }
                }  
            }
        }
    }
    
    const updateBreakLength = async (shiftPresetsID, presetsID, data) => {   
        let temp = JSON.parse(JSON.stringify(shiftPresetsArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === shiftPresetsID) {
                for (let x = 0; x < temp[i].breaks.length; x++){
                    if (temp[i].breaks[x].id === presetsID) {
                        temp[i].breaks[x].length = data
                        setShiftPresetsArray(temp)
                    }
                }  
            }
        }
    }

    const passBackInfo = (shiftPreset , shiftPresetsID) => {
        let temp = JSON.parse(JSON.stringify(shiftPresetsArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === shiftPresetsID) {
                temp[i].name = shiftPreset.name
                temp[i].breaks = shiftPreset.breaks
                temp[i].startTime = shiftPreset.startTime
                temp[i].endTime = shiftPreset.endTime
                setShiftPresetsArray(temp)
            }
        }
    }
   
    let listComps = shiftPresetsArray.map((shiftPreset, index) => (
        <ShiftPresetListItem 
            shiftPreset={shiftPreset}
            shiftPresetID={shiftPreset.id}
            passBackInfo={passBackInfo}
            handleDelete={handleDelete}
            handleAddBreak={handleAddBreak}
            handleDeleteBreak={handleDeleteBreak}
            updateBreakStartTime={updateBreakStartTime}
            updateBreakLength={updateBreakLength}
            key={shiftPreset.id}
        />    
        ))
    
    return (
        <div>
            {listComps}
            <Button style={{minWidth: '140px', fontSize: '14px', marginTop: '5px'}} onClick={handleAddShiftPreset} variant="contained">Add Shift Preset</Button>
        </div>
    );
}

