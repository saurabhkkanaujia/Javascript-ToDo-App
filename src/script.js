var todo = [];

var html = `<input id="new-task" type="text" />
<input id="old-task" type="hidden" />
<button id="addbtn" onclick="add()">Add</button>
<button id="updatebtn" onclick="updateTask()">Update</button>`; 

document.getElementById("itemBar").innerHTML = html;

function check(task) {
  const list = todo.filter((value) => {
    return value["task"] === task;
  });
  return list;
}

function add() {
  var task = document.getElementById("new-task").value;
  if (task.length != 0){
    if (check(task).length == 0) {
        todo.push({ task: task, status: 0 });
        task = "";
    }
    }
  console.log(todo);
  displayToDo();
}

function editTodo(task) {
  document.getElementById("new-task").value = task;
  document.getElementById("old-task").value = task;
  document.getElementById("addbtn").style.display = "none";
  document.getElementById("updatebtn").style.display = "block";
}

function deleteTodo(task) {
  const list = todo.filter((value) => {
    return value["task"] !== task;
  });
  todo = list;
  displayToDo();
}

function updateTask() {
  var t = check(document.getElementById("old-task").value);
  t[0].task = document.getElementById("new-task").value;
  document.getElementById("new-task").value = "";
  document.getElementById("addbtn").style.display = "block";
  document.getElementById("updatebtn").style.display = "none";
  displayToDo();
}

function updateStatus(task, flag) {
  var t = check(task);
  t[0].status = flag;
  console.log(todo);
  displayToDo();
}

function displayToDo() {
  var htmlIncomplete = htmlCompleted = "";
  for (var i = 0; i < todo.length; i++) {
    if (todo[i]["status"] == 0) {
        htmlIncomplete += `<li><input type="checkbox" onclick="updateStatus('${todo[i].task}', 1)">
            <label>${todo[i]["task"]}</label>
            <input type="text">
            <button class="edit" onclick="editTodo('${todo[i].task}')">Edit</button>
            <button class="delete"  onclick="deleteTodo('${todo[i].task}')">Delete</button></li>`;
    } else {
      htmlCompleted += ` <li><input type="checkbox"  onclick="updateStatus('${todo[i].task}', 0)" checked>
                    <label>${todo[i]["task"]}</label>
                    <input type="text">
                    <button class="edit" onclick="editTodo('${todo[i].task}')" >Edit</button>
                    <button class="delete" onclick="deleteTodo('${todo[i].task}')">Delete</button></li>`;
    }
  }
  document.getElementById("incomplete-tasks").innerHTML = htmlIncomplete;
  document.getElementById("completed-tasks").innerHTML = htmlCompleted;
}
