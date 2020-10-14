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
        value: ''
      })
    }
    this.state = {
      sd: null,
      currentActive: 0,
      list: list
    }
    this.handleActiveChange = this.handleActiveChange.bind(this);
    this.handleNumberClick = this.handleNumberClick.bind(this);
    this.handleCreatClick = this.handleCreatClick.bind(this);
  }
  componentDidMount () {
    const sd = new Sudoku(30);
    this.setState((state, props) => ({
      sd: sd
    }));
    sd.init();
    const arr = sd.sudukuArray;
    this.addNumber(arr);
  }
  addNumber(arr) {
    const list = this.state.list;
    this.setState({
      list: list.map((item) => {
        item.value = arr[item.row + '' + item.col] || '';
        return item;
      })
    })
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
        <button onClick={this.handleCreatClick}>重新生成</button>
      </div>
    );
  }
}

export default Home;
