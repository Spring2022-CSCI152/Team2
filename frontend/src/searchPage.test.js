import React from 'react';
import {render} from "@testing-library/react";

//import ShallowRenderer from 'react-test-renderer/shallow';
import SearchPage from "./components/searchPage";
import SearchFilters from "./components/searchPage";

const ShallowRenderer = require( 'react-shallow-renderer');

describe(" search filters tests", () => {
    test("ensure filters appear", () => {
        const{getByText} = render(<SearchPage></SearchPage>);
        const images = getByText("Images");
        const collections = getByText("Images");
        const users = getByText("Images");
        expect(images).toBeInTheDocument();
        expect(images).toBeInTheDocument();
        expect(images).toBeInTheDocument();
     } );
    

    });
  
