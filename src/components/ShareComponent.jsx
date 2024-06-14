import React from 'react';

const ShareComponent = () => {
    const handleShare = () => {
        const data = localStorage.getItem('listElements');

        const encodedData = encodeURIComponent(JSON.stringify(data));
        const baseUrl = window.location.href || 'https://yourapp.com/share';
        const shareableUrl = `${baseUrl}?data=${encodedData}`;

        console.log('sh', location.search);

        const params = new URLSearchParams(location.search);
        const encodedDataB = params.get('data');

        if (encodedData) {
            try {
                const decodedData = JSON.parse(
                    decodeURIComponent(encodedDataB)
                );
                console.log('encoded data b', encodedDataB);
                // setData(decodedData);
            } catch (error) {
                console.error('Error decoding data', error);
            }
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

    return <button onClick={handleShare}>Share Data</button>;
};

export default ShareComponent;
