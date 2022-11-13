import React from "react";
import CribItem from "./CribItem";
import EditModalComponent from "./EditModalComponent";
import { PropTypes } from "prop-types";

class CribComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editShowModal: false,
      currentCrib: {
        id: "",
        name: "",
        img: "",
        location: "",
      },
    };
  }

  updateCurrentCrib = (crib) => {
    this.setState({ currentCrib: { ...this.state.currentCrib, ...crib } });
  };

  handleEditShowClose = () => {
    this.setState({ editShowModal: !this.state.editShowModal });
  };

  render() {
    return (
      <>
        <div className="container">
          <div className="row">
            {this.props.crib &&
              this.props.crib.map((cr, idx) => (
                <CribItem
                  key={idx}
                  crib={cr}
                  updateCurrentCrib={this.updateCurrentCrib}
                  show={this.state.editShowModal}
                  handleEditCrib={this.props.handleEditCrib}
                  handleDeleteCrib={this.props.handleDeleteCrib}
                  handleEditShowClose={this.handleEditShowClose}
                />
              ))}
          </div>
        </div>
        <EditModalComponent
          show={this.state.editShowModal}
          handleEditShowClose={this.handleEditShowClose}
          handleEditCrib={this.props.handleEditCrib}
          crib={this.state.currentCrib}
        />
      </>
    );
  }
}

CribComponent.propTypes = {
  crib: PropTypes.array.isRequired,
  handleDeleteCrib: PropTypes.func.isRequired,
  handleEditCrib: PropTypes.func,
};

export default CribComponent;
