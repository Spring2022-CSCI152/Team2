import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/imageCluster.css';

const ImageCluster = () => {
    const [clusters, setClusters] = useState([]);
    const [imageData, setImageData] = useState([]);

    const clusterImages = () => {
        var data = []
        axios.get('http://localhost:5000/getAllImageURLs').then(res => { 
            setImageData(res.data);
            data = res.data;
            data = {
                imageFiles: JSON.stringify(data)
            }
            //console.log(JSON.stringify(data));
            axios.get('http://localhost:5000/app/clusterImagesURL', { params: data }).then(res => { 
                console.log(res.data);
                // replace single quotes with double quotes
                let c = JSON.parse(res.data.replace(/'/g, '"'));
                // convert to array
                c = Object.keys(c).map(function (key) {
                    return [key, c[key]];
                });
                setClusters(c);
                console.log(c);

                // // update alerts
                // let reqData = {
                //     imageClusters: JSON.stringify(c)
                // }
                // axios.post('http://localhost:5000/updateAlerts', reqData).then(res => {
                //     console.log(res.data);
                // });
            });
        });
    }

    const updateAlerts = () => {
        let reqData = {
            imageClusters: JSON.stringify(clusters)
        }
        axios.post('http://localhost:5000/updateAlerts', reqData).then(res => {
            console.log(res.data);
        });
    }

    const clearAlerts = () => {
        axios.post('http://localhost:5000/clearAlerts').then(res => {
            console.log(res.data);
        });
    }

    return ( 
        <div className="imageCluster">
            <div className="imageClusterContainer">
                {/* Input for multiple image files */}
                <input type="file" id="file" multiple />
                <button onClick={ clusterImages }>Cluster Images</button>
                <button onClick={ updateAlerts }>Update Alerts</button>
                <button onClick={ clearAlerts }>Clear Alerts</button>
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
                                            <img src={image} alt="cluster" />
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