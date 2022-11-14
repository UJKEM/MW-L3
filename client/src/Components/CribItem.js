import React, { Component } from "react";
import { Building, HouseFill } from "react-bootstrap-icons";
import { PropTypes } from "prop-types";

export default class CribItem extends Component {
  handleEditButtonClick = (currentCrib) => {
    this.props.handleEditModalShowClose();
    this.props.updateCurrentCrib(currentCrib);
  };

  render() {
    const { name, img, location, id } = this.props.crib;
    return (
      <>
        <div className="col-md-4 mb-3 d-flex align-items-stretch">
          <div className="card" style={{ width: "30vw" }}>
            <div className="card-body">
              <img
                style={{ height: "10rem" }}
                src={img}
                className="card-img-top"
                alt={name}
              />
              <div className="d-flex align-items-start justify-content-center mt-1">
                <Building /> &nbsp;
                <h5 className="card-title">{name}</h5>
              </div>
              <div className="d-flex align-items-start justify-content-center">
                <HouseFill /> &nbsp;
                <p className="card-text mb-2">{location}</p>
              </div>

              <button
                className="btn btn-primary"
                style={{ marginRight: "2px" }}
                onClick={() => this.handleEditButtonClick(this.props.crib)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.props.handleDeleteCrib(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

CribItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  img: PropTypes.string,
  location: PropTypes.string,
  handleDeleteCrib: PropTypes.func.isRequired,
  handleEditModalShowClose: PropTypes.func.isRequired,
  updateCurrentCrib: PropTypes.func.isRequired,
};
