export async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }


export async function setURL(newUrl) {
    let queryOptions = { active: true, lastFocusedWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    chrome.tabs.update(tab.id, { url: newUrl });
  }

  //document.querySelectorAll('.list_row'),

export async function getDom() {
  let queryOptions = { active: true, currentWindow: true };
  let tabs = await chrome.tabs.query(queryOptions);
  console.log("tabs[0].id :",tabs[0].id);

  chrome.tabs.sendMessage(tabs[0].id, {type:"NEW"}, function(response) {
      console.log("getDom get back: ", response);
  });
}
