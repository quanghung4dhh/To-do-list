window.onload = () => {
  addEvent();
  document.querySelector(".theme").onclick = changeTheme;
  document.querySelector(".add").onclick = Add;
  document.querySelector(".close").onclick = closeInput;
  document.querySelector(".submit").onclick = submitPlan;
};
function addEvent() {
  document
    .querySelectorAll(".fa-thumbtack")
    .forEach((item) => (item.onclick = Pin));
  document
    .querySelectorAll(".fa-trash")
    .forEach((item) => (item.onclick = Remove));
  document
    .querySelectorAll(".fa-pen")
    .forEach((item) => (item.onclick = Change));
}

function changeTheme() {
  const currentTheme = document.querySelector(".head i").className;
  if (currentTheme === "fa-regular fa-sun") {
    document.querySelector(".head i").className = "fa-regular fa-moon";
    document.querySelector(".head").classList.add("headdark");
    document.querySelector(".main").classList.add("maindark");
    document.querySelectorAll("ul li").forEach((item) => {
      item.classList.add("dark");
    });
    document.querySelector(".add").classList.add("adddark");
  } else {
    document.querySelector(".head i").className = "fa-regular fa-sun";
    document.querySelector(".head").classList.remove("headdark");
    document.querySelector(".main").classList.remove("maindark");
    document.querySelectorAll("ul li").forEach((item) => {
      item.classList.remove("dark");
    });
    document.querySelector(".add").classList.remove("adddark");
  }
  if (document.querySelectorAll(".fa-thumbtack").length != 0) {
    document.querySelectorAll(".fa-thumbtack").forEach((item) => {
      if (item.style.color === "rgb(61, 169, 252)") return;
      item.style.color = currentTheme === "fa-regular fa-sun" ? "#fffffe" : "#172c66"
    });
  }
  console.log(document.querySelectorAll(".fa-thumbtack").length != 0);
}

function Pin() {
  let currentColor = this.style.color;
  const currentTheme = document.querySelector(".head i").className;
  if (
    currentColor === "rgb(61, 169, 252)" &&
    currentTheme === "fa-regular fa-sun"
  ) {
    this.style.color = "#172c66";
    return 0;
  }
  if (
    currentColor === "rgb(61, 169, 252)" &&
    currentTheme === "fa-regular fa-moon"
  ) {
    this.style.color = "#fffffe";
    return 0;
  }
  this.style.color = "#3da9fc";
}

function Remove() {
  const parent = this.parentNode;
  const listToDelete = parent.parentNode;
  listToDelete.remove();
}

function Change() {
  const parent = this.parentNode;
  const selectList = parent.parentNode;
  const plan = selectList.firstElementChild;
  const name = plan.firstElementChild.innerText;
  const currentDate = plan.lastElementChild.innerText.split("/");
  if (currentDate[0].length == 1) {
    currentDate[0] = "0" + currentDate[0];
  }
  if (currentDate[1].length == 1) {
    currentDate[1] = "0" + currentDate[1];
  }
  document.querySelector(".input #name").value = name;
  document.querySelector(
    ".input #time"
  ).value = `${currentDate[2]}-${currentDate[1]}-${currentDate[0]}`;
  document.querySelector(".input").style.visibility = "visible";
  document.querySelector(".changeBut").style.visibility = "visible";
  document.querySelector(".submit").style.visibility = "hidden";
  document.querySelector(".changeBut").onclick = changePlan;
  function changePlan() {
    const newPlan = document.querySelector(".input #name").value;
    const newDate = new Date(document.querySelector(".input #time").value);
    plan.firstElementChild.innerText = newPlan;
    plan.lastElementChild.innerText = `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
    document.querySelector(".input #time").value = "";
    document.querySelector(".input #name").value = "";
    closeInput();
  }
}
function Add() {
  document.querySelector(".input").style.visibility = "visible";
  document.querySelector(".submit").style.visibility = "visible";
  document.querySelector(".changeBut").style.visibility = "hidden";
}

function closeInput() {
  document.querySelector(".input").style.visibility = "hidden";
  document.querySelector(".changeBut").style.visibility = "hidden";
  document.querySelector(".submit").style.visibility = "hidden";
  document.querySelector(".input #time").value = "";
  document.querySelector(".input #name").value = "";
}

function submitPlan() {
  const plan = document.querySelector(".input #name").value;
  const timeStr = document.querySelector(".input #time").value;
  const time = new Date(timeStr);
  const newNode = document.createElement("li");
  if (plan === "" || timeStr === "") {
    closeInput();
    return 0;
  }

  const newPlan = document.createRange().createContextualFragment(`
    <div class="todo">
     <div class="plan">${plan}</div>
      <div class="date">${time.getDate()}/${
    time.getMonth() + 1
  }/${time.getFullYear()}</div>
    </div>
    <div class="option">
     <i class="fa-solid fa-thumbtack"
      ><span class="tooltip pin">Pin</span></i
     >
     <i class="fa-solid fa-trash"
        ><span class="tooltip remove">Remove</span></i
      >
     <i class="fa-solid fa-pen"
       ><span class="tooltip change">Change</span></i
      >
    </div>
    `);
  const currentTheme = document.querySelector(".head i").className;
  if (currentTheme === "fa-regular fa-moon") {
    newNode.className = "dark";
  }
  newNode.appendChild(newPlan);
  document.querySelector("ul").appendChild(newNode);
  document.querySelector(".input #time").value = "";
  document.querySelector(".input #name").value = "";
  addEvent();
  closeInput();
}
