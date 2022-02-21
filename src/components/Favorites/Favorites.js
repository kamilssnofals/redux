import React, { Component } from "react";
import "./Favorites.css";
import store from "../redux/store";
import { Link } from 'react-router-dom'

class Favorites extends Component {
  state = {
    title: "Новый список",
    movies: [],
    listId: "",
    isClicked: false,
  };

  componentDidMount() {
    store.subscribe(() => {
      const globalState = store.getState();
      this.setState({ movies: globalState.favMovies });
    });
  }

  saveFavList = () => {
    const data = this.state;
    this.setState({ isClicked: true });
    fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const listId = data.id;
        this.setState({ listId: listId });
      })
      .catch((err) => {
        console.error("error-safe-fav-list ", err);
      });
  };

  deleteFromFavs = (id) => {
    store.dispatch({
      type: "DELETE_FROM_FAVS",
      payload: { id: id },
    });
  };

  //    getListId = () => {

  //    }

  //https://acb-api.algoritmika.org/api/movies/list

  // componentDidMount() {
  //     const favState = store.getState();
  //     this.setState({movies:favState.Favorites})
  // }

  // handleCloseFav = (id) => {
  //     const clone = this.state.movies.filter((item) => item.id !== id)
  //     this.setState({movies: clone});
  // }

  handlechangeNewList = (event) => {
    this.setState({ title: event.target.value });
  };

  render() {
    return (
      <div className="favorites">
        <input
          value="Новый список"
          className="favorites__name"
          onChange={this.handlechangeNewList}
        />
        <ul className="favorites__list">
          {this.state.movies.map((item) => {
            return (
              <li key={item.id}>
                {item.title} ({item.year})
                <button
                  className="close-button"
                  onClick={() => this.deleteFromFavs(item.id)}
                >
                  x
                </button>
              </li>
            );
          })}
        </ul>



          {
              this.state.isClicked ?
              <Link to={`/list/${this.state.listId}`}>
             Go-to-my-list
          </Link> :
        <button
          type="button"
          className="favorites__save"
          onClick={() => this.saveFavList()}
        >
          Сохранить список
        </button>
  }
      </div>
    );
  }
}

export default Favorites;
