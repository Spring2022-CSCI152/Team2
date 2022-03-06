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
      "https://picsum.photos/v2/list?page=0&limit=2")
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
    function ZeroAlertContent(){
      return(
        <article className = "no-content"> <p >Congrats! No re-uploads detected!</p> </article>
      );
    }
    function NumAlerts(props){
     return(
      <Alert  severity="warning"> 
      <AlertTitle>Re-upload(s) Detected!</AlertTitle>
      You have {props.nAlerts} new alert(s)! Check it our <strong>below!</strong>
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
    function Alerts(props){
      return(items.map((item) => ( 
        <article className = "singleAlert" key = { item.id } >
          {/*   User_Name: { item.author }, 
            Full_Name: { item.width }, 
            User_Email: { item.height }  */}
            <div className = "alertImgContainer">IMG</div>
            <div className = "alertCard">CARD</div>
            <div className = "alertLinks">LINK</div>
        </article>
        )));
    }
    function AlertContent(props){
      const nAlerts = props.numAlert;

      if(nAlerts == 0){
        return <ZeroAlertContent/>;
      }else{
        return <Alerts nAlerts = {nAlerts}/>;
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
      <AlertContent  numAlert = {items.length}/>
    </section>
  </>               
        
   
    );
   }
}

export default AlertsPage;
