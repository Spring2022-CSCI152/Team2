import React, { Component } from "react";
import Alert  from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import '../assets/alertsPage.css';
class AlertsPage extends React.Component{
  render(){
    return (
    <>
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
  
    <section className = "activeAlerts">
      
    </section>
  </>               
        
   
    );
   }
}

export default AlertsPage;
