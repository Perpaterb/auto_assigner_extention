
export default function MakeAvalibleAssigneeList() {

    let result = []
    let assignees = JSON.parse(localStorage.getItem("assignees"))
    let options = JSON.parse(localStorage.getItem("options"))
    let today = new Date();
    let systemTime = parseInt(today.toLocaleTimeString().replace(":", "").slice(0, -1))
    
    //for each assignee are they working
    for(let ass = 0; ass < assignees.length; ass++){
        if(assignees[ass].status === "Working"){
            //for each working assignee..  is the system time within there shift time (- options.stopBeforeShiftEnd)
            let shiftEndTime = ((parseInt(assignees[ass].endTime.split(":")[0]) * 60) + parseInt(assignees[ass].endTime.split(":")[1])) - parseInt(options.stopBeforeShiftEnd) 
            let shiftEndMin = shiftEndTime % 60;
            let shiftEndHr = (shiftEndTime-shiftEndMin)/60;
            shiftEndTime = parseInt(((shiftEndHr < 10 ? "0" : "") + shiftEndHr.toString() + ":" + (shiftEndMin < 10 ? "0" : "") + shiftEndMin.toString()).replace(":", ""));

            if(systemTime > parseInt(assignees[ass].startTime.replace(":", "")) && systemTime < shiftEndTime){
                let assigneesBreaks = assignees[ass].breaks
                let onbreak = 0

                //for each break is the system time inside it
                for(let bre = 0; bre < assigneesBreaks.length; bre++){
                    
                    let breakEndTime = ((parseInt(assigneesBreaks[bre].startTime.split(":")[0]) * 60) + parseInt(assigneesBreaks[bre].startTime.split(":")[1])) + parseInt(assigneesBreaks[bre].length) 
                    let breakMin = breakEndTime % 60;
                    let breakHr = (breakEndTime-breakMin)/60;
                    breakEndTime = parseInt(((breakHr < 10 ? "0" : "") + breakHr.toString() + ":" + (breakMin < 10 ? "0" : "") + breakMin.toString()).replace(":", ""));

                    if(systemTime > parseInt(assigneesBreaks[bre].startTime.replace(":", "")) && systemTime + 1 < breakEndTime){
                        onbreak = 1
                        break
                    }
                }
                if (onbreak === 0 ){
                    result.push(assignees[ass].name)
                }
            }
        } 
    }
   
    return result
}