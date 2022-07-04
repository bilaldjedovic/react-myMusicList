/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";

import "./Songs.css";

export class Songs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      favorite: [],
      songs: [],
      modalTitle: "",
      songId: 0,
      songName: "",
      categoryId: 0,
      favoriteId: 0,
      author: "",
      link: "",
      rate: "",
      createdAt: "",
      modifiedAt: "",

      favoriteFilter: "",
      songNameFilter: "",

      songsWithoutFilter: [],
    };
  }

  FilterFn() {
    var favoriteFilter = this.state.favoriteFilter;
    var songNameFilter = this.state.songNameFilter;

    var filteredData = this.state.songsWithoutFilter.filter(function (e) {
      return (
        e.favoriteName
          .toString()
          .toLowerCase()
          .includes(favoriteFilter.toString().trim().toLowerCase()) &&
        e.songName
          .toString()
          .toLowerCase()
          .includes(songNameFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ songs: filteredData });
  }
  changefavoriteFilter = (e) => {
    this.state.favoriteFilter = e.target.value;
    this.FilterFn();
  };

  changesongNameFilter = (e) => {
    this.state.songNameFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch("https://localhost:44321/api/Song/getSongs")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ songs: data, songsWithoutFilter: data });
      });

    fetch("https://localhost:44321/api/Favorite/getFavorite")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ favorite: data });
      });

    fetch("https://localhost:44321/api/Category/getCategory")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ category: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }
  changeSongName = (e) => {
    this.setState({ songName: e.target.value });
  };
  changeCategoryName = (e) => {
    this.setState({ categoryId: e.target.value });
  };
  changeAuthor = (e) => {
    this.setState({ author: e.target.value });
  };
  changeRate = (e) => {
    this.setState({ rate: e.target.value });
  };
  changeCreated = (e) => {
    this.setState({ createdAt: e.target.value });
  };

  changeModified = (e) => {
    this.setState({ modifiedAt: e.target.value });
  };
  changeLink = (e) => {
    this.setState({ link: e.target.value });
  };
  changeFavorite = (e) => {
    this.setState({ favoriteId: e.target.value });
  };
  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44321/api/Song/obrisiPodatak/" + id, {
        method: "DELETE",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  updateClick() {
    fetch("https://localhost:44321/api/Song/editSong/" + this.state.songId, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songName: this.state.songName,
        author: this.state.author,
        link: this.state.link,
        rate: this.state.rate,
        createdAt: this.state.createdAt,
        modifiedAt: this.state.modifiedAt,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert("Success");
          this.refreshList();
          console.log(result);
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  editClick(songs) {
    this.setState({
      modalTitle: "Edit song",
      songId: songs.songId,
      songName: songs.songName,
      link: songs.link,
      author: songs.author,
      createdAt: songs.createdAt,
      modifiedAt: songs.modifiedAt,
      rate: songs.rate,
    });
  }
  render() {
    const {
      songs,
      modalTitle,
      songId,
      songName,
      author,
      link,
      rate,
      createdAt,
      modifiedAt,
    } = this.state;

    return (
      <div>
        <div className="filteri">
          <input
            className="input"
            onChange={this.changesongNameFilter}
            placeholder="Search song by name"
          />
          <input
            className="input"
            onChange={this.changefavoriteFilter}
            placeholder="Search favorite (YES/NO) "
          />
        </div>

        <table id="songsTable">
          <thead>
            <tr>
              <th>Song name</th>
              <th>Category</th>
              <th>Author</th>
              <th>Link</th>
              <th>Rate</th>
              <th>Created at</th>
              <th>Modified at</th>
              <th>Is favorite?</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {songs.map((song) => (
              <tr key={song.songId}>
                <td>{song.songName}</td>
                <td>{song.categoryName}</td>
                <td>{song.author}</td>
                <td>{song.link}</td>
                <td>{song.rate}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {song.createdAt.substring(0, 10)}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  {song.modifiedAt.substring(0, 10)}
                </td>
                <td>{song.favoriteName}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    title="Edit song"
                    onClick={() => this.editClick(song)}
                  >
                    <img
                      src="https://toppng.com/uploads/preview/75476-2019-02-08-edit-icon-png-small-11563142463qiwrzqx0e1.png"
                      alt="myimage"
                      width={17}
                    />
                  </button>
                  <button
                    type="button"
                    title="Delete song"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(song.songId)}
                  >
                    <img
                      src="https://www.pngall.com/wp-content/uploads/5/Delete-Bin-Trash-PNG-Free-Download.png"
                      alt="myimage"
                      width={17}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Song name</span>
                      <input
                        type="text"
                        className="form-control"
                        ref={songName}
                        defaultValue={this.state.songName}
                        onChange={this.changeSongName}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Author</span>
                      <input
                        type="text"
                        className="form-control"
                        value={author}
                        defaultValue={this.state.author}
                        onChange={this.changeAuthor}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Rate</span>
                      <input
                        type="text"
                        className="form-control"
                        ref={rate}
                        defaultValue={this.state.rate}
                        onChange={this.changeRate}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">created</span>
                      <input
                        type="text"
                        className="form-control"
                        value={createdAt}
                        defaultValue={this.state.createdAt}
                        onChange={this.changeCreated}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">modified</span>
                      <input
                        type="text"
                        className="form-control"
                        value={modifiedAt}
                        defaultValue={this.state.modifiedAt}
                        onChange={this.changeModified}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Link</span>
                      <input
                        type="text"
                        className="form-control"
                        value={link}
                        defaultValue={this.state.link}
                        onChange={this.changeLink}
                      />
                    </div>
                  </div>
                </div>

                {songId !== 0 ? (
                  <button
                    type="button"
                    className="btn btn-info float-end"
                    onClick={() => this.updateClick()}
                  >
                    Update
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
