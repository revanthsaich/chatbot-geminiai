import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";

//initalize the model
const darkBgImage = 'url("/bg_dark.jpg")'
document.body.style.setProperty('--bg-image', darkBgImage);

const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);

           const themeImage = document.getElementById('theme');
           function toggleTheme() {
               document.body.classList.toggle('dark-theme');
               if(document.body.classList.contains("dark-theme"))
               {
                   theme.src="dark_mode.png"
                   document.body.style.background=""
               }
               else
               {
                   theme.src="light_mode.png"
               }
           
              const currentBgImage = getComputedStyle(document.body).getPropertyValue('--bg-image');
           
             // Define the new background image URLs for light and dark themes
             const lightBgImage = 'url("/bg_light.jpg")';
             const darkBgImage = 'url("/bg_dark.jpg")';
           
             // Update the background image based on the current theme
             if (currentBgImage === lightBgImage) {
               document.body.style.setProperty('--bg-image', darkBgImage);
             } else {
               document.body.style.setProperty('--bg-image', lightBgImage);
                        }
           }
           document.body.style.transition = "background-image 0.2s linear,  background-color 0.2s linear";


           themeImage.addEventListener('click', toggleTheme);



async function getResponse(prompt) {
  

  const model = genAI.getGenerativeModel({model: "gemini-pro"});
  const answer = await model.generateContent(prompt);
  const response = await answer.response;
  const text = response.text();
  const text1 =text.trim();
  console.log(text1);
  let messageSender = 'AI';
  const md_text = md().render(text1);
  const message = {
    sender: messageSender,
    text: md_text,
  
  }


  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}


const chatMessages = document.querySelector('.chat-messages')
const chatInputForm = document.querySelector('.chat-input-form')
const chatInput = document.querySelector('.chat-input')
const clearChatBtn = document.querySelector('.clear-chat-button')



const createChatMessageElement = (message) => `
  <div class="message ${message.sender === 'User' ? 'gray-bg' : 'blue-bg'}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
  </div>
`
//chatInput.focus();

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message)
  })
}


const sendMessage = (e) => {
  let messageSender = 'User'
  const message = {
    sender: messageSender,
    text: chatInput.value,
  
  }
  e.preventDefault()
  var uinput=chatInput.value.trim();
  
  getResponse(uinput);


  /* Add message to DOM */
  chatMessages.innerHTML += createChatMessageElement(message)

  /* Clear input field */
  chatInputForm.reset()

  /*  Scroll to bottom of chat messages */
  chatMessages.scrollTop = chatMessages.scrollHeight
}

chatInputForm.addEventListener('submit', sendMessage)

clearChatBtn.addEventListener('click', () => {
  chatMessages.innerHTML = ''
})
