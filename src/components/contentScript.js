import OnPage from  '../onPage';
import React from 'react';
import { createRoot } from 'react-dom/client';

// chrome.runtime.onMessage.addListener(function (message) {
//   console.log("content", message)

// });

console.log("content script running ")

const serviceNowNavPage = document.getElementsByClassName("navpage-layout")[0]; 
serviceNowNavPage.style.zIndex = "-1"

const body = document.querySelector('body')

const divToInsert = document.createElement("div")

divToInsert.id ="aa-extention"
divToInsert.style.position = "fixed"
divToInsert.style.right = "50%"

if (body) {
  body.prepend(divToInsert)
}

const container = document.getElementById('aa-extention');
const root = createRoot(container);

root.render(<OnPage/>)


// chrome.tabs.executeScript({file: "autoScript.js", all_frames: true});

// window.addEventListener(‘load’, function(){
//     const ticketsInNeedOfAnSssignee = document.getElementsByClassName("list_row")
//     const fineAssignedTo = document.getElementsByClassName("list_header_cell")
//     console.log("ticketsInNeedOfAnSssignee ", ticketsInNeedOfAnSssignee)
//     console.log("fineAssignedTo ", fineAssignedTo)
// }

//glide_label="Assigned to"

