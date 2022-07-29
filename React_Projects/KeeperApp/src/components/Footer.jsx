import React from "react";

let date = new Date();
let CurrentYear = date.getFullYear();

function Footer() {
    return (
        <footer>
            <p>Copyright {CurrentYear}</p>
        </footer>
    );
}

export default Footer;
