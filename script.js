// onClick display toogle in ChatGPT Auto button
let btn = document.querySelector("#dropdown")
btn.addEventListener('click',()=>{
    document.querySelector(".dropdown-page").classList.toggle("nonView");
})


// taking input from the user 

let userInput = document.querySelector(".userInput");
let sendBtn = document.querySelector(".sendBtn");
let communicateDiv = document.querySelector(".communication-part");
function userDivCreation(userData)
{
    // Creating the paragraph element
    let para = document.createElement("p");
    // Insert the userInput
    para.textContent = userData;
    // Creating the div element
    let userDiv = document.createElement("div");
    // Append the para as child elem of userDiv
    userDiv.appendChild(para);
    // Attaching the class name to the div
    userDiv.className = "usersRequest";
    // Attaching the userDiv as the child div of communicateDiv 
    communicateDiv.appendChild(userDiv);
    // Remove the user prompt from the input value 
    userInput.value = "";
}


sendBtn.addEventListener("click",()=>{
    // This is fire when the user write some prompt in the input bar and then hit the send button
    userDivCreation(userInput.value);
    // Now and API will fetch when whenever the api will return the data corresponds to the userData that data will be display in the ai div
})