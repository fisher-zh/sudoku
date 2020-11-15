function task (ms, name) {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      console.log(new Date(), name);
      resolve();
    }, ms)
  })
}

function Parallel (number) {
  this.number = number;
  this.currentNumber = 0;
  this.taskList = [];
  this.carryTaskList = [];
}
Parallel.prototype.addTask = function (task, ms, name) {
  this.taskList.push({
    fn: task,
    ms: ms,
    name: name
  })
}
Parallel.prototype.start = function () {
  if (this.taskList.length <= 0) {
    return;
  }
  while (this.currentNumber < this.number) {
    const newTask = this.taskList.shift();
    this.carryTaskList.push(newTask);
    this.currentNumber++;
  }
  this.carry();
}
Parallel.prototype.carry = function () {
  while (this.carryTaskList.length > 0) {
    const newTask = this.carryTaskList.shift();
    console.log(newTask);
    newTask.fn(newTask.ms, newTask.name).then(_ => {
      this.currentNumber--;
      this.start();
    })
  }
}

console.log('task start-----------', new Date());
const para = new Parallel(2);
para.addTask(task, 1000, 'a');
para.addTask(task, 2000, 'b');
para.addTask(task, 3000, 'c');
para.addTask(task, 4000, 'd');
para.start();