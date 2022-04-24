import React, { useCallback, useState, useContext } from "react";
import Alert  from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import '../assets/alertsPage.css';
import { Link } from "react-router-dom";
import cuid from "cuid";
import AuthContext from '../context/authContext';

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
      "https://picsum.photos/v2/list?page=0&limit=3")
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
    function RenderLinks(propsL){
      let x = propsL.propsLinks;
      let i = 0;
      let e = [];
      while(i < x){
       e.push( <a class = "indivLink" href = "https://www.google.com">Test</a>);
        i++;
      }
     return e;
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
        <>
        <article className = "singleAlert" key = { item.id } >
          
          {/*   User_Name: { item.author }, 
            Full_Name: { item.width }, 
            User_Email: { item.height }  */}
            <div className = "alertImgContainer"><img src = {item.download_url}></img></div>
            <Card className = "alertCard">
                <CardContent>
                
                
           
                  <Typography  color="text.secondary" gutterBottom>
                    Image Detected
                  </Typography>
                  <Divider></Divider>
                  <Typography variant="body2" color="text.primary">
                    Your image has been detected on
                  </Typography>
                </CardContent>
                <div className = "cardButtons">
                
                 
                    <Button size="small">Rescan</Button>
                    <Button size="small">Resolved</Button>
                </div>
            </Card>
            <div className = "alertLinks">
                <RenderLinks propsLinks = {3}/>
                
            </div>
        
        </article>
        </>
        )));
    }
    function AlertContent(props){
      const { loggedIn } = useContext(AuthContext);
      const { userInfo } = useContext(AuthContext);
      console.log(loggedIn);
      console.log(userInfo.email);
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
