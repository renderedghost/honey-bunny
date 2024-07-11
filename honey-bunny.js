const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

let data;

fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;
    generateAndDisplayAffirmation();
  });

const generateAffirmation = () => {
  return `No, I love <span class="emphasis">you</span> more, my ${randomItem(data.adjectives)} ${randomItem(data.adjectives)} ${randomItem(data.nouns)}!!!`;
};

const animateText = async (element, text, interval) => {
  const words = text.split(" ");
  let content = "";

  for (const word of words) {
    content += `${word} `;
    element.innerHTML = content; // Use innerHTML to allow span to be rendered
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

const generateAndDisplayAffirmation = () => {
  const affirmation = generateAffirmation();
  const displayElement = document.getElementById("display");
  animateText(displayElement, affirmation, 100);
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