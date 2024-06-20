import React from 'react';
import ShareComponent from './ShareComponent';
import ResetComponent from './ResetComponent';

function Footer({ resetData }) {
    return (
        <div className='footer'>
            <div className='footer-buttons'>
                <ResetComponent resetData={resetData}></ResetComponent>
                <ShareComponent></ShareComponent>
            </div>
            <div className='footer-signature'>
                `Made with ✔ by `
                <a href='https://federicosavastano.netlify.app'>
                    Federico Savastano
                </a>
            </div>
        </div>
    );
}

export default Footer;
