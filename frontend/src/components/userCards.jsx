import React, { Component } from "react";
import '../assets/featUsers.css';
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
   getData =  () => {

    axios.get('app/featUsers')
          .then(res =>  this.setState( {data : res.data}))
          .catch(err => console.log(err));   
        
   
  }
  loadMore = () => {
    this.setState(
      prevState => ({
    
        page: prevState.page + 1,
        scrolling: true
      }),
    
    );
  };

  componentDidMount() {
    this.getData();
    

  }

  render() {
  
    console.log(this.state);
    return (
     <>
    
        <div className="row">
          {this.state.data.map(data => (
            <div className="col-md-4 animated fadeIn" key={data._id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={data.profileimg}
                      className="card-img-top"
                      alt={data.name}
                    />
                  </div>
                  <h5 className="card-title">
                    {this.uppercase(data.name)} 
                  </h5>
                  <p className="card-text">
                    {"Bio"}
                    <br />
                    {/* <span className="phone">{data.phone}</span> */}
                  </p>
                </div>
              </div>
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
