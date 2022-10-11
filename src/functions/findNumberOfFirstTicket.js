
export default function FindNumberOfFirstTicket(doc) {
    let iframe = doc.getElementById("gsft_main").contentWindow.document
    let cellHeaders = iframe.getElementById("hdr_task")
    let numberInColunm = 0

    for (const child of cellHeaders.children) {
        if (child.getAttribute("name") === "number"){
            break
        }else{
            numberInColunm += 1
        }
    }

    let ticketRowInList = iframe.getElementsByClassName("list_row")

    return ticketRowInList[0].children[numberInColunm].children[0]
}