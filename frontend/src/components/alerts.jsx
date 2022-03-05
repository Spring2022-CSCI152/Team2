class Alerts extends Component {
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
          
      <section className = "alertBoxContainer">
          <br></br>
          {/* Different alerts can be used for different messages
          https://mui.com/components/alert/#api
          Use "Severity" to change type of alert
          */}
          <Alert severity="warning"> 
              <AlertTitle>Re-uploads Detected</AlertTitle>
              You have 2 new alerts. View a detailed overview <strong>below!</strong>
          </Alert> 
    </section>
                    
          
     
      );
    }
  }
  
  export default Alerts;
  