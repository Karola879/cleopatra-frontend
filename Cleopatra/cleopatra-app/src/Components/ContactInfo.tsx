import React from 'react';
import MapComponent from "./MapComponent";

export default function Contact() {
    return (
        <div>
            <h2>SALON KOSMETYCZNY CLEOPATRA</h2>
            <p>
                ul. Kaszubska 23, 44-100 Gliwice
            </p>
            <div>
                <p>Dane kontaktowe</p>
                <ul>
                    <li>+48 123-456-789</li>
                    <li>cleopatra@gmail.com</li>
                </ul>
            </div>
            <div>
                <p>Godziny otwarcia</p>
                <ul>
                    <li>Pon.-Pt. 9:00-19:00</li>
                    <li>Sobota: 9:00-15:00</li>
                </ul>
            </div>
            <div>
                <p>Media społeczościowe</p>
                <ul>
                    <li>Facebook - Cleopatra Beauty</li>
                    <li>Instagram - Cleopatra Beauty</li>
                </ul>
            </div>
            <div>
               <MapComponent/>
            </div>
        </div>
    )
}