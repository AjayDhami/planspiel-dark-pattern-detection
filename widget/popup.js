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

