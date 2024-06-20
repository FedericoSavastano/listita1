import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ShareComponent = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleShare = async () => {
        const data = localStorage.getItem('listElements');
        const encodedData = JSON.stringify(data);
        const baseUrl = window.location.href;
        const shareableUrl = `${baseUrl}?data=${encodedData}`;

        try {
            const response = await axios.post(
                'https://api.rebrandly.com/v1/links',

                {
                    destination: shareableUrl,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': '1ca5562359c6422783f32afa84fa8549',
                    },
                }
            );
            console.log(response.data.shortUrl);
        } catch (err) {
            console.log('Error shortening the URL: ' + err.message);
        }

        // You can use navigator.share if you want to use the Web Share API
        if (navigator.share) {
            navigator
                .share({
                    title: 'Share Data',
                    url: shareableUrl,
                })
                .catch((error) => console.error('Error sharing', error));
        } else {
            // Fallback for browsers that don't support the Web Share API
            navigator.clipboard
                .writeText(shareableUrl)
                .then(() => alert('Link copied to clipboard'))
                .catch((error) => console.error('Error copying link', error));
        }
    };

    return <Button onClick={handleShare}>Compartir Lista ↪︎ </Button>;
};

export default ShareComponent;
