const inputTask = document.querySelector('.inputTask');
const addBtn = document.querySelector('.addButton');
const taskList = document.querySelector('.listContainer');


function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}

function showTask() {
    taskList.innerHTML = localStorage.getItem("data")
}

addBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (inputTask.value.trim() === '') {
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert')
        alertBox.innerHTML = `<div class="alert alert-danger" role="alert"><i class="fa-solid fa-triangle-exclamation me-2"></i>Please Add Your Task</div>`;

        taskList.appendChild(alertBox);

        setTimeout(() => {
            taskList.removeChild(alertBox);
        }, 2000);

        return;
    }

    const noTaskMessage = document.querySelector('.box1');
    if (noTaskMessage) {
        noTaskMessage.remove()
    }

    const list = document.createElement('li');
    list.classList.add('task', 'd-flex', 'align-items-center', 'justify-content-between');
    list.innerHTML = `${inputTask.value}`;
    taskList.appendChild(list)


    const deleteBtn = document.createElement('div')
    deleteBtn.classList.add('deleteButton')
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash deleteTask mx-3"></i>`
    list.appendChild(deleteBtn)

    inputTask.value = '';

    saveData()
});

taskList.addEventListener('click', function (e) {
    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked')
        saveData()
    }

    else if (e.target.tagName === 'I') {
        const listItem = e.target.closest('li');
        listItem.remove();
        saveData()
    }

    if (taskList.children.length === 0) {
        const noTaskMessage = document.createElement('div')
        noTaskMessage.classList.add('box1')
        noTaskMessage.innerHTML = `No Task Found`
        taskList.appendChild(noTaskMessage)
        saveData()
    }
});

showTask()