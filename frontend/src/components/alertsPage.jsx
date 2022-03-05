import React, { Component } from "react";
import Alert  from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import '../assets/alertsPage.css';
class AlertsPage extends React.Component{
   // Constructor 
   constructor(props) {
    super(props);

    this.state = {
        items: [],
        DataisLoaded: false
    };
}

// ComponentDidMount is used to
// execute the code 
componentDidMount() {
    fetch(
      "https://picsum.photos/v2/list?page=0&limit=1")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                items: json,
                DataisLoaded: true
            });
        })
}

  render(){
     {/* Different alerts can be used for different messages
          https://mui.com/components/alert/#api
          Use "Severity" to change type of alert
       */}
    function ZeroAlerts(){
     return(
      <Alert severity="success"> 
      <AlertTitle> No Re-uploads Detected!</AlertTitle>
      You have 0 new alerts!
      </Alert> )
      ;
    }
    function NumAlerts(props){
     return(
      <Alert severity="warning"> 
      <AlertTitle>Re-uploads Detected!</AlertTitle>
      You have {props.nAlerts} new alerts! Check it our <strong>below!</strong>
      </Alert>);
    }
    function AlertBox(props){
      const nAlerts = props.numAlert;
      if(nAlerts == 0){
        return <ZeroAlerts/>;
      }else{
        return <NumAlerts nAlerts = {nAlerts}/>;
      }
    }
    
    const{DataisLoaded,items} = this.state;
       
    return (
    <>
      <section className = "alertBoxContainer">
          <br></br>
        <AlertBox numAlert = {items.length}/> 
       </section>
  
    <section className = "activeAlerts">
      
    </section>
  </>               
        
   
    );
   }
}

export default AlertsPage;
