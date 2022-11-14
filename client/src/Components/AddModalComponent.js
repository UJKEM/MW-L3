import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { PropTypes } from "prop-types";

export default class AddModalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crib: { name: "", img: "", location: "" },
    };
  }

  handleAddModalOnChange = (e) => {
    e.preventDefault();
    const newCrib = { ...this.state.crib };
    newCrib[e.target.name] = e.target.value;
    this.setState({ crib: newCrib });
  };

  handleModalAddButtonClick = (e, newCrib) => {
    e.preventDefault();
    this.props.handleAddCrib(newCrib);
    this.props.handleAddModalShowClose();
  };

  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleAddModalShowClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Crib</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  required={true}
                  onChange={(e) => this.handleAddModalOnChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="image"
                  name="img"
                  required={true}
                  onChange={(e) => this.handleAddModalOnChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  name="location"
                  required={true}
                  onChange={(e) => this.handleAddModalOnChange(e)}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary"
              onClick={(e) =>
                this.handleModalAddButtonClick(e, this.state.crib)
              }
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

AddModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  handleAddModalShowClose: PropTypes.func.isRequired,
  handleAddCrib: PropTypes.func.isRequired,
};
