window.addEventListener("DOMContentLoaded", (event) =>{
    const el = document.getElementById("submitpat");
    if(el){
        el.addEventListener('click', processInput, false);
    }
})

window.addEventListener("DOMContentLoaded", (event)=>{
    const imgel = document.getElementById("capture");
    if(imgel){
        imgel.addEventListener("click", captureImage, false)
    }
})

window.addEventListener("DOMContentLoaded", (event) => {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("patternRemove")) {
            const patternTime = event.target.dataset.patternTime;
            removePattern(patternTime);
        }
    });
});

window.addEventListener("DOMContentLoaded", (event) => {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("removeImage")) {
            const patternTime = event.target.dataset.patternTime;
            removeImage(patternTime);
        }
    });
});

const getData = async () => {
    const key = 'patternType'
    let patterns = await new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } 
            const patterns = result.patternType ?? [];
            resolve(patterns)
        });
    });
    const updatedPatterns = patterns || [];
    console.log(patterns);
    const patternList = document.getElementById("patternobj-list");
    if(Array.isArray(imageData)){
        updatedPatterns.forEach(element => {
            const listItem = document.createElement("div");
            listItem.className = "patternItemsDiv";
            // listItem.textContent = `Type: ${element.patternType}, description: ${element.patternDesc}`
            listItem.innerHTML = `
                <div style="display:flex; align-items:center; color:azure;">
                    <h3>${element.patternType}</h3>
                    <i class="material-icons patternRemove" data-pattern-time="${element.patternTime}" style="cursor:pointer;">delete</i>
                </div>
                <p style="color:azure;">${element.patternDesc}</p>
            `;
            element.patternimages.forEach(image=>{
                const imgItem = document.createElement("div");
                imgItem.innerHTML = `
                    <div style="margin: 2px;">
                        <img src="data:image/png;base64,${image.file_base64}" width="200" />
                    </div>
                `
                listItem.appendChild(imgItem);
            })
            patternList.appendChild(listItem)
        });
    }
}

async function processInput() {
    let typeInput = document.getElementById("patterntype").value;
    let currentUrl = await new Promise((resolve,reject) =>{
        chrome.tabs.query({currentWindow: true, active: true}, tabs => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            }
            let urlInput = tabs[0].url;
            resolve(urlInput)
        });
    })
    console.log("Current url is: ", currentUrl);
    let descInput = document.getElementById("patterndesc").value;
    let tempImages = await new Promise((resolve, reject) => {
        chrome.storage.local.get("snapshots", (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } 
            const patterns = result.snapshots ?? [];
            resolve(patterns)
        });
    });
    let timeCreated = Date.now();
    if(typeInput===""){
        alert("Please enter a valid pattern type");
        document.getElementById("patterntype").value = "";
        document.getElementById("patterndesc").value = "";
    }
    else{
    const key = 'patternType'
    let patternObj = {
        patternType : typeInput,
        patternUrl : currentUrl,
        patternDesc : descInput,
        patternimages : tempImages,
        patternTime : timeCreated
    }
    let patterns = await new Promise((resolve, reject) => {
        chrome.storage.local.get(key, (result) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } 
            const patterns = result.patternType ?? [];
            resolve(patterns);
        });
    });
    const updatePatterns = [...patterns, patternObj];

    await new Promise((resolve, reject) => {
        chrome.storage.local.set({ [key]: updatePatterns }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } 
            resolve(updatePatterns)
        });
    });
    // window.localStorage["patternType"] = "updatePatterns";
    chrome.storage.local.set({ "snapshots": [] }, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } 
    });
    document.getElementById("patterntype").value = "";
    document.getElementById("patterndesc").value = "";
    document.getElementById("patternobj-list").innerHTML = "";
    document.getElementById("screenshotContainer").innerHTML = "";
    getData();
}
}


