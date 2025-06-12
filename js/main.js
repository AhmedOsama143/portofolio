// LocalStorage with colors
let mainColor = localStorage.getItem("color_option");
let mainBackground = localStorage.getItem("img_background");
let landing_page = document.querySelector(".landing-page");

let check = true;
let backgroundInterval;

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color === mainColor) {
      ele.classList.add("active");
    }
  });
}
// LocalStorage with colors

if (mainBackground != null) {
  landing_page.style.backgroundImage = mainBackground;
  document.querySelector(".no").classList.add("active");
  document.querySelector(".yes").classList.remove("active");
} else {
  changeBackground();
}

// Setting box toggle
let settings = document.querySelector(".settings-box");
let optionBox = document.querySelectorAll(".option-box");
let optionBoxH4 = document.querySelectorAll(".option-box h4");
let colorsListBox = document.querySelector(".colors-list");
let randomBackgroundBox = document.querySelector(".random-background");
let imagesBox = document.querySelector(".imgs-box");
let bulletsOptionBox = document.querySelector(".bullets-option");
let resetOptions = document.querySelector(".reset-options");
let gearIcon = document.querySelector(".fa-gear");

gearIcon.addEventListener("click", () => {
  settings.classList.toggle("open");
  gearIcon.classList.toggle("fa-spin");
});

function stopPropaganda(ele) {
  ele.onclick = function (e) {
    e.stopPropagation();
  };
}

function stopPropaganda2(ele) {
  ele.forEach((el) => {
    el.onclick = function (e) {
      e.stopPropagation();
    };
  });
}

stopPropaganda(colorsListBox);
stopPropaganda(randomBackgroundBox);
stopPropaganda(imagesBox);
stopPropaganda(bulletsOptionBox);
stopPropaganda(resetOptions);
stopPropaganda(gearIcon);
stopPropaganda2(optionBox);
stopPropaganda2(optionBoxH4);

document.addEventListener("click", (e) => {
  if (e.target == settings) {
    return true;
  } else {
    settings.classList.remove("open");
    gearIcon.classList.remove("fa-spin");
  }
});
// Setting box toggle

// Switch Colors
const colorsLis = document.querySelectorAll(".colors-list li");
colorsLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
// Switch Colors
// Switch Random background
const randomBg = document.querySelectorAll(".random-background span");
randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      check = true;
      mainBackground = null;
      changeBackground();
    } else {
      check = false;
      clearInterval(backgroundInterval);
    }
  });
});

// Switch Random background

// Landing page change background imgs
let i = 0;
let imges = [
  "img10.jpg",
  "img12.jpg",
  "img3.jpg",
  "img15.jpg",
  "img14.jpg",
  "img16.jpg",
];

// Select background Image
const bgImag = document.querySelectorAll(".imgs-box img");
bgImag.forEach((img) => {
  img.addEventListener("click", (e) => {
    check = false;
    clearInterval(backgroundInterval);
    landing_page.style.backgroundImage = `url("./images/${e.target.dataset.img}")`;
    localStorage.setItem(
      "img_background",
      `url("./images/${e.target.dataset.img}")`
    );
    document.querySelector(".no").classList.add("active");
    document.querySelector(".yes").classList.remove("active");
  });
});
// Select background Image

function changeBackground() {
  if (check) {
    backgroundInterval = setInterval(() => {
      landing_page.style.backgroundImage = `url("./images/${imges[i]}")`;
      i++;
      if (i == imges.length) {
        i = 0;
      }
    }, 5000);
  }
}

// Landing page change background imgs

// Show Bullets
let bulletSpans = document.querySelectorAll(".bullets-option span");
let navBullets = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  bulletSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-option .show").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-option .hide").classList.add("active");
  }
}

bulletSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.bullet === "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(e);
  });
});
// Show Bullets

// skill-progress
let skillsSection = document.querySelector(".skills");
let skillProgress = document.querySelectorAll(".skill-progress span");

skillsSection.addEventListener("mouseover", (e) => {
  skillProgress.forEach((skill) => {
    skill.style.width = skill.dataset.width;
  });
});

// gallary section
let myGallary = document.querySelectorAll(".gallary img");

myGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");

    let projectLink = document.createElement("a");
    projectLink.href = img.dataset.link;
    let myImg = document.createElement("img");
    myImg.src = img.src;

    projectLink.appendChild(myImg);
    popupBox.appendChild(projectLink);

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let txtHeading = document.createTextNode(img.alt);
      imgHeading.appendChild(txtHeading);
      projectLink.appendChild(imgHeading);
      popupBox.appendChild(projectLink);
    }

    let btnClose = document.createElement("span");
    let txtBtn = document.createTextNode("X");
    btnClose.classList.add("close-btn");
    btnClose.appendChild(txtBtn);
    popupBox.appendChild(btnClose);

    document.body.appendChild(popupBox);
    document.querySelector(".close-btn").addEventListener("click", () => {
      overlay.classList.add("hide");
      popupBox.classList.add("hide");
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className == "close-btn") {
    e.target.parentElement.remove();
    document.querySelector(".overlay").remove();
  }
});

// Start Bullet
const bullets = document.querySelectorAll(".nav-bullets .bullet");

bullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// End Bullet

// Handle active state
function handleActive(event) {
  event.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  event.target.classList.add("active");
}

// Reset Options
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("img_background");
  localStorage.removeItem("bullets_option");

  window.location.reload();
};
// Reset Options

// up to top
let up = document.querySelector(".up");

window.onscroll = function () {
  if (this.scrollY >= 700) {
    up.classList.add("show");
  } else {
    up.classList.remove("show");
  }
};

up.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/// Dark Mode

