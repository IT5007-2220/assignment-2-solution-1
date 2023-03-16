function bootstrap() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tableOperation(tasks);
}

function tableOperation(tasks) {
  const outstandingTable = document.querySelector('#outstandings tbody');
  const completedTable = document.querySelector('#completes tbody');
  // clear tables
  outstandingTable.innerHTML = '';
  completedTable.innerHTML = '';
  for (const task of tasks) {
    const row = document.createElement('tr');
    const sno = document.createElement('td');
    const desc = document.createElement('td');
    const priority = document.createElement('td');
    const deadline = document.createElement('td');
    const status = document.createElement('td');

    sno.textContent = task.sno;
    desc.textContent = task.description;
    priority.textContent = task.priority;
    deadline.textContent = task.deadline;

    if (task.status === 'outstanding') {
      // add a button to finish the task
      const finishButton = document.createElement('button');
      finishButton.textContent = 'Finish';
      finishButton.addEventListener('click', () => finishTask(task.sno));
      status.appendChild(finishButton);
      row.appendChild(sno);
      row.appendChild(desc);
      row.appendChild(priority);
      row.appendChild(deadline);
      row.appendChild(status);
      outstandingTable.appendChild(row);
    } else {
      status.textContent = 'Completed';
      row.appendChild(sno);
      row.appendChild(desc);
      row.appendChild(priority);
      row.appendChild(deadline);
      row.appendChild(status);
      completedTable.appendChild(row);
    }
  }
}

function addTask() {
  // get the values from the form
  const description = document.querySelector('#description').value;
  const priority = document.querySelector('#priority').value;
  const deadline = document.querySelector('#deadline').value;
  // retrieve list of tasks
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  // check if the list is full
  let count = 0
  console.log(count)
  for (const task of tasks) {
    if (task.status === 'outstanding'){
        count = count + 1
    }
  }
  if (count >= 10){
    alert('The list is already full!');
    return;
  }
  // add the new task to the list
  const sno = tasks.length + 1;
  const task = { sno, description, priority, deadline, status: 'outstanding' };
  tasks.push(task);
  // save the updated list of tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));
  // update the table
  tableOperation(tasks);
}

function finishTask(sno) {
  // retrieve the list of tasks from local storage
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  // find the task
  const index = tasks.findIndex((task) => task.sno === sno);
  tasks[index].status = 'completed';
  // save updated list of tasks
  localStorage.setItem('tasks', JSON.stringify(tasks));
  tableOperation(tasks);
}
