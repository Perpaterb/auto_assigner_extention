import OnPage from  '../onPage';
import React from 'react';
import { createRoot } from 'react-dom/client';

(function () {
  addScript('script.js', true);

})();

function addScript(filePath, processSettings) {
  var s = document.createElement('script');
  //s.setAttribute("id", "emblaexpress");
  //s.textContent = chrome.runtime.id;
  //s.src = chrome.runtime.getURL(filePath);
  //(document.head || document.documentElement).appendChild(s);
  s.innerHTML = filePath;
  (document.head || document.documentElement).prepend(s);
}

const serviceNowNavPage = document.getElementsByClassName("navpage-layout")[0]; 

if (serviceNowNavPage !== undefined) {
  //console.log("content script running on service connect page")
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

