const randomItem = (array) => array[Math.floor(Math.random() * array.length)];

let data;

fetch("data.json")
  .then((response) => response.json())
  .then((json) => {
    data = json;
    generateAndDisplayStrategy();
  });

const generateStrategy = () => {
  return `To ${randomItem(data.objectives)}, we will ${randomItem(
    data.actions
  )} ${randomItem(data.when)}.`;
};

const animateText = async (element, text, interval) => {
  const words = text.split(" ");
  let content = "";

  for (const word of words) {
    content += `${word} `;
    element.textContent = content;
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

const generateAndDisplayStrategy = () => {
  const strategy = generateStrategy();
  const displayElement = document.getElementById("display");
  animateText(displayElement, strategy, 100);
};

document
  .getElementById("generate")
  .addEventListener("click", generateAndDisplayStrategy);

document.getElementById("contact").addEventListener("click", function () {
  window.location.href = "mailto:barry.m.prendergast@gmail.com";
});
