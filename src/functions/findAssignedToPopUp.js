
export default function FindAssignedToPopUp(doc) {
    let iframe = doc.getElementById("gsft_main").contentWindow.document
    let assignedToPopUp = iframe.getElementById("sys_display.LIST_EDIT_task.assigned_to")


    
    return assignedToPopUp
}