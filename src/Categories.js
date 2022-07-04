/* eslint-disable react/no-direct-mutation-state */
import React, { Component } from "react";

import "./Songs.css";

export class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      categoryId: 0,
      categoryName: "",

      categoryFilter: "",

      categoryWithoutFilter: [],
    };
  }

  FilterFn() {
    var categoryFilter = this.state.categoryFilter;

    var filteredData = this.state.categoryWithoutFilter.filter(function (e) {
      return e.categoryName
        .toString()
        .toLowerCase()
        .includes(categoryFilter.toString().trim().toLowerCase());
    });

    this.setState({ category: filteredData });
  }

  changecategoryFilter = (e) => {
    this.state.categoryFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch("https://localhost:44321/api/Category/getCategory")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ category: data, categoryWithoutFilter: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  deleteClick(id) {
    if (window.confirm("Are you sure?")) {
      fetch("https://localhost:44321/api/Category/obrisiPodatak/" + id, {
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
  render() {
    const { category } = this.state;

    return (
      <div>
        <div className="filteri">
          <input
            className="input"
            onChange={this.changecategoryFilter}
            placeholder="Search category by name"
          />
        </div>

        <table id="songsTable">
          <thead>
            <tr>
              <th>Category ID</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {category.map((cat) => (
              <tr key={cat.categoryId}>
                <td>{cat.categoryId}</td>
                <td>{cat.categoryName}</td>
                <td>
                  <button
                    type="button"
                    title="Delete category"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(cat.categoryId)}
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
      </div>
    );
  }
}
