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