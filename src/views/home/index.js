import React from 'react';
import './home.scss';

import Cell from './cell';
import NumberButton from './number-button';
import Sudoku from './create-sudoku';
class Home extends React.Component {
  constructor(props) {
    super(props);
    const list = [];
    const total = 81;
    for (let i = 0; i < total; i++) {
      list.push({
        key: i,
        row: Math.floor(i / 9) + 1,
        col: i % 9 + 1,
        value: '',
        show: true
      })
    }
    this.state = {
      sd: null,
      currentActive: 0,
      list: list,
      blankNum: 30
    }
    this.handleActiveChange = this.handleActiveChange.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleCreatClick = this.handleCreatClick.bind(this);
  }
  componentDidMount () {
    this.getRandom();
    const sd = new Sudoku();
    this.setState((state, props) => ({
      sd: sd
    }));
    sd.init();
    const arr = sd.sudukuArray;
    this.addNumber(arr);
  }
  addNumber(arr) {
    this.setState((state, props) => {
      const list = state.list;
      return {
        list: list.map((item) => {
          if (item.show) {
            item.value = arr[item.row + '' + item.col] || '';
          } else {
            item.value = '';
          }
          return item;
        })
      }
    })
  }
  getRandom() {
    const list = this.state.list;
    const blankNum = this.state.blankNum;
    for (let i = 0; i < blankNum; i++) {
      let index = Math.floor(Math.random() * 81);
      while (!list[index].show) {
        index = Math.floor(Math.random() * 81);
      }
      list[index].show = false;
    }
    this.setState({
      list: list
    });
  }
  handleActiveChange(cell) {
    const index = cell.index;
    console.log(cell);
    this.setState({
      currentActive: index
    });
  }
  handleNumberClick(num) {
    const list = this.state.list;
    const currentActive = this.state.currentActive;
    this.setState({
      list: list.map((item, index) => {
        if (index === currentActive) {
          item.value = num;
        }
        return item;
      })
    })
  }
  handleCreatClick() {
    this.state.sd.reInit();
    this.addNumber();
  }
  render() {
    const total = this.state.list.length;
    let cellList = [];
    const currentActive = this.state.currentActive;
    for (let i = 0; i < total; i++) {
      cellList.push(<Cell key={i} index={i} value={this.state.list[i].value} activeIndex={currentActive} onActiveChange={this.handleActiveChange} />);
    }
    return (
      <div className="home">
        <div className="content">
          {cellList}
        </div>
        <NumberButton onNumberClick={this.handleNumberClick}/>
        <div className="tips-wrapper">
          <button className="tips-button" onClick={this.handleCreatClick}>重新生成</button>
          <button className="tips-button" onClick={this.handleCreatClick}>删除</button>
        </div>
      </div>
    );
  }
}

export default Home;
