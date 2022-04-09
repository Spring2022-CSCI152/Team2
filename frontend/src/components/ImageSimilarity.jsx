import React, { Component, useState } from 'react';
import { S3FileUpload, uploadFile } from 'react-s3';
import axios from 'axios';
import Buffer from 'buffer';
window.Buffer = window.Buffer || require("buffer").Buffer;

const config = {
    bucketName: 'notforthieves',
    region: 'us-west-1',
    accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY
}

const ImageSimilarity = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [flag, setFlag] = useState(null);


    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        setFileName(e.target.file[0].name);
    }

    const handleUpload = async (file) => {
        console.log(config);

        const fNameData = {
            imgName: fileName,
            flaggedImage: flag //setup return for this type

        }

        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))

            // axios
        axios.post('http://localhost:5000/collections', fNameData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
            console.log("sent ");
                

        
    }

    return ( 
        <div className="imageSimilarity">
            <div className="imageSimilarityContainer">
                <input type="file" onChange={ handleFileInput } />
                <button onClick={ () => handleUpload(selectedFile) }>Upload</button>
            </div>
        </div>
    );
}

export default ImageSimilarity;