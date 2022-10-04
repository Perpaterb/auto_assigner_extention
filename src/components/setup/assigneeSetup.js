import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import AssigneeListItem from './assigneeListItem'


export default function Assignees() {

    if (localStorage.getItem("assignees") === null) {
        console.log("Assignees Var has been set to default")
        localStorage.setItem("assignees", JSON.stringify([]))
    }

    const [assArray, setAssArray] = useState(JSON.parse(localStorage.getItem("assignees")))

    useEffect(() => {
        localStorage.setItem("assignees", JSON.stringify(assArray))
        //console.log("Assignees Have been Updated", assArray)
    }, [assArray])   

    const handleAddAssignee = () => {
        setAssArray(assArray => [...assArray, {id: Math.random().toString().slice(2,11) ,name: "", status: "Working", startTime: "09:00", endTime: "17:00", breaks: []}])
    };

    const handleDelete = async (assigneeID) => {
        setAssArray(assArray.filter((a, i) => a.id !== assigneeID))
    }   

    const handleAddBreak = async (assigneeID) => {
        let temp = JSON.parse(JSON.stringify(assArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === assigneeID) {
                temp[i].breaks.push({id: Math.random().toString().slice(2,11) , startTime: "12:00", length: "60"})
                setAssArray(temp)
            }
        }
        
    }   

    const handleDeleteBreak = async (assigneeID, breakID) => {    
        let temp = JSON.parse(JSON.stringify(assArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === assigneeID) {
                let temp2 = temp[i].breaks.filter((x, y) => x.id !== breakID)
                temp[i].breaks = temp2
                setAssArray(temp)
            }
        }
    }
    
    const updateBreakStartTime = async (assigneeID, breakID, data) => {
        //let newData = timeMaker(data)  
        let temp = JSON.parse(JSON.stringify(assArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === assigneeID) {
                for (let x = 0; x < temp[i].breaks.length; x++){
                    if (temp[i].breaks[x].id === breakID) {
                        temp[i].breaks[x].startTime = data
                        setAssArray(temp)
                    }
                }  
            }
        }
    }
    
    const updateBreakLength = async (assigneeID, breakID, data) => {   
        //let newData = numberCleaner(data)  
        let temp = JSON.parse(JSON.stringify(assArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === assigneeID) {
                for (let x = 0; x < temp[i].breaks.length; x++){
                    if (temp[i].breaks[x].id === breakID) {
                        temp[i].breaks[x].length = data
                        setAssArray(temp)
                    }
                }  
            }
        }
    }

    const passBackInfo = (assignee , assigneeID) => {
        let temp = JSON.parse(JSON.stringify(assArray))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === assigneeID) {
                temp[i].status = assignee.status
                temp[i].name = assignee.name
                temp[i].breaks = assignee.breaks
                temp[i].startTime = assignee.startTime
                temp[i].endTime = assignee.endTime
                setAssArray(temp)
            }
        }
    }
   
    let listComps = assArray.map((assignee, index) => (
        <AssigneeListItem 
            assignee={assignee}
            assigneeID={assignee.id}
            passBackInfo={passBackInfo}
            handleDelete={handleDelete}
            handleAddBreak={handleAddBreak}
            handleDeleteBreak={handleDeleteBreak}
            updateBreakStartTime={updateBreakStartTime}
            updateBreakLength={updateBreakLength}
            key={assignee.id}
        />    
        ))
    
    return (
        <div>
            {listComps}
            <Button style={{minWidth: '140px', fontSize: '11px', marginTop: '5px'}} onClick={handleAddAssignee} variant="contained">Add Assignee</Button>
        </div>
    );
}

