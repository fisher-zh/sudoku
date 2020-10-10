import React from 'react';
class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      row: Math.floor(props.index / 9) + 1,
      column: props.index % 9 + 1,
    }
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }
  handleMouseClick() {
    console.log(`第${this.state.row}行  第${this.state.column}列`);
    console.log('activeIndex', this.props.activeIndex);

    this.props.onActiveChange(this.state);
  }
  render() {
    return (
      <div
        className={`cell ` +
          `${this.props.activeIndex === this.state.index ? 'active' : ''} ` +
          `${this.state.column % 3 === 0 ? 'border-right' : ''} ` +
          `${this.state.column % 3 === 1 ? 'border-left' : ''} ` +
          `${this.state.row % 3 === 0 ? 'border-bottom' : ''} ` +
          `${this.state.row % 3 === 1 ? 'border-top' : ''}`
        }
        onClick={this.handleMouseClick}
    >{this.props.value}</div>
    )
  }
}

export default Cell;
