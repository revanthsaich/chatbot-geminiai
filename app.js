import { GoogleGenerativeAI } from "@google/generative-ai";
import md from "markdown-it";

//initalize the model
const genAI = new GoogleGenerativeAI(`${import.meta.env.VITE_API_KEY}`);




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
