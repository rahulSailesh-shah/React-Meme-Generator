import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './ImageGallery.css'

function ImageGallery() {

    const [images, setImages] = useState([])

    useEffect(() => {
        const apiURL = 'https://api.imgflip.com/get_memes'
        fetch(apiURL)
            .then(res => res.json())
            .then(data => setImages(data.data.memes))
            .catch(err => console.log(err))
       
    }, [])

    return (
        <div className="gallery-wrapper">
            <div className="container">
                <h1 className='header'>Pick your image</h1>
                {
                images.map((image) => {
                    return (
                        <Link key={image.id}  to={{
                            pathname: `/image/${image.id}`,
                            meme_image: { image }
                        }}>
                            <img src={image.url} 
                                alt={image.name} 
                                className="img" 
                            />
                        </Link>   
                    )
                })
            }
            </div>
        </div>
    )
}

export default ImageGallery
