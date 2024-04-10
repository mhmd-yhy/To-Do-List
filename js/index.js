let addTaskBtn = document.querySelector(`.add-task`);
let tasks = document.querySelector(`.tasks`);
let delete_all = document.querySelector(`.delete-all`);
let popShow = document.querySelector(`.pop-show`);
let popOverflow = document.querySelector(`.pop-overflow`);
let input = document.querySelector(`input`);
let ok = document.querySelector(`.ok`);
let paragraf = document.createElement(`p`);

let tasksData = [];
if (localStorage.getItem(`tasksData`) != null) {
  tasksData = JSON.parse(localStorage.getItem(`tasksData`));
}
showTasks();

function setLocalStorage() {
  localStorage.setItem(`tasksData`, JSON.stringify(tasksData));
  // location.reload();
}

addTaskBtn.onclick = function () {
  showPop();
};

function showPop() {
  popShow.classList.remove(`d-none`);
  popShow.classList.add(`d-block`);
  popOverflow.classList.remove(`d-none`);
  popOverflow.classList.add(`d-block`);
}
function closePop() {
  input.value = "";
  popShow.classList.remove(`d-block`);
  popShow.classList.add(`d-none`);
  popOverflow.classList.remove(`d-block`);
  popOverflow.classList.add(`d-none`);
  input.style.display = "block";
  paragraf.style.display = "none";
}

let mood = "add";
ok.onclick = function () {
  if (mood != "delete") {
    if (input.value != "") {
      if (mood == "add") {
        let newTask = {
          taskDesc: "",
          isCompleted: false,
        };
        newTask.taskDesc = input.value;
        newTask.isCompleted = false;
        tasks.innerHTML = "";
        tasksData.push(newTask);
      } else {
        tasksData[Taskindex].taskDesc = input.value;
        mood = "add";
      }
    }
  } else {
    let newTasksData = tasksData.filter((task, index) => {
      return Taskindex != index;
    });
    tasksData = newTasksData;
    input.style.display = "block";
    paragraf.style.display = "none";
    mood = "add";
  }
  setLocalStorage();
  showTasks();
  closePop();
};

function showTasks() {
  tasks.innerHTML = ``;
  tasksData.map((task, index) => {
    tasks.innerHTML += `
    <div class="task d-flex align-items-center justify-content-between p-3">
      <div class="text w-50 fs-4 fw-semibold">${task.taskDesc}</div>
      <div class="icons text-center w-25 d-flex justify-content-evenly">
        <span onclick ="deleteTask(${index})" class="rounded-circle d-flex justify-content-center align-items-center">
          <i class="delete text-white d-block fa-solid fa-trash fa-sm"></i>
        </span>
        <span onclick ="editTask(${index})" class="rounded-circle d-flex justify-content-center align-items-center">
          <i class="update text-white d-block fa-solid fa-pen fa-sm"></i>
        </span>
        ${
          task.isCompleted
            ? `<span onclick ="setIsCompleted(${index})" class="rounded-circle d-flex justify-content-center align-items-center ${checkISCompleted(
                index
              )}">
        <i class="text-white d-block fa-solid fa-check fa-sm"></i>
      </span>`
            : `<span onclick ="setIsCompleted(${index})" class="rounded-circle d-flex justify-content-center align-items-center ${checkISCompleted(
                index
              )}">
            <i class="text-white d-block fa-solid fa-xmark fa-sm"></i>
    </span>`
        }
        
      </div>
    </div>`;
  });
  deleteAllShow();
}
function deleteAllShow() {
  if (tasksData.length != 0) {
    delete_all.classList.remove(`d-none`);
    delete_all.classList.add(`d-flex`);
  } else {
    delete_all.classList.remove(`d-flex`);
    delete_all.classList.add(`d-none`);
  }
}
function deleteAll() {
  localStorage.clear();
  location.reload();
}

let Taskindex;
function deleteTask(index) {
  mood = "delete";
  input.style.display = "none";
  paragraf.style.display = "block";
  paragraf.innerHTML = `Are you sure you want to delete "${tasksData[index].taskDesc}" ?`;
  paragraf.className = "w-100 text-white fs-6";
  popShow.prepend(paragraf);
  Taskindex = index;
  showPop();
}

function editTask(index) {
  Taskindex = index;
  mood = "edit";
  showPop();
}

function setIsCompleted(index) {
  tasksData[index].isCompleted = !tasksData[index].isCompleted;
  setLocalStorage();
  showTasks();
}
function checkISCompleted(index) {
  return tasksData[index].isCompleted ? "completed" : "";
}

/*To Top Scroll Button*/
let toTopBtn = document.querySelector(`.btn-top`);
window.addEventListener(`scroll`, () => {
  if (scrollY >= 750) toTopBtn.style.right = `40px`;
  else toTopBtn.style.right = `-40px`;
});

toTopBtn.onclick = (_) => {
  window.scroll({
    top: 0,
    behavior: `smooth`,
  });
};
