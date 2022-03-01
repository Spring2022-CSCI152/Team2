import React, { Component } from "react"
;
import '../assets/featUsers.css';

class AlertsPage extends Component {
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
      this.loadData
    );
  };

  componentDidMount() {
    this.loadData();
  }

  render() {
    return (
    <>
        <Alert severity="warning">This is a warning alert — check it out!</Alert>              
        
   </>
    );
  }
}

export default AlertsPage;
