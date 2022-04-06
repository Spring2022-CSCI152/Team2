import React, { Component, Fragment } from "react";
import Alert  from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';
//import SearchFilters from "./searchFilters.jsx";
import DataGrid from "./dataGrid.jsx";
import '../assets/alertsPage.css';
import '../assets/searchPage.css';
import '../assets/dataGrid.css';
class SearchPage extends React.Component{
  
    // Constructor 
    constructor(props) {
      super(props);
  
      this.state = {
        data: [],
        keyword:"",
        per: 16,
        searchType: 0,
        page: 1,
        total_pages: 4,
          DataisLoaded: false
      };
  }
  loadData = () => {
    const { per, page, data } = this.state;
    const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;
    
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results],
          total_pages: json.info.results
        });
      });
  };

  render(){
  
    
    const SearchFilters = () => {
   
      const [value, setValue] = React.useState(0);
  
      const handleChange = (event, newValue) => {
      
        this.setState({
          data: [],
          keyword:"",
          per: 16,
          searchType: newValue,
          page: 1,
          total_pages: 4,
            DataisLoaded: false

        })
      };
     
  
      console.log("searchPage : " + this.state.searchType);
      return(
     
      <article>
          <Tabs value={value} onChange={handleChange} centered>
              <Tab className ="filters" label="All" />
              <Tab className ="filters" label="Users" />
               <Tab className ="filters" label="Images" />
               <Tab className ="filters" label="Collections" />
          </Tabs>
       </article>
      
      
      );
  }
    return (
    <>
    
      
        <SearchFilters></SearchFilters>
        
        <DataGrid searchType = {this.state.searchType} data = {this.state.data}></DataGrid>
      
      
    </>               
    );
   }
}

export default SearchPage;
