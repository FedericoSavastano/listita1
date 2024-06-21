import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ShareComponent = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleShare = async () => {
        const data = localStorage.getItem('listElements');
        const encodedData = encodeURIComponent(JSON.stringify(data));
        const baseUrl = window.location.href;
        const shareableUrl = `${baseUrl}?data=${encodedData}`;

        console.log(shareableUrl);

        // try {
        //     const response = await axios.post(
        //         'https://api.tinyurl.com/create',
        //         {
        //             url: encodeURIComponent(shareableUrl),
        //             domain: 'tiny.one',
        //             description: 'string',
        //         },
        //         {
        //             headers: {
        //                 Authorization:
        //                     'Bearer {ZkMUOL2StHNJ76YHq3qhkWSz1gJi0BKbTF3m5tu5UmW5R6NOZFwexygKQCS7}', // Replace with your TinyURL API key
        //                 'Content-Type': 'application/json',
        //             },
        //         }
        //     );
        //     console.log(response.data.data.tiny_url);
        //     setShortUrl(response.data.data.tiny_url);
        // } catch (error) {
        //     console.error('Error creating short URL', error);
        // }

        const url = 'https://url-shortener42.p.rapidapi.com/shorten/';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key':
                    '0a00b49b3dmsh470ed428ca94fb5p1ee061jsne49e6e95f9d9',
                'x-rapidapi-host': 'url-shortener42.p.rapidapi.com',
                'Content-Type': 'application/json',
            },
            body: {
                url: shareableUrl,
                validity_duration: 5,
            },
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);

            setShortUrl(result);
        } catch (error) {
            console.error(error);
        }

        // You can use navigator.share if you want to use the Web Share API
        if (navigator.share) {
            navigator
                .share({
                    title: 'Share Data',
                    url: shortUrl,
                })
                .catch((error) => console.error('Error sharing', error));
        } else {
            // Fallback for browsers that don't support the Web Share API
            navigator.clipboard
                .writeText(shortUrl)
                .then(() => alert('Link copied to clipboard'))
                .catch((error) => console.error('Error copying link', error));
        }
    };

    return <Button onClick={handleShare}>Compartir Lista ↪︎ </Button>;
};

export default ShareComponent;
