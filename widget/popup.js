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
