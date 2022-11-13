import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { PropTypes } from "prop-types";

export default class EditModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crib: {
        name: "",
        img: "",
        location: "",
      },
    };
  }
  handleSave = async (id, updatedCrib) => {
    await this.props.handleEditCrib(id, updatedCrib);
    this.props.handleEditShowClose();
  };

  handleInputOnChange = (e) => {
    e.preventDefault();
    const updatedCrib = { ...this.state.crib };
    updatedCrib[e.target.name] = e.target.value;
    this.setState({ crib: updatedCrib });
  };

  render() {
    return (
      <>
        <Modal show={this.props.show} onHide={this.props.handleEditShowClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crib Id: {this.props.crib.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.crib.name}
                  onChange={(e) => this.handleInputOnChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="img" className="form-label">
                  Image URL
                </label>
                <input
                  id="img"
                  name="img"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.crib.img}
                  onChange={(e) => this.handleInputOnChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.crib.location}
                  onChange={(e) => this.handleInputOnChange(e)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={this.props.handleEditShowClose}
            >
              Close
            </Button>
            <Button
              name="Save"
              variant="primary"
              onClick={() =>
                this.handleSave(this.props.crib.id, {
                  ...this.state.crib,
                })
              }
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

EditModalComponent.propTypes = {
  crib: PropTypes.object.isRequired,
  show: PropTypes.bool.isRequired,
  handleEditCrib: PropTypes.func,
  handleEditShowClose: PropTypes.func.isRequired,
};
