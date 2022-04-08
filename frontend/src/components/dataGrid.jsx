import React, { Component, Fragment } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



class DataGrid extends React.Component{
  
  constructor(props) {
    super(props);

    this.state = {
        searchType : props.searchType,
        data : props.data

    };
}

  render(){
   
  
    function DisplayAll(props){
        {/*display images from data */}
       
        return (
        <ImageList cols = {5}>
            
            {props.imgData.map((item) => (
                <ImageListItem key = {item.img}  >
                   <a href = {item.img}>
                        <img 
                        
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                   </a>
                </ImageListItem>
            ))}
        </ImageList>
        );

    }
    function DisplayImages(){
        {/*display images from data */}
        return null;


    }
    function DisplayCollections(){
        {/*display collections from data */}
    }
    function DisplayUsers(){
        {/*display users from data */}
    }
       
    function SearchContent(props){
       console.log("dataGrid:" + props.searchType);
        switch(props.searchType){
            case 0 :
                return <DisplayAll imgData = {props.data}></DisplayAll>
            case 1 :
                return <DisplayUsers></DisplayUsers>
            case 2 :
                return <DisplayImages></DisplayImages>
            case 3 :
                return <DisplayCollections></DisplayCollections>
          
                
        }
        return null;

    }

    return (
    <section className = "dataGrid">
        
    <SearchContent searchType = {this.state.searchType} data = {itemData}></SearchContent>
      
      
    </section>             
    );
   }
}
const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];
export default DataGrid;
