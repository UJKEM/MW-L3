import React from "react";
import "./App.css";
import axios from "axios";
import Crib from "./Components/Crib"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crib: [],
    };
  }

  async componentDidMount() {
    const { data } = await axios.get("http://localhost:3000/api/cribs");
    this.setState({ crib: data });
  }

  handleAddCrib = async (e) => { 
    
  }

  handleDeleteCrib = () => { }

  render() {
    return (
      <div className="App">
        <h1>My React App</h1>
        {this.state.crib &&
          this.state.crib.map((cr) => {
            return <Crib crib={cr}/>
          })}
      </div>
    );
  }
}

export default App;
