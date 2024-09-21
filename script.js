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
  // Remove the user prompt from the input value
//   userInput.value = "";
}

function aiDivCreation(aiData) {
    let para = document.createElement("p");
    para.textContent = aiData;
    let aiDiv = document.createElement("div");
    aiDiv.appendChild(para);
    aiDiv.className = "aiResponse";
    communicateDiv.appendChild(aiDiv);
}

async function callOpenAI(userData) {
    const url = "https://chatgpt-42.p.rapidapi.com/conversationgpt4-2";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "893647de7bmshb3f949e60b78d51p16e89cjsn91682b8dedb6",
        "x-rapidapi-host": "chatgpt-42.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      // Corrected body: now it's being stringified
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: userData,
          },
        ],
        system_prompt: "",
        temperature: 0.9,
        top_k: 5,
        top_p: 0.9,
        max_tokens: 256,
        web_access: false,
      }),
    };
  
    try
    {
      const response = await fetch(url, options);
      const final = await response.json();
    //   console.log(final.result);
    aiDivCreation(final.result);
    } 
    catch (error) 
    {
      console.error(error);
    }
    
}

sendBtn.addEventListener("click", () => {
  // This is fire when the user write some prompt in the input bar and then hit the send button
  userDivCreation(userInput.value);
  // Now and API will fetch when whenever the api will return the data corresponds to the userData that data will be display in the ai div

  callOpenAI(userInput.value);
});
