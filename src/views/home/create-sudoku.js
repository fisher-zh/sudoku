class Suduku {
  constructor(blankNum) {
    this.blankNum = blankNum || 30;
    this.restartNumber = 0;
    // 上一次的数独快照
    this.snapshootUsed = 0;
    this.sudukuPreviousArray = [];
    // 数独库
    this.sudukuArray = [];
  }
  reInit() {
    this.restartNumber = 0;
    // 上一次的数独快照
    this.snapshootUsed = 0;
    this.sudukuPreviousArray = [];
    // 数独库
    this.sudukuArray = [];
    this.init();
  }
  init() {
    try {
      this.setThird(2, 2);
      this.setThird(5, 5);
      this.setThird(8, 8);
      this.create();
    } catch (error) {
      this.init();
    }
  }
  // 重新开始初始化
  restart() {
    this.restartNumber++;
    // if (this.restartNumber > 2000) {
    //   // this.sudukuArray = [];
    //   return;
    // }
    this.sudukuArray = [];
    this.init();
  }
  // 生成某个三宫格上的数据
  setThird(i, j) {
    //为对角线上的三个三宫格随机生成。
    const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const sortedNumArr = numArr.sort(function () {
      return Math.random() - 0.5 > 0 ? -1 : 1;
    });
    const cenNum = parseInt(i + '' + j);
    const thIndexArr = [cenNum - 11, cenNum - 1, cenNum + 9, cenNum - 10, cenNum, cenNum + 10, cenNum - 9, cenNum + 1, cenNum + 11];
    for (var n = 0; n < 9; n++) {
      this.sudukuArray[thIndexArr[n]] = sortedNumArr[n];
    }
  }
  create() {
    for (let i = 1; i <= 9; i++) {
      for (let j = 1; j <= 9; j++) {
        const num = Number(i + '' + j);
        if (this.sudukuArray[num]) {
        } else {
          // 生成数字
          const rowArr = this.getRowAvailable(i, this.sudukuArray);
          const colArr = this.getColAvailable(j, this.sudukuArray);
          const gridArr = this.getGridAvailable(i, j, this.sudukuArray);
          const intersection = this.getIntersection(rowArr, colArr, gridArr);
          // console.log(rowArr);
          // console.log(colArr);
          // console.log(gridArr);
          // console.log('i:' + i, 'j:' + j);
          // console.log(intersection);
          // console.log(this.sudukuArray);
          if (intersection.length > 0) {
            // 备份数据
            this.sudukuPreviousArray = [].concat(this.sudukuArray);

            const index = Math.floor(Math.random() * intersection.length);
            this.sudukuArray[num] = intersection[index] - 0;
          } else {
            if (this.snapshootUsed < 5) {
              this.snapshootUsed++;
              this.sudukuArray = [].concat(this.sudukuPreviousArray);
              this.create();
              return;
            } else {
              this.restart();
              return;
            }
          }
        }
      }
    }
    console.log('数独数据生成完成' + this.restartNumber);
  }
  // 获取交集
  getIntersection () {
    const map = {};
    const len = arguments.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < arguments[i].length; j++) {
        if (map[arguments[i][j]]) {
          map[arguments[i][j]]++
        } else {
          map[arguments[i][j]] = 1;
        }
      }
    }
    const arr = [];
    for (let key in map) {
      if (map[key] > (len - 1)) {
        arr.push(key);
      }
    }
    return arr;
  }
  // 获取某个数组内1-9那些数字还未使用
  getAvailableNumber(arr) {
    const result = [];
    const map = {}
    for (let i = 0; i < arr.length; i++) {
      map[arr[i]] = true;
    }
    for (let j = 1; j <= 9; j++) {
      if (!map[j]) {
        result.push(j);
      }
    }
    return result;
  }
  // 获取一行内可用的值
  getRowAvailable(row, sudukuArray) {
    const arr = [];
    for (let i = 1; i <= 9; i++) {
      if (sudukuArray[row + '' + i]) {
        arr.push(sudukuArray[row + '' + i]);
      }
    }
    const result = this.getAvailableNumber(arr);
    return result;
  }
  // 获取一列内可用的值
  getColAvailable(col, sudukuArray) {
    const arr = [];
    for (let i = 1; i <= 9; i++) {
      if (sudukuArray[i + '' + col]) {
        arr.push(sudukuArray[i + '' + col]);
      }
    }
    const result = this.getAvailableNumber(arr);
    return result;
  }
  // 获取三宫格内可用的值
  getGridAvailable(row, col, sudukuArray) {
    const center = this.getGridCenter(row, col);
    const centerNum = Number(center.row + '' + center.col);
    const gridIndex = [
      centerNum - 11,
      centerNum - 1,
      centerNum + 9,
      centerNum - 10,
      centerNum,
      centerNum + 10,
      centerNum - 9,
      centerNum + 1,
      centerNum + 11
    ];
    const arr = [];
    for (let i = 0; i < gridIndex.length; i++) {
      if (sudukuArray[gridIndex[i]]) {
        arr.push(sudukuArray[gridIndex[i]]);
      }
    }
    const result = this.getAvailableNumber(arr);
    return result;
  }
  // 获取某个点属于的三宫格中心点
  getGridCenter(i, j) {
    let row = Math.ceil(i / 3) * 3 - 1;
    let col = Math.ceil(j / 3) * 3 - 1;
    // console.log(row, col)
		return {
      row,
      col
    };
  }
}

export default Suduku;
