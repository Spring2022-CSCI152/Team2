import React from 'react';
import {render} from "@testing-library/react";

//import ShallowRenderer from 'react-test-renderer/shallow';
import AlertsPage from "./components/alertsPage";
import AlertBox from"./components/alertsPage";
import AlertContent from"./components/alertsPage";
import NumAlerts from"./components/alertsPage";
import Alerts from"./components/alertsPage";
const ShallowRenderer = require( 'react-shallow-renderer');
describe("AlertsPage 10 alerts", () => {
       
   
    // test("10 alert box", () => {
        
    //     const renderer = new ShallowRenderer();
    //    render(<NumAlerts nAlerts = {10}/>) ;
    //    // const{getByTestId, getByText}   =  renderer.getRenderOutput();
    //  //  const expected =  getByTestId("alertsNumAlerts");
    //   const result = renderer.getRenderOutput();
    //     expect(result.props.children).toEqual([]);
    //  } );


});
describe("AlertsPage zero alerts", () => {
    test("zero alert box", () => {
        const{getByTestId} = render(<AlertBox numAlert = {0}></AlertBox>);
        const alertbox = getByTestId("zeroAlertBox");
        expect(alertbox).toBeTruthy();
     } );
     test("zero alert content", () => {
        const{getByTestId} = render(<AlertContent numAlert = {0}></AlertContent>);
        const alertbox = getByTestId("zeroAlertContent");
        expect(alertbox).toBeTruthy();
     } );

    });
  
