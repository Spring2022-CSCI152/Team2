import React, { Component, Fragment } from "react";
import Alert  from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import SearchFilters from "./searchFilters.jsx";
import '../assets/alertsPage.css';
import '../assets/searchPage.css';
class SearchPage extends React.Component{
  state = {
    data: [],
    per: 16,
    page: 1,
    total_pages: 4
  };

  render(){
  
    
       
    return (
    <>
        <SearchFilters></SearchFilters>
      
      
    </>               
    );
   }
}

export default SearchPage;
