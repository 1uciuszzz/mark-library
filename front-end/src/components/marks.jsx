import React, { Component } from "react";
import axios from "axios";
import ListGroup from "./listGourp";
import MarkTable from "./markTable";

class Marks extends Component {
  state = {
    marks: [],
    genres: [],
    colors: ["", "is-primary", "is-success", "is-warning", "is-error"],
  };

  async handleSelectedGenre(genre) {
    const { data: marks } = await axios.get(
      "http://localhost:5000/marks/" + genre
    );
    this.setState({ marks });
  }

  async componentDidMount() {
    const { data: genres } = await axios.get("http://localhost:5000/genres");
    const { data: marks } = await axios.get("http://localhost:5000/marks");
    this.setState({ genres, marks });
  }

  render() {
    const { marks, genres, colors } = this.state;
    return (
      <div className="container">
        <div className="row" id="body">
          <div className="col-4" id="listGroupCol">
            <ListGroup
              items={genres}
              colors={colors}
              onGenreSelected={(genre) => this.handleSelectedGenre(genre)}
            />
          </div>
          <div className="col" id="markTableCol">
            <MarkTable marks={marks} colors={colors} />
          </div>
        </div>
      </div>
    );
  }
}

export default Marks;
