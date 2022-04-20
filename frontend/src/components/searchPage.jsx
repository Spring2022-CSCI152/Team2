import React, { Fragment } from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//import SearchFilters from "./searchFilters.jsx";
import DataGrid from "./dataGrid.jsx";

import '../assets/searchPage.css';
import '../assets/dataGrid.css';
import axios from "axios";


var sKey;
class SearchPage extends React.Component {

  // Constructor 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      userData: [],
      keyword: "",
      searchType: 0,
      page: 1,
      total_pages: 4,
      DataisLoaded: false
    };
   



  }
  componentDidMount(){
    this.setKeyword();
  
 
  
  };
  setKeyword(){
    const url = new URL(window.location.href);
    const searchTerm = url.searchParams.get("searchField");
    this.state.keyword = searchTerm;
  };
 

  render() {
    const getData =  () => {

      axios.post('app/search/users', 
      {searchTerm : this.state.keyword,
        searchType: this.state.searchType
       })
            .then(res =>  this.setState( {userData : res.data}))
            .catch(err => console.log(err));
      
     
    }
  


    const SearchFilters = () => {

      const [value, setValue] = React.useState(this.state.searchType);
      /*changes value of searchType on change */
      const handleChange = (event, newValue) => {
        getData();
        setValue(newValue);
        this.setState({

          searchType: newValue,


        })

      };
     

      return (
        /*tabs component */
        <article>
          <Tabs value={value} onChange={handleChange} centered>

            <Tab label={<span className="filters">Images</span>} />
            <Tab label={<span className="filters">Users</span>} />

            <Tab label={<span className="filters">Collections</span>} />
          </Tabs>
        </article>


      );
    }
    /*calls data grid based on searchType */
    function CallDataGrid(props) {
      return (
        <DataGrid searchType={props.searchType} userData = {props.userData} data={props.data}></DataGrid>
      );

    }

    return (
      <>


        <SearchFilters ></SearchFilters>

        <CallDataGrid searchType={this.state.searchType} data={this.state.data} userData = {this.state.userData} keyword = {this.state.keyword}></CallDataGrid>

      </>
    );
  }
}

export default SearchPage;
