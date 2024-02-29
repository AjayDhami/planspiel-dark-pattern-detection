window.addEventListener('message', (event) => {
    if (event.source === window && event.data.action === 'getDataFromStorage') {
      chrome.runtime.sendMessage({action: "getDataFromStorage"},(response)=>{
        let result = response
        window.postMessage({ action: 'sendDataToReactApp', result }, 'http://localhost:3000/expert/website');
      })
    } 
});
window.addEventListener('message',(event)=>{
  if(event.source === window && event.data.action === 'updateDatainStorage'){
    chrome.runtime.sendMessage({action:"updateDatainStorage", data:event.data.updatedData},(response)=>{
      return response
    })
  }
})