import React, { useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TicketListsItem from './ticketListsItem'


export default function TicketLists() {

    const [ticketLists, setTicketLists] = useState(JSON.parse(localStorage.getItem("ticketLists")))

    useEffect(() => {
        localStorage.setItem("ticketLists", JSON.stringify(ticketLists))
        //console.log("ticketLists Have been Updated", ticketLists)
    }, [ticketLists])   

    const handleAddList = () => {
        setTicketLists(ticketLists => [...ticketLists, {id: Math.random().toString().slice(2,11) ,name: "", running: "Active", url: ""}])
    };

    const handleDelete = async (ticketListsID) => {
        setTicketLists(ticketLists.filter((a, i) => a.id !== ticketListsID))
    }   

    const passBackInfo = (List , ticketListsID) => {
        let temp = JSON.parse(JSON.stringify(ticketLists))
        for (let i = 0; i < temp.length; i++){
            if (temp[i].id === ticketListsID) {
                temp[i].running = List.running
                temp[i].name = List.name
                temp[i].url = List.url
                setTicketLists(temp)
            }
        }
    }
   
    let listComps = ticketLists.map((ticketLists, index) => (
        <TicketListsItem 
            ticketLists={ticketLists}
            running={ticketLists.running}
            listName={ticketLists.name}
            listUrl={ticketLists.url}
            ticketListsID={ticketLists.id}
            handleDelete={handleDelete}
            passBackInfo={passBackInfo}
            key={ticketLists.id}
        />    
        ))
    
    return (
        <div>
            {listComps}
            <Button style={{minWidth: '140px', fontSize: '14px', marginTop: '5px'}} onClick={handleAddList} variant="contained">Add List</Button>
        </div>
    );
}