document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.querySelector(".mode");
  const body = document.querySelector("body");

  const isDarkModeEnabled = localStorage.getItem("darkMode") === "enabled";

  setDarkMode(isDarkModeEnabled);

  modeToggle.addEventListener("click", () => {
    const newMode = !body.classList.contains("dark-mode");
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode ? "enabled" : "disabled");
  });

  function setDarkMode(enabled) {
    let modeImg = document.querySelector(".mode-img");
    body.classList.toggle("dark-mode", enabled);
    if (enabled) {
      modeImg.src = "images/moon1.png";
      document.querySelector(".timeline").style.backgroundColor = "#000";
      document.querySelector(".skills").style.backgroundColor = "#000";

      setBackgroundColor("#000");
      setBackgroundDarkMode(document.querySelectorAll(".settings-box"), "#000"); // 1
      setBackgroundDarkMode(
        document.querySelectorAll(".settings-box .option-box"),
        "#333"
      );
      setBackgroundDarkMode(
        document.querySelectorAll(".testimonials .ts-content .ts-box"),
        "#000"
      );
      setTextColor(".settings-box .option-box h4", "#fff");
      setTextColor(".about-me .info-box p", "#fff");
      setTextColor(".features .feat-box h4", "#fff");
      setTextColor(".features .feat-box p", "#fff");
      setTextColor(".testimonials .ts-content .ts-box p", "#fff");
      setTextColor(".testimonials .ts-content .ts-box .person-info h4", "#fff");
    } else {
      modeImg.src = "images/sun2.png";
      document.querySelector(".timeline").style.backgroundColor = "#fff";
      document.querySelector(".skills").style.backgroundColor = "#fff";
      setBackgroundColor("#fff");
      setBackgroundDarkMode(document.querySelectorAll(".settings-box"), "#fff");
      setBackgroundDarkMode(
        document.querySelectorAll(".settings-box .option-box"),
        "#eee"
      );
      setBackgroundDarkMode(
        document.querySelectorAll(".testimonials .ts-content .ts-box"),
        "#fff"
      );
      setTextColor(".settings-box .option-box h4", "#000");
      setTextColor(".about-me .info-box p", "#000");
      setTextColor(".features .feat-box h4", "#000");
      setTextColor(".features .feat-box p", "#000");
      setTextColor(".testimonials .ts-content .ts-box p", "#000");
      setTextColor(".testimonials .ts-content .ts-box .person-info h4", "#000");
    }
  }

  function setBackgroundColor(color) {
    body.style.backgroundColor = color;
  }

  function setBackgroundDarkMode(elements, color) {
    elements.forEach((element) => {
      element.style.backgroundColor = color;
    });
  }

  function setTextColor(selector, color) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      element.style.color = color;
    });
  }
});

// Type Writter

document.addEventListener("DOMContentLoaded", function () {
  let textElement = document.getElementById("logo");
  let textToType = `Ahmed Osama Kholief`;
  let speed = 100;
  let loopDelay = 1000;

  function typeWriterEffect() {
    let i = 0;
    function type() {
      if (i < textToType.length) {
        textElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(function () {
          textElement.innerHTML = "";
          i = 0;
          typeWriterEffect();
        }, loopDelay);
      }
    }
    type();
  }

  // Start the typewriter effect when the page loads
  typeWriterEffect();
});

document.addEventListener("DOMContentLoaded", function () {
  let textElement = document.querySelector(".introduction-text p");
  let textToType = `I can be responsible for leading the development and implementation of
          complex web, also I can build reusable code and libraries for future
          use .`;
  let speed = 50;
  let loopDelay = 1000;

  function typeWriterEffect() {
    let i = 0;
    function type() {
      if (i < textToType.length) {
        textElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        setTimeout(function () {
          textElement.innerHTML = "";
          i = 0;
          typeWriterEffect();
        }, loopDelay);
      }
    }
    type();
  }

  // Start the typewriter effect when the page loads
  typeWriterEffect();
});

// Certificates

const images = document.querySelectorAll(".cirtificates-box img");

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".certificates-box img");
  const popup = document.getElementById("popup");
  const popupImg = document.getElementById("popup-img");
  const popupHeading = document.getElementById("popup-heading");
  const popupClose = document.getElementById("popup-close");

  images.forEach((image) => {
    image.addEventListener("click", function () {
      popupImg.src = image.src;
      popupHeading.textContent = image.alt;
      popup.style.display = "flex";
    });
  });

  popupClose.addEventListener("click", function () {
    popup.style.display = "none";
  });

  // Optional: Close the popup when clicking outside the popup content
  window.addEventListener("click", function (event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  });
});

// Toggle menu
let showMenu = false;

document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggle-button");
  const toggleButtonSpans = document.querySelectorAll(".toggle-button span");
  const toggleON = document.getElementById("toggle-on");
  const mainMenu = document.querySelector(".links");
  const menuLinks = mainMenu.querySelectorAll("a"); // Assuming links inside mainMenu are anchor tags

  function showMenuHandler() {
    toggleButton.classList.add("on");
    mainMenu.style.display = "flex";
    toggleButtonSpans.forEach((span) => (span.style.display = "none"));
    toggleON.style.display = "block";
    showMenu = true;
  }

  function hideMenuHandler() {
    toggleON.style.display = "none";
    mainMenu.style.display = "none";
    toggleButtonSpans.forEach((span) => (span.style.display = "block"));
    toggleButton.classList.remove("on");
    showMenu = false;
  }

  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!showMenu) {
      showMenuHandler();
    } else {
      hideMenuHandler();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      showMenu &&
      !toggleButton.contains(event.target) &&
      !mainMenu.contains(event.target)
    ) {
      hideMenuHandler();
    }
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hideMenuHandler();
    });
  });
});
