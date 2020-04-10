import { slideContent, menuContent } from "./dummyText.js";

const person1 = document.querySelector(".person1");
const person2 = document.querySelector(".person2");
const slideBtn = document.querySelector(".slide-btn");
const theMenu = document.querySelector(".menu-grid");
const menuImg = theMenu.querySelector("img");
const menuCategory = document.querySelector(".category");
const food = document.querySelector(".the-food");
let slide = 0;


function setTestimonialTxt(number = 0) {
  const name1 = person1.querySelector(".name");
  const name2 = person2.querySelector(".name");
  const content1 = person1.querySelector(".quote");
  const content2 = person2.querySelector(".quote");
  name1.innerText = `${slideContent[number].name}`;
  content1.innerText = `"${slideContent[number].content}"`;
  name2.innerText = `${slideContent[number + 1].name}`;
  content2.innerText = `"${slideContent[number + 1].content}"`;
}

function generateMenuTxt(num) {
  food.innerHTML =
    menuContent[num].map(meal => `
    <div class="item">
      <p>${meal.name}</p>
      <p>${meal.desc}</p>
    </div>
  `).join("");
}
generateMenuTxt(0);

setTestimonialTxt(slide);

// Event Listeners
slideBtn.addEventListener("click", e => {
  const click = e.target;

  if (click.className.includes("circle")) {
    const number = +[...click.className].pop();

    [...slideBtn.children].forEach(b => b.classList.remove("selected"));

    click.classList.add("selected");

    if (number === 1) {
      setTestimonialTxt(number - 1);
    }
    if (number === 2) {
      setTestimonialTxt(number);
    }
    if (number === 3) {
      setTestimonialTxt(number + 1);
    }
  }
});

theMenu.addEventListener("click", e => {
  if (e.target.tagName === "H4") {

    [...menuCategory.children].forEach(head => head.classList.remove("select"));

    e.target.className = "select";

    if (e.target.innerText === "Lunch") {
      document.querySelector("p.select").className = "";
      document.querySelector(".food p").className = "select";

      if (menuImg.getAttribute("src").includes("wine")) {
        menuImg.classList.add("fade");
        setTimeout(() => {
          menuImg.setAttribute("src", "./img/main.jpg");
          generateMenuTxt(0);
          menuImg.classList.add("fade2");
        }, 500)
        setTimeout(() => menuImg.className = "", 800);
      } else {
        menuImg.setAttribute("src", "./img/main.jpg");
        generateMenuTxt(0);
      }
    }
    if (e.target.innerText === "Dinner") {
      document.querySelector("p.select").className = "";
      document.querySelector(".food p").className = "select";

      if (menuImg.getAttribute("src").includes("wine")) {
        menuImg.classList.add("fade");
        setTimeout(() => {
          menuImg.setAttribute("src", "./img/main.jpg");
          generateMenuTxt(1);
          menuImg.classList.add("fade2");
        }, 500)
        setTimeout(() => menuImg.className = "", 800);
      } else {
        menuImg.setAttribute("src", "./img/main.jpg");
        generateMenuTxt(1);
      }
    }
  }
  if (e.target.innerText === "Food") {
    document.querySelector("p.select").className = "";
    e.target.classList.add("select");
    [...menuCategory.children].forEach(head => head.classList.remove("select"));
    menuCategory.children[0].classList.add("select");
    menuImg.classList.add("fade");
    setTimeout(() => {
      menuImg.setAttribute("src", "./img/main.jpg");
      generateMenuTxt(0);
      menuImg.classList.add("fade2");
    }, 500)
    setTimeout(() => menuImg.className = "", 800);
  }
  if (e.target.innerText === "Drinks and Wine") {
    [...menuCategory.children].forEach(head => head.classList.remove("select"));
    document.querySelector("p.select").className = "";
    e.target.classList.add("select");
    menuImg.classList.add("fade");
    setTimeout(() => {
      menuImg.setAttribute("src", "./img/wine.jpg");
      generateMenuTxt(2);
      menuImg.classList.add("fade2");
    }, 500)
    setTimeout(() => menuImg.className = "", 800);
  }
});





// Automatic slider, testimonial section
// setInterval(() => {
//   setTestimonialTxt(slide);
//   if (slide === 0) {
//     slideBtn.children[2].classList.remove("selected");
//     slideBtn.children[0].classList.add("selected");
//   }
//   if (slide === 2) {
//     slideBtn.children[0].classList.remove("selected");
//     slideBtn.children[1].classList.add("selected");
//   }
//   if (slide === 4) {
//     slideBtn.children[1].classList.remove("selected");
//     slideBtn.children[2].classList.add("selected");
//   }
//   slide += 2;
//   if (slide === 6) {
//     slide = 0;
//   }
// }, 4000);