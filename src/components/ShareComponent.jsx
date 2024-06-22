import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const ShareComponent = () => {
    const handleShare = async () => {
        const data = localStorage.getItem('listElements');

        const encodedData = encodeURIComponent(data);
        const baseUrl = window.location.href;
        const shareableUrl = `${baseUrl}?data=${encodedData}`;
        let shortUrl;

        try {
            const response = await axios.post(
                'https://shrtlnk.dev/api/v2/link',
                {
                    url: shareableUrl,
                },
                {
                    headers: {
                        'api-key':
                            'aE4YqwzJsAQlAmz708ay5vOpiE2MtPk90E3QlKvZUGmrz',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }
            );

            shortUrl = response.data.shrtlnk;
            console.log(response.data.shrtlnk);
        } catch (error) {
            console.error('Error creating short URL', error);
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

    return <Button onClick={handleShare}>Compartir ↪</Button>;
};

export default ShareComponent;
