window.addEventListener('message', (event) => {
    if (event.source === window && event.data.action === 'getDataFromStorage') {
        console.log("Recived request");
      chrome.runtime.sendMessage({action: "getDataFromStorage"},(response)=>{
        console.log(response);
        let result = response
        window.postMessage({ action: 'sendDataToReactApp', result }, 'http://localhost:3000/expert/website');
      })
    } 
});
window.addEventListener('message',(event)=>{
  if(event.source === window && event.data.action === 'updateDatainStorage'){
    console.log("Update request received", event.data);
    chrome.runtime.sendMessage({action:"updateDatainStorage", data:event.data.updatedData},(response)=>{
      console.log("response after update:" , response);
    })
  }
})