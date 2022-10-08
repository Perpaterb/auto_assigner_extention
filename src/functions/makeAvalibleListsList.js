
export default function MakeAvalibleListsList() {

    let result = []
    let ticketList = JSON.parse(localStorage.getItem("ticketLists"))
    
    //for each list that is active
    for(let list = 0; list < ticketList.length; list++){
        if(ticketList[list].running === "Active"){
            result.push(ticketList[list].url)
        } 
    }
   
    return result
}