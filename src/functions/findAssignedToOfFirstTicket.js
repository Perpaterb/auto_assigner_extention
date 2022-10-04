
export default function findAssignedToOfFirstTicket(doc) {
    let iframe = doc.getElementById("gsft_main").contentWindow.document
    let cellHeaders = iframe.getElementById("hdr_task")

    let assigneeIsInColunm = 0

    for (const child of cellHeaders.children) {
        if (child.getAttribute("name") === "assigned_to"){
            break
        }else{
            assigneeIsInColunm += 1
        }
    }

    let ticketRowInList = iframe.getElementsByClassName("list_row")

    
    return ticketRowInList[0].children[assigneeIsInColunm]
}