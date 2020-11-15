function Scheduler(taskNumber) {
  this.taskNumber = taskNumber;
  this.waitList = [];
  this.currentTaskNumber = 0;
  this.startTask = function (callback, ms, name) {
    if (this.currentTaskNumber < this.taskNumber) {
      this.currentTaskNumber++;
      callback(ms, name).then(res => {
        this.currentTaskNumber--;
        if (this.waitList.length > 0) {
          let nextTask = this.waitList.shift();
          console.log(nextTask);
          this.startTask(nextTask.fn, nextTask.ms, nextTask.name);
        }
      }).catch(err => {
        console.log('error--------');
        console.log(err);
      })
      let nextTask = this.waitList.shift();
      this.startTask(nextTask.fn, nextTask.ms, nextTask.name);
    }
  }
  this.addTask = function (callback, ms, name) {
    this.waitList.push({
      fn: callback,
      ms: ms,
      name: name
    })
  }
  this.start = function () {
    const nextTask = this.waitList.shift();
    this.startTask(nextTask.fn, nextTask.ms, nextTask.name);
  }
}


function sayName(ms, name) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(new Date(), name)
      resolve(true)
    }, ms)
  })
}

// 你的代码：
// 实现类 Scheduler

scheduler = new Scheduler(2)
scheduler.addTask(sayName, 1000, 'a');
scheduler.addTask(sayName, 2000, 'b');
scheduler.addTask(sayName, 3000, 'c');
scheduler.addTask(sayName, 4000, 'd');
console.log(new Date(), "start run... ")
scheduler.start();

