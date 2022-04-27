import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/imageCluster.css';
//import buffer from 'buffer';
//window.Buffer = window.Buffer || require("buffer").Buffer;

const ImageCluster = () => {
    const [clusters, setClusters] = useState([]);

    const clusterImages = () => {
        let data = {
            imageFiles: []
        }
        axios.get('http://localhost:5000/app/clusterImages', data).then(res => { 
            console.log(res.data);
            // replace single quotes with double quotes
            let c = JSON.parse(res.data.replace(/'/g, '"'));
            // convert to array
            c = Object.keys(c).map(function (key) {
                return [key, c[key]];
            });
            setClusters(c);
            console.log(c);
        });
    }

    return ( 
        <div className="imageCluster">
            <div className="imageClusterContainer">
                {/* Input for multiple image files */}
                <input type="file" id="file" multiple />
                <button onClick={ clusterImages }>Cluster Images</button>
            </div>
            <div className="imageClusterResult">
                <p>Result: {JSON.stringify(clusters)} </p>
            </div>
            <div className="images">
                {clusters.map((cluster, index) => {
                    let cname = cluster[0];
                    let cimages = cluster[1];
                    return (
                        <div className="cluster" key={index}>
                            <h3>{cname}</h3>
                            <div className="clusterImages">
                                {cimages.map((image, index) => {
                                    return (
                                        <div className="image" key={index}>
                                            <img src={"/dataset/" + image} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default ImageCluster;