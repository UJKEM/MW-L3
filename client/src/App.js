import React from "react";
import "./App.css";
import axios from "axios";
import CribComponent from "./Components/CribComponent";
import SearchBarComponent from "./Components/SearchBarComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crib: [],
      search: "",
    };
  }

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:4000/api/cribs");
    this.setState({ crib: data });
  }

  handleAddCrib = async (crib) => {
    if (crib.name && crib.img && crib.location) {
      const { data } = await axios.post(
        "http://localhost:4000/api/cribs",
        crib
      );
      this.setState({ crib: data });
      this.setState({ addShowModal: !this.state.addShowModal });
    }
  };

  handleDeleteCrib = async (id) => {
    const { data } = await axios.delete(
      `http://localhost:4000/api/cribs/${id}`
    );
    this.setState({ crib: data });
  };

  handleEditCrib = async (id, updatedCrib) => {
    if (updatedCrib.name && updatedCrib.img && updatedCrib.location) {
      const { data } = await axios.put(
        "http://localhost:4000/api/cribs/" + id,
        updatedCrib
      );
      this.setState({ crib: data });
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ search: e.target.value });
  };

  renderFilteredList = (search) => {
    const filteredCribList =
      this.state.crib &&
      this.state.crib.filter((cr) => cr.name.includes(search));

    if (filteredCribList.length > 0) {
      return (
        <CribComponent
          crib={filteredCribList}
          handleDeleteCrib={this.handleDeleteCrib}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <>
        <div className="App">
          <h1>Crib Hound</h1>
          <SearchBarComponent
            handleSearch={this.handleSearch}
            handleAddCrib={this.handleAddCrib}
          />
          {this.state.search
            ? this.renderFilteredList(this.state.search)
            : this.state.crib && (
                <CribComponent
                  crib={this.state.crib}
                  handleDeleteCrib={this.handleDeleteCrib}
                  handleEditCrib={this.handleEditCrib}
                />
              )}
        </div>
      </>
    );
  }
}

export default App;
