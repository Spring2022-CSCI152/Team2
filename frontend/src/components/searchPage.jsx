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
class SearchPage extends React.Component{
  state = {
    data: [],
    keyword:"",
    per: 16,
    searchType: 0,
    page: 1,
    total_pages: 4
  };

  render(){
  
    
    const SearchFilters = (props) => {
   
      const [value, setValue] = React.useState(0);
  
      const handleChange = (event, newValue) => {
        setValue(newValue);
        this.state.searchType = newValue;
      };
          
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
      
      
    </>               
    );
   }
}

export default SearchPage;
