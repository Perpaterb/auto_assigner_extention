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
  console.log("getDom");
  chrome.runtime.sendMessage("test", () => chrome.runtime.lastError)
}
