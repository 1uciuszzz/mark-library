import React, { Component } from "react";

class MarkTable extends Component {
  randomColor() {
    const colors = this.props.colors;
    return colors[Math.floor(Math.random() * 5)];
  }
  render() {
    const { marks } = this.props;
    return (
      <div className="nes-container with-title is-centered" id="_markTable">
        <p className="title">标签</p>
        <div className="row row-cols-1 row-cols-md-3 g-4" id="_markTableList">
          {marks.map((mark) => {
            return (
              <div
                className="nes-container is-rounded is-dark col"
                id="_markCard"
                key={mark.id}
              >
                <div className="card h-100" id="_inCard">
                  <div className="card-body bg-dark">
                    <h6 className="card-title">{mark.title}</h6>
                    <p className="card-text">{mark.genre}</p>
                    <div className="row">
                      <center>
                        <a
                          className={"nes-btn w-50 " + this.randomColor()}
                          href={mark.url}
                          target="_blank"
                        >
                          Go!
                        </a>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MarkTable;
