import React from 'react';
import './App.css';


  class App extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        search: '',
        searchValid: false,
        STORE:{
          name:[]
        }
      }
    }
  

    updateSearch = (search) => {
      this.setState({search});
    }

    handleSearchSubmit = (event) =>{
      event.preventDefault();
      fetch('https://swapi.co/api/people/?search=' + this.state.search)
      .then (res => res.json())
      .then (json =>{
        let newNames = [];
        for(let x=0; x<json.results.length;x++){
          newNames.push(json.results[x].name);
        }
        this.setState({
          STORE:{
            name:newNames
          }
        })

      } 
      )
    }
  
    createListResults = () =>{

      if(this.state.STORE.name.length>0){
      return this.state.STORE.name.map(names => {
        return <li> {names} </li> ;
      })
      }

    }


render(){

  return (
    <div>
      <h1>Star Wars Character Search</h1> 
    <form className="Add-Note" onSubmit={this.handleSearchSubmit}>

    <div className="form-group">
      <label htmlFor="note-content">Search Term *</label>
      <input type="text" className="add-note-content"
        name="note-content" id="note-content" onChange={e => this.updateSearch(e.target.value)}/>
    </div>
    <div className="registration__button__group">
  
    <button type="submit" className="add-button">
       Search Starwars Characters
    </button>
   </div>
  </form>
  <ul>
    {this.createListResults()}
  </ul>
  </div>
  );
}

}

export default App;