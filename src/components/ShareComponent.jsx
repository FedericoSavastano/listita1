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
            // const response = await fetch(
            //     // 'https://api-ssl.bitly.com/v4/shorten',
            //     // 'https://api.encurtador.dev/encurtamentos',
            //     //'csclub.uwaterloo.ca/~phthakka/1pt-express',
            //     'https://smolurl.com/api/links',
            //     {
            //         // mode: 'no-cors',
            //         method: 'POST',
            //         headers: {
            //             // 'Authorization':
            //             //     'Bearer {2d021adf0113b47ca73d886f06c79d5256c8fd30}',

            //             'Content-Type': 'application/json',
            //         },
            //         // body: JSON.stringify({
            //         //     'long_url': shareableUrl,
            //         //     'domain': baseUrl,
            //         //     // 'group_guid': 'Ba1bc23dE4F',
            //         // }),
            //         body: {
            //             'url': shareableUrl,
            //         },
            //     }
            // );

            // const result = await response.json();
            // console.log('Success:', result);

            const response = await axios.post(
                'https://api-ssl.bitly.com/v4/shorten',
                {
                    long_url: shareableUrl,
                },
                {
                    headers: {
                        Authorization:
                            'Bearer {2d021adf0113b47ca73d886f06c79d5256c8fd30}',
                        'Content-Type': 'application/json',
                    },
                }
            );
            setShortUrl(response.data.link);

            console.log('Success:', response.data.link);
        } catch (error) {
            console.error('Error:', error);
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
