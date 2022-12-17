let tasks = []
const taskList = document.getElementById("list")
const addTaskInput = document.getElementById("add")
const taskCounter = document.getElementById("tasks-counter")

const fetchToDo = () => {
  fetch("https://jsonplaceholder.typicode.com/todos").then(function(response) {
    return response.json()
  }).then(function(data) {
    tasks = data.slice(0, 0)
    renderList()
  })
}

const addTaskDOM = (task) => {
  const li = document.createElement("li")
  li.innerHTML = `<li>
          <input type="checkbox" id="${task.id}" data-id="${task.id}" ${task.completed ? "checked" : ""} class="custom-checkbox">
          <label for="${task.id}">${task.title}</label>
          <img src="trash.svg" class="delete" data-id="${task.id}" />
        </li>`


  taskList.append(li)
}

const renderList = () => {
  taskList.innerHTML = ""
  for (let i = 0; i < tasks.length; i++) {
    addTaskDOM(tasks[i])
  }
  taskCounter.innerHTML = tasks.length
}

const markTaskComplete = (taskId) => {
  let task = tasks.filter(function(task) {
    return task.id === taskId
  })
  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.completed = !currentTask.completed;
    renderList()
    // showNotification("Task Has Been Toggled")
    return
  }

}

const deletTask = (taskId) => {
  const newTask = tasks.filter(function(task) {
    return task.id !== Number(taskId)
  })
  tasks = newTask;
  renderList();
  showNotification("Task Has Been Deleted")
}

const showNotification = (title) => {
  alert(title)
}

const addTask = (task) => {
  if (task) {
    tasks.push(task)
    renderList()
    showNotification("Task Has Been Added")
    return
  }
}

const handleEvents = (e) => {
  if (e.key === "Enter") {
    const title = e.target.value


    if (title === "") {
      showNotification("Please Enter A Task To Add")
      return
    }


    let task = {
      title,
      id: Date.now(),
      completed: false
    }
    e.target.value = "";
    addTask(task)
  }

}

const handleClickListener = (e) => {
  const target = e.target;
  if (target.className === "delete") {
    const taskId = target.dataset.id
    deletTask(taskId)
    return
  }
  else if (target.className === "custom-checkbox") {
    const taskId = target.id
    markTaskComplete(taskId)
    return
  }
}

const inititialiseApp = () => {
  fetchToDo()
  addTaskInput.addEventListener("keyup", handleEvents)
  document.addEventListener("click", handleClickListener)
}
inititialiseApp()
