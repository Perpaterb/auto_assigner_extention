
export default function MakeAssigneesOnLeaveSNowIDList() {

    let result = []
    let assignees = JSON.parse(localStorage.getItem("assignees"))
    
    //for each assignee are they on leave get serviceNowId
    for(let ass = 0; ass < assignees.length; ass++){
        if(assignees[ass].status === "On Leave"){
            if (assignees[ass].serviceNowId.length > 20){
                result.push(assignees[ass].serviceNowId)
            }
        } 
    }
   
    return result
}