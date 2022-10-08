
export default function FindCellEditOk(doc) {
    let iframe = doc.getElementById("gsft_main").contentWindow.document
    let cellEditOk = iframe.getElementById("cell_edit_ok")

    return cellEditOk
}