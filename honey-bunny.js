const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

let data;

fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;
    generateAndDisplayAffirmation();
  });

const generateAffirmation = () => {
  return `No, I love you more, you ${randomItem(data.adjectives)} ${randomItem(data.nouns)}${randomItem(data.punctuation)}`;
};

const animateText = async (element, text, interval) => {
  let content = "";
  let tempDiv = document.createElement('div');  // Temporary container for processing HTML

  tempDiv.innerHTML = text;  // Parse the input text as HTML
  let allNodes = Array.from(tempDiv.childNodes);  // Get all child nodes, text and elements

  for (const node of allNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      // If it's text, animate it character by character
      for (const char of node.nodeValue) {
        content += char;
        element.innerHTML = content;
        await new Promise(resolve => setTimeout(resolve, interval));
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // If it's an element (like a span), handle it separately
      let span = document.createElement(node.tagName);
      span.innerHTML = node.innerHTML;  // Set inner HTML to preserve inner elements or styling
      span.className = node.className;  // Carry over the class
      element.appendChild(span);
      content += span.outerHTML;  // Update the 'content' to include the HTML
      await new Promise(resolve => setTimeout(resolve, interval));
    }
  }
};

const generateAndDisplayAffirmation = () => {
  const affirmation = generateAffirmation();
  const displayElement = document.getElementById("affirmation");
  displayElement.innerHTML = '';  // Clear previous content
  animateText(displayElement, affirmation, 50); // Adjust interval for smoother animation
};

// Obfuscate email address
const decodeEmail = (encoded) => {
  let email = "";
  for (let i = 0; i < encoded.length; i += 2) {
    email += String.fromCharCode(parseInt(encoded.substr(i, 2), 16));
  }
  return email;
};

document.getElementById("generate").addEventListener("click", generateAndDisplayAffirmation);

document.getElementById("contact").addEventListener("click", function () {
  const encodedEmail = "62617272792e6d2e7072656e6465726761737440676d61696c2e636f6d"; // Hex-encoded email
  const email = decodeEmail(encodedEmail);
  window.location.href = `mailto:${email}`;
});