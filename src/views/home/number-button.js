import React from 'react';
class NumberButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleMouseClick = this.handleMouseClick.bind(this);
  }
  handleMouseClick(num) {
    this.props.onNumberClick(num);
  }
  render() {
    let list = [];
    for (let i = 1; i < 10; i++) {
      list.push(<span className="cell" key={i} onClick={this.handleMouseClick.bind(this, i)}>{i}</span>);
    }
    return (
      <div className="button">
        {list}
      </div>
    )
  }
}

export default NumberButton;
