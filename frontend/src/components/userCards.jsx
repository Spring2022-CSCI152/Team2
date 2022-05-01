import React, { Component } from "react";
import '../assets/featUsers.css';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import axios from "axios";

class UserCards extends Component {
  state = {
    data: [],
    per: 16,
    page: 1,
    total_pages: 4
  };

  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  loadData = () => {
    const { per, page, data } = this.state;
    const endpoint = `https://randomuser.me/api/?nat=us&results=${per}&page=${page}`;
    
    fetch(endpoint)
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: [...data, ...json.results],
          scrolling: false,
          total_pages: json.info.results
        });
      });
  };
 
  loadMore = () => {
    this.setState(
      prevState => ({
    
        page: prevState.page + 1,
        scrolling: true
      }),
    
    );
  };

  async componentDidMount() {
   
    axios.get('app/featUsers')
    .then(res =>  this.setState( {data : res.data}))
    .catch(err => console.log(err)) 
 

  }

  render() {

    return (
     <>
    
        <div className="row">
          {this.state.data.map(data => (
         
            <div className="col-md-4 animated fadeIn" key={data._id}>
                 <Link to ={`/account/${data._id}`}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                  <Avatar
                    alt={data.name}
                   src={data.profileimg}
                    sx={{ width: 70, height: 70 }}
                    />
                  </div>
                  <h5 className="card-title">
                    {this.uppercase(data.name)} 
                  </h5>
                  <p className="card-text">
                    {data.userbio}
                    <br />
                    {/* <span className="phone">{data.phone}</span> */}
                  </p>
                </div>
              </div>
              </Link>
            </div>          
          ))}
        </div>
        {/*<button
          className="btn btn-light btn-block w-50 mx-auto"
          onClick={e => {
            this.loadMore();
          }}
        >
          Load More Users
        </button>
        */}
        
   </>
    );
    
  }
}

export default UserCards;
