import React, { Component, Fragment } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';
import '../assets/dataGrid.css';
class DataGrid extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: props.userData,
      searchType: props.searchType,
      data: props.data,
      per: 4,
      page: 1,
      imgData: props.imgData,
      collectionData: props.collectionData
    };

  }
  loadData = () => {
    const { per, page, data } = this.state;
    const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;

    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results]

        });
      });
  };
  componentDidMount() {

  }


  render() {

    {/* Displays images for search page*/ }
    function DisplayImages(props) {

      {/*display images from data */ }
      if (props.data.length == 0) {
        return (<p className="noResults">
          No Results Found
        </p>);
      } else {
        return (

          <ImageList cols={5}>
            {props.data.map((item) => (
              <Link to={`/account/${item.collectionArray.postedBy}`}>
                <ImageListItem key={item.img}  >
                  <a href={item.img}>
                    <img
                      src={item.collectionArray.imgURL}
                      srcSet={item.collectionArray.imgURL}
                      alt={item.collectionArray.imgName}
                      loading="lazy"
                    />
                  </a>
                </ImageListItem>
              </Link>
            ))}
          </ImageList>
        );
      }
    }

    {/* Displays collections for search page*/ }
    function DisplayCollections(props) {

      {/*display collections from data */ }
      if (props.data.length == 0) {
        return (<p className="noResults">
          No Results Found
        </p>);
      } else {
        return (
          <>
            <br></br> <br></br>
            <Grid container spacing={4} >
              {props.data.map((item) => (

                <Grid item id={item._id} xs={3}>
                  <Link to={`/account/${item._id.postedBy}`} className="profileLink" >
                    <ImageList
                      sx={{ width: 200, height: 200 }}
                      rowHeight={100}
                      cols={2}


                      className="collectionItem"
                    >
                      {item.images.slice(0, 3).map((item2) => (
                        <ImageListItem key={item2} >

                          <img
                            className="cimages"
                            src={item2}
                            srcSet={item2}

                            loading="lazy"
                          />

                        </ImageListItem>
                      ))}
                      {/*
                  <ImageListItem className="plusMore" cols={1} rows={1}>
                 <Typography> + More </Typography>
                  </ImageListItem>
                 */}

                    </ImageList>
                    <div className="collectionNameBar">
                      <Typography className="collectionName">
                        {item.cName}
                      </Typography>
                      <Typography className="collectionArtist">
                        {item.name}
                      </Typography>
                    </div>
                  </Link>
                </Grid>
              ))}
            </Grid>

          </>);
      }
    }
    {/* Displays users for search page*/ }
    function DisplayUsers(props) {
      {/*display users from data */ }
   
      if (props.data.length == 0) {
        console.log("hi");
        return (<p className="noResults">
          No Results Found
        </p>);
      } else {
        return (
          <>
            <br></br> <br></br>
            <Grid className="gridContainer" container spacing={3}>
              <Grid>
                {props.data.map(item => (
                  <Card sx={{ maxWidth: 345, maxHeight: 500 }} key={item._id}>
                    <Link className = "profileLink" to={`/account/${item._id}`}>

                      <CardActionArea>
                        <Avatar
                          alt={item.username}
                          src={item.profileimg}//?w=164&h=164&fit=crop&auto=format`
                          sx={{ width: 100, height: 100 }}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h6" component="div">
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.userbio}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </>

        );
      }
    }

    function SearchContent(props) {
      // console.log(props.data);

      switch (props.searchType) {
        case 0:
          return <DisplayImages data={props.imgData}></DisplayImages>
        case 1:
          return <DisplayUsers data={props.userData}></DisplayUsers>
        case 2:
          return <DisplayCollections data={props.collectionData}></DisplayCollections>


      }


    }

    return (

      <section className="dataGrid">

        <SearchContent searchType={this.state.searchType} userData={this.state.userData} imgData={this.state.imgData} collectionData={this.state.collectionData}></SearchContent>


      </section>
    );
  }
}
const itemNums = [1, 2, 3, 4, 5, 6]
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    rows: 2,
    cols: 2,
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
    rows: 2,
    cols: 2,
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
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    rows: 2,
    cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
  },
];
export default DataGrid;
