import React, { Component } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import logo from '../logo.svg';
import "react-responsive-carousel/lib/styles/carousel.min.css";




  
const SearchFilters = () => {
   
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
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
    
export default SearchFilters;

