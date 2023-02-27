// Define the OpenAI API endpoint and credentials
// const OPENAI_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const OPENAI_ENDPOINT = "https://api.openai.com/v1/completions";
const OPENAI_CREDENTIALS = {
    "headers": {
        "Authorization": "Bearer key",
        "Content-Type": "application/json"
    }
};

let isLoggedIn = false;
const KEY_LS = "GPT-3_TOKEN";


// Define a function to send a message to GPT-3
function sendMessageToGPT3(message) {
    const requestBody = {
        "prompt": message.trim(),
        "model": "text-davinci-003",
        "max_tokens": 1024,
        // "temperature": 0.7,
        // "n": 1,
        // "stop": "\n"
    };
    fetch(OPENAI_ENDPOINT, {
        method: 'POST',
        headers: OPENAI_CREDENTIALS.headers,
        body: JSON.stringify(requestBody)
    }).then(response => response.json())
        .then(data => {
            // When we get a response from GPT-3, display the message in the chatbot window    
            const responseMessage = data?.choices[0]?.text.trim();
            console.log(responseMessage);
            displayChatbotMessage(responseMessage);
        }).catch(error => console.error(error));
}


document.getElementById("exampleFormControlInput1").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const userInput = e.target.value;
        console.log("Enter key pressed: ", userInput);
        displayUserInput(userInput);
        sendMessageToGPT3(userInput);
        e.target.value = "";
    }
})

async function displayUserInput(message) {
    let body = document.getElementsByClassName("card-body")[0];
    let div = document.createElement("div");
    div.classList.add("d-flex", "flex-row", "justify-content-end", "mb-4", "pt-1");

    let innerDiv = document.createElement("div");
    let p = document.createElement("p");
    p.classList.add("small", "p-2", "me-3", "mb-1", "text-white", "rounded-3", "bg-primary");
    p.innerText = message;

    innerDiv.appendChild(p);

    let image = document.createElement("img");
    image.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp"
    image.alt = "avatar 1";
    image.style = "width: 45px; height: 100%;";

    div.appendChild(innerDiv);
    div.appendChild(image);
    body.appendChild(div);
    body.scrollTo(0, body.scrollHeight);
}

// Define a function to display a message in the chatbot window
async function displayChatbotMessage(message) {
    let body = document.getElementsByClassName("card-body")[0];
    let div = document.createElement("div");
    div.classList.add(
        "d-flex", "flex-row", "justify-content-start"
    );

    let image = document.createElement("img");
    image.src = "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp";
    image.alt = "avatar 1";
    image.style = "width: 45px; height: 100%;";

    let innerDiv = document.createElement("div");
    innerDiv.classList.add(
        "small",
        "p-2",
        "ms-3",
        "mb-1",
        "rounded-3"
    );
    innerDiv.style = "background-color: #f5f6f7";
    innerDiv.innerText = message;

    div.appendChild(image);
    div.appendChild(innerDiv);
    body.appendChild(div);
    body.scrollTo(0, body.scrollHeight);
}