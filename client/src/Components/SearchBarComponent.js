import React, { Component } from "react";
import AddModalComponent from "./AddModalComponent";
import { PropTypes } from "prop-types";

export default class SearchBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addShowModal: false,
    };
  }

  handleAddShowClose = () => {
    this.setState({ addShowModal: !this.state.addShowModal });
  };

  render() {
    return (
      <>
        <div className="d-flex align-items-center justify-content-center flex-row-reverse flex-wrap">
          <div className="d-flex">
            <button
              className="btn btn-primary mb-3"
              name="Add"
              onClick={() => this.handleAddShowClose()}
            >
              Add
            </button>
          </div>
          <div className="d-flex" style={{ marginRight: "8px" }}>
            <div className="input-group mb-3">
              <div className="form-outline">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={(e) => this.props.handleSearch(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-end "></div>
        <AddModalComponent
          show={this.state.addShowModal}
          handleAddShowClose={this.handleAddShowClose}
          handleAddCrib={this.props.handleAddCrib}
        />
      </>
    );
  }
}

SearchBarComponent.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  handleAddCrib: PropTypes.func,
};
