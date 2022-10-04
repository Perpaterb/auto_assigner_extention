import OnPage from  '../onPage';
import React from 'react';
import { createRoot } from 'react-dom/client';


// chrome.runtime.onMessage.addListener(function (message) {
//   console.log("content", message)

// });


const serviceNowNavPage = document.getElementsByClassName("navpage-layout")[0]; 

if (serviceNowNavPage !== undefined) {
  console.log("content script running on service connect page")
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

}
