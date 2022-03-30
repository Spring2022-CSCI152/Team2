import React, { Component, Fragment } from "react";
import Alert  from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import '../assets/alertsPage.css';
import '../assets/searchPage.css';
class DataGrid extends React.Component{
  state = {
    data: [],
    per: 16,
    searchType: "all",
    page: 1,
    total_pages: 4

  };

  render(){
    function DisplayImages(){
        {/*display images from data */}

    }
    function DisplayCollections(){
        {/*display collections from data */}
    }
    function DisplayUsers(){
        {/*display users from data */}
    }
       
    function SearchContent(){
        switch(this.state.searchType){
            case "0":
                return <DisplayImages></DisplayImages>
            case "1":
                return <DisplayCollections></DisplayCollections>
            
        }

    }
    return (
    <>
    <SearchContent></SearchContent>
      
      
    </>               
    );
   }
}

export default DataGrid;
