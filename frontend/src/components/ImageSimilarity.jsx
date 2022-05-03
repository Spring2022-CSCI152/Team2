import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/imageSimilarity.css';
//import buffer from 'buffer';
//window.Buffer = window.Buffer || require("buffer").Buffer;

const ImageSimilarity = () => {
    const [imageOne, setImageOne] = useState('https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png');
    const [imageTwo, setImageTwo] = useState('https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png');
    const [similarity, setSimilarity] = useState('');

    const handleImageOne = (e) => {
        let data = new FormData();
        data.append('myImage', e.target.files[0]);
        axios.post('http://localhost:5000/uploadSingle', data).then(res => { setImageOne(res.data) });
    }

    const handleImageTwo = (e) => {
        let data = new FormData();
        data.append('myImage', e.target.files[0]);
        axios.post('http://localhost:5000/uploadSingle', data).then(res => { setImageTwo(res.data) });
    }

    const computeSimilarity = () => {
        let data = {
            imageOne: imageOne,
            imageTwo: imageTwo
        }
        axios.get('http://localhost:5000/app/computeSimilarity', { params: data })
            .then(res => { setSimilarity(res.data) });
    }

    return ( 
        <div className="imageSimilarity">
            <div className="imageSimilarityContainer">
                <div className="image1">
                    <img1 src={imageOne} alt="imageOne" />
                    <input type="file" onChange={handleImageOne} />
                </div>
                <div className="image2">
                    <img1 src={imageTwo} alt="imageTwo" />
                    <input type="file" onChange={handleImageTwo} />
                </div>
            </div>
            <div className="imageSimilarityResult">
                <button onClick={ computeSimilarity }>Compute Similarity</button>
                <p>Result: {similarity} </p>
            </div>
        </div>
    );
}

export default ImageSimilarity;