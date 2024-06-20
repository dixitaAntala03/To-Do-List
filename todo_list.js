function addList(event) {
    event.preventDefault()

    let task = document.getElementById('inputtask').value
    let task_status = document.getElementById('status').value
    let due_date = document.getElementById('duedate').value


    let completion_date = new Date(due_date)
    let current_date = new Date()

    let day_left = Math.ceil((completion_date - current_date) / (1000 * 60 * 60 * 24))

    let parent = document.getElementById('parent')
    let newRow = document.createElement('tr')

    newRow.innerHTML = `<td>${task}</td>
                        <td>${task_status}</td>
                        <td>${due_date}</td>
                        <td>${day_left}</td>
                        <td>
                            <button value="UPDATE" class="update-button" onclick="editList(this);">UPDATE</button>
                            <button value="DELETE" class="delete-button" onclick="deleteList(this);">DELETE</button>
                        </td>`

    parent.appendChild(newRow)

    document.getElementById('inputtask').value = ''
    document.getElementById('status').value = 'Not started'
    document.getElementById('duedate').value = ''

}

function editList(button) {
    
    let row = button.closest('tr')

    let taskCell = row.children[0]
    let statusCell = row.children[1]
    let dueDateCell = row.children[2]

    let task = taskCell.innerText
    let status = statusCell.innerText
    let dueDate = dueDateCell.innerText

    taskCell.innerHTML = `<input type="text" id="edit_task" value="${task}" size="70">`
    statusCell.innerHTML = `<select id="edit_status">
                                <option ${status === 'Not started'}>Not started</option>
                                <option ${status === 'In process'}>In process</option>
                                <option ${status === 'Complleted'}>Completed</option>
                            </select>`
    dueDateCell.innerHTML = `<input type="date" id="edit_due_date" value="${dueDate}">`

    button.innerText = 'DONE'

    button.onclick = function() {
        saveList(button)
    }

}

function saveList(button) {
    let row = button.closest('tr')
    let taskCell = row.children[0]
    let statusCell = row.children[1]
    let dueDateCell = row.children[2]
    let dayLeftCell = row.children[3]

    let task = document.getElementById('edit_task').value
    let status = document.getElementById('edit_status').value
    let dueDate = document.getElementById('edit_due_date').value

    let completion_date = new Date(dueDate)
    let current_date = new Date()

    let day_left = Math.ceil((completion_date - current_date) / (1000 * 60 * 60 * 24))

    taskCell.innerHTML = task
    statusCell.innerHTML = status
    dueDateCell.innerHTML = dueDate
    dayLeftCell.innerHTML = day_left

    button.innerText = 'UPDATE'

    button.onclick = function() {
        editList(button)
    }

}

function deleteList(button) {
    if(confirm('Are you sure to delete this record?')){
        let row = button.closest('tr')
        row.remove()
    }
}
