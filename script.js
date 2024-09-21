// onClick display toogle in ChatGPT Auto button
let btn = document.querySelector("#dropdown")
btn.addEventListener('click',()=>{
    document.querySelector(".dropdown-page").classList.toggle("nonView");
})