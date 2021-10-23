import React, { Component } from "react";
class ListGroup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { items, colors, onGenreSelected } = this.props;
    return (
      <div className="nes-container is-dark with-title">
        <p className="title">标签分类</p>
        <ul className="list-group">
          {items.map((item) => {
            return (
              <li
                onClick={() => onGenreSelected(item.genre)}
                className={
                  "list-group-item nes-btn _listGroupItem " +
                  colors[Math.floor(Math.random() * 5)]
                }
                key={item.genre}
              >
                {item.genre}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ListGroup;
