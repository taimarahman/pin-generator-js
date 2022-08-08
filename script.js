const keys = document.querySelectorAll(".keys");
const generateBtn = document.getElementById("pin-generate-btn");
const pinShowEl = document.getElementById("generated-pin");

const pinInputEl = document.querySelector(".input-pin");
const capsLockBtn = document.getElementById("capslock");
const backSpaceBtn = document.getElementById("backspace");
const enterBtn = document.getElementById("enter-btn");

const checkerEl = document.getElementById("checker");

let focusedEl = null;
const numberKeyCode = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105,
];
const generatedPINs = [];

keys.forEach((key) => {
  key.setAttribute("uppercase", key.innerText.toUpperCase());
  key.setAttribute("lowercase", key.innerText);
  key.setAttribute("onclick", "keyPress(this)");
});

(function () {
  console.log("dfv");
  let PIN = localStorage.getItem("PIN");

  if (PIN != null) {
    pinShowEl.innerText = PIN;
    setFocus();
  }
})();

function generatePIN() {
  let PIN = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 4; i++) {
    PIN += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  localStorage.setItem("PIN", PIN);

  return PIN;
}

function showPIN() {
  generatePIN();
  let PIN = localStorage.getItem("PIN");

  if (!generatedPINs.includes(PIN)) {
    generatedPINs.push(PIN);
    pinShowEl.innerText = PIN;
    // localStorage.setItem('PIN', PIN);
  } else {
    showPIN();
  }
}

//keyboard keydown keyup
function checkBackspace(event, el) {
  if (event.which == 8) {
    if (focusedEl.value == "" && el.previousElementSibling != null) {
      focusedEl = el.previousElementSibling;
      focusedEl.value = "";
      focusedEl.focus();
    }
  }
}

function checkEvent(event, el) {
  if (
    numberKeyCode.includes(event.which) ||
    (event.which >= 65 && event.which <= 90)
  ) {
    changeFocus(el);
  }
}

function changeFocus(el) {
  if (el.nextElementSibling != null) {
    focusedEl = el.nextElementSibling;
    focusedEl.focus();
  } else {
    focusedEl.focus();
  }
}

function keyPress(el) {
  if (focusedEl != null) {
    if (focusedEl != null && focusedEl.value == "") {
      focusedEl.value = el.innerText;
      changeFocus(focusedEl);
    } else {
      focusedEl.focus();
    }
  }
}

function deleteChar(el) {
  if (el.value == "" && el.previousElementSibling != null) {
    focusedEl = el.previousElementSibling;
    focusedEl.value = "";
    focusedEl.focus();
  } else if (el.value != "") {
    console.log("dek");
    el.value = "";
    el.focus();
  } else {
    el.focus();
  }
}

function capsLock() {
  capsLockBtn.classList.toggle("capsLock");

  if (capsLockBtn.classList.contains("capsLock")) {
    keys.forEach((key) => {
      key.innerText = key.getAttribute("uppercase");
    });
  } else {
    keys.forEach((key) => {
      key.innerText = key.getAttribute("lowercase");
    });
  }
}

// Get input PIN
function getInputPIN() {
  let inputPINstr = "";
  // console.log(pinInputEl);
  // console.log(pinInputEl.children.item(0));

  Array.from(pinInputEl.children).forEach((child) => {
    // console.log(child);
    inputPINstr += child.value;
  });
  console.log(inputPINstr);

  matchPIN(inputPINstr);

  // const inputPIN = ''
}

function matchPIN(PIN) {
  const inputPIN = PIN;
  const generatedPIN = localStorage.getItem("PIN");
  console.log(generatedPIN);

  if (inputPIN.toLowerCase() === generatedPIN.toLowerCase()) {
    checkerSuccess();
  } else {
    checkerEl.innerHTML = `
        <div class="fail">
        <i class="fa-regular fa-circle-xmark"></i>
            <h2>Oops!</h2>
        </div>
        `;
  }
}

function checkerAnimate() {
  checkerEl.innerHTML = `
    <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
    `;
}

function checkerSuccess() {
  checkerEl.innerHTML = `
    <div>
        <i class="fa-regular fa-circle-check"></i>
        <h2>Yoohoooooo!</h2>
    </div>
    `;
  clearInput();
  pinShowEl.innerText = "";
}

function clearInput() {
  Array.from(pinInputEl.children).forEach((child) => {
    // console.log(child);
    child.value = "";
  });
}

function setFocus() {
  focusedEl = pinInputEl.firstElementChild;
  focusedEl.focus();
  generateBtn.innerText = "Re-generate";
}

generateBtn.addEventListener("click", () => {
  showPIN();
  setFocus();
  checkerAnimate();
  clearInput();
});
capsLockBtn.addEventListener("click", capsLock);
backSpaceBtn.addEventListener("click", () => {
  deleteChar(focusedEl);
});

enterBtn.addEventListener("click", getInputPIN);

// window.onload = () => {
//     localStorage.clear();
// };
