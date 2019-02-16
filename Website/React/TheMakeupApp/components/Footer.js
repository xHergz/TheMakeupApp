import React from 'react';

import '../../../Css/Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div>
                <a href="/terms-of-service">Terms of Service</a>
            </div>
            <div>
                &copy; The Makeupp App
            </div>
            <div>
                <a href="/privacy-policy">Privacy Policy</a>
            </div>
        </div>
    );
};

export default Footer;
