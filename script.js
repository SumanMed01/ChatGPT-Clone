// API KEY from OPEN API
const apiKey =
    "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";

// onClick display toogle in ChatGPT Auto button
let btn = document.querySelector("#dropdown");
btn.addEventListener("click", () => {
    document.querySelector(".dropdown-page").classList.toggle("nonView");
});

// taking input from the user

let userInput = document.querySelector(".userInput");
let sendBtn = document.querySelector(".sendBtn");
let communicateDiv = document.querySelector(".communication-part");
let historySection = document.querySelector(".section-middle");

// It will fetch the user input and then create a div that will store user prompt
function userDivCreation(userData) {
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

}

function aiDivCreation(aiData) {
    let para = document.createElement("p");
    para.textContent = aiData;
    let aiDiv = document.createElement("div");
    aiDiv.appendChild(para);
    aiDiv.className = "aiResponse";
    communicateDiv.appendChild(aiDiv);
    // Make the input tag enable after the response was print in the screen so that the user can sent another response
    userInput.disabled = false;
}

function historyCreationDiv(userPrompt)
{
    // Create all the div
    let symbol = document.createElement("i");
    let listing = document.createElement("div");
    let para = document.createElement("p");
    // Set the class name to all the div
    symbol.className = "ri-draggable";
    listing.className = "circle-dot";
    para.textContent = userPrompt;
    // Create the parent div
    let historyParent = document.createElement("div");
    // Set the class name
    historyParent.className = "history";
    // Now add the above class as the child class but make sure the order should be maintain
    historyParent.appendChild(listing);
    historyParent.appendChild(para);
    historyParent.appendChild(symbol);
    historySection.appendChild(historyParent);
}

// Create an array for history
let historyArray = [];

async function callOpenAI(userData) {
    const url = 'https://chatgpt-42.p.rapidapi.com/conversationgpt4-2';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'a44450570bmshad97c1761fa3010p1dc93ajsndf881418a66a',
            'x-rapidapi-host': 'chatgpt-42.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: userData
                }
            ],
            system_prompt: '',
            temperature: 0.9,
            top_k: 5,
            top_p: 0.9,
            max_tokens: 256,
            web_access: false
        })
    };
    // Remove the user prompt from the input value
    userInput.value = "";
    try 
    {
        const response = await fetch(url, options);
        const final = await response.json();
        //   console.log(final.result);
        aiDivCreation(final.result);

        // Store the user prompt in the history section

        let historyData = {
            requestData: userData,
            responseData: final,
        }

        historyArray.push(historyData);
        console.log(historyArray);

        // Show the prompt of the user in the history by fetching the user prompt from the historyArray.
        // historySection
        let historyLength = historyArray.length;
        let currHistory = historyArray[historyLength-1];
        // Call the history div creation function
        historyCreationDiv(currHistory.requestData);
    }
    catch (error) {
        console.error(error);
    }
}

sendBtn.addEventListener("click", () => {
    // Make it disabled so that user cant send req simultaneoulsy    
    userInput.disabled = true;
    // This is fire when the user write some prompt in the input bar and then hit the send button
    userDivCreation(userInput.value);


    // Now and API will fetch when whenever the api will return the data corresponds to the userData that data will be display in the ai div
    callOpenAI(userInput.value);


});

let cards = document.querySelectorAll(".card p");

cards.forEach(function (card, index) {
    card.addEventListener('click', () => {
        userInput.value = card.textContent
        document.querySelector("#basic-view").style.display = "none";
    });
});

// This will remove the loading view when the send btn was clicked
window.onload = function () {
    userInput.addEventListener('click', () => {
        document.querySelector("#basic-view").style.display = "none";
    });
};