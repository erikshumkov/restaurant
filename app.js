import { slideContent, menuContent } from "./dummyText.js";

const imgArr = ["./img/main.jpg", "./img/dinner.jpg", "./img/wine.jpg"];

for (let i = 0; i < imgArr.length; i++) {
  preloadImage(imgArr[i]);
}

function preloadImage(src) {
  const img = new Image();
  img.src = src;
}

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

// GSAP animation on the header
document.querySelector(".animation").style.visibility = "visible";
document.querySelectorAll(".animation")[1].style.visibility = "visible";
gsap.from(".animation", { opacity: 0, duration: .8, delay: .4, y: -70, stagger: 0.6 });

// Animation on the menu component, the image
function imageAnimation(src) {
  const tl = gsap.timeline();
  tl.to(menuImg, {
    opacity: 0, x: -60, duration: .5, onComplete: () => {
      menuImg.src = `./img/${src}.jpg`;
    }
  })
    .to(menuImg, { opacity: 1, x: 0, delay: .2, duration: .7 });
}

// Animation on the menu component, the text
function menuTextAnimation(number) {
  const tl = gsap.timeline();
  tl.to(".the-food", { opacity: 0, y: -15, duration: .3 })
    .to(".the-food", { y: 20 })
    .to(".the-food", { opacity: 1, y: 0, duration: .7 });

  setTimeout(() => generateMenuTxt(number), 500);

  return tl;
}

// Animation on testimonial component
function testimonialAnimation() {
  gsap.to(".citat", { opacity: 0, duration: .2 });
  gsap.to(".citat", { x: -20, duration: 0, delay: .3 });
  gsap.to(".citat", { opacity: 1, x: 0, duration: 1, delay: .5 });
}

// Event Listeners
slideBtn.addEventListener("click", e => {
  const click = e.target;

  if (click.className.includes("circle")) {
    const number = +[...click.className].pop();

    [...slideBtn.children].forEach(b => b.classList.remove("selected"));

    click.classList.add("selected");

    if (number === 1) {
      testimonialAnimation();
      setTimeout(() => setTestimonialTxt(number - 1), 500);
    }
    if (number === 2) {
      testimonialAnimation();
      setTimeout(() => setTestimonialTxt(number), 500);
    }
    if (number === 3) {
      testimonialAnimation();
      setTimeout(() => setTestimonialTxt(number + 1), 500);
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

      if (menuImg.src.includes("dinner")) {
        // Animate text
        menuTextAnimation(0);

        // Animate image
        imageAnimation("main");
      }

      if (menuImg.src.includes("wine")) {
        // Animate text
        menuTextAnimation(0);

        // Animate image
        imageAnimation("main");
      } else {
        setTimeout(() => generateMenuTxt(0), 500);
      }
    }
    if (e.target.innerText === "Dinner") {
      document.querySelector("p.select").className = "";
      document.querySelector(".food p").className = "select";

      if (menuImg.src.includes("main")) {
        // Animate text
        menuTextAnimation(1);

        // Animate image
        imageAnimation("dinner");
      }

      if (menuImg.src.includes("wine")) {
        // Animate text
        menuTextAnimation(1);

        // Animate image
        imageAnimation("dinner");

      } else {
        setTimeout(() => generateMenuTxt(1), 500);
      }
    }
  }
  if (e.target.innerText === "Food") {
    document.querySelector("p.select").className = "";
    e.target.classList.add("select");
    [...menuCategory.children].forEach(head => head.classList.remove("select"));
    menuCategory.children[0].classList.add("select");

    // Animate text
    menuTextAnimation(0);

    // Animate image
    imageAnimation("main");
  }
  if (e.target.innerText === "Drinks and Wine") {
    [...menuCategory.children].forEach(head => head.classList.remove("select"));
    document.querySelector("p.select").className = "";
    e.target.classList.add("select");

    // Animate text
    menuTextAnimation(2);

    // Animate image
    imageAnimation("wine");
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

// if (tl.isActive()) {
//   e.preventDefault();
//   e.stopImmediatePropagation();
//   return false;
// }