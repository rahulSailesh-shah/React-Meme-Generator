import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useClipboard} from 'use-clipboard-copy'

import './MemeGenerate.css'

function MemeGenerate(props) {
    const clipboard = useClipboard()

    const [image, setImage] = useState(null)
    const [memeImage, setMemeImage] = useState(null)
    const [copied, setCopied] = useState(false)
    const [captions, setCaptions] = useState([])


    useEffect(() => {
        if(props.location.meme_image){
            const {image} = props.location.meme_image
            localStorage.setItem('image', JSON.stringify(image))
            setImage(image)
            setCaptions(Array(image.box_count).fill(""))
        }else {
            const savedImage = JSON.parse(localStorage.getItem('image'))
            setImage(savedImage)
            setCaptions(Array(savedImage.box_count).fill(""))
        }
    }, [props.location.meme_image])

    function handleCaptionChange(index, event) {
        setCaptions(
            captions.map((caption, ind) => {
                if(ind === index) return event.target.value
                else return caption
            })
        )
    }

    function copyURL() {
        clipboard.copy(memeImage.url)
        setCopied(true)
    }

    function handleMemeGenerate() {
        const apiURL = 'https://api.imgflip.com/caption_image'

        const formData = new FormData()
        formData.append('username', 'Rahul_Shah')
        formData.append('password','max32eip')
        formData.append('template_id', image.id)
        captions.forEach((c, index) => formData.append(`boxes[${index}][text]`, c))

        fetch(apiURL, {
            method: 'POST',
            body: formData
        }).then(res => res.json())
          .then(data => setMemeImage(data.data))
          .catch(err => console.log(err))
    }

    const download = e => {
        console.log(e.target.href);
        fetch(e.target.href, {
          method: "GET",
          headers: {}
        })
          .then(response => {
            response.arrayBuffer().then(function(buffer) {
              const url = window.URL.createObjectURL(new Blob([buffer]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", "image.png"); //or any other extension
              document.body.appendChild(link);
              link.click();
            });
          })
          .catch(err => {
            console.log(err);
          });
      };

    if(!image) return <h1>Loading...</h1>

    return (
        <div className="meme-container">
            <Link to='/' className="back btn">Back to Images.</Link>
            {
                memeImage ? (
                    <div className='caption-container'>
                        <img src={memeImage.url} alt="meme" className='image' />
                        <button className="generate btn" onClick={copyURL}>{copied ? 'Link Copied!' : 'Copy Link'}</button>
                        <a href={memeImage.url} className="download btn" download onClick={(e) => download(e)}>Download Meme.</a>
                    </div>
                   
                ) : (
                    <>
                    <div className='caption-container'>
                    {
                        captions.map((caption, index) => (
                            <input  
                            key={index} 
                            type="text" 
                            placeholder="Enter Caption"
                            className="caption-input"
                            onChange={(event) => handleCaptionChange(index, event)}
                            />
                        ))
                    }
                    </div>
                    <div className='image-container'>
                        <h3 className="caption-header">{image.name}</h3>
                        <img className="image" src={image.url} alt={image.name} />
                    </div>
                    <button className="generate btn" style={{"marginBottom": 20}} onClick={handleMemeGenerate}>Generate Meme!</button>
                    </>
                )
            }
            
            
            
        </div>
    )
}

export default MemeGenerate
