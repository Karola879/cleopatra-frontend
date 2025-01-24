import React from 'react';
import MapComponent from "./MapComponent";
import '../Styles/ContactInfoStyle.css';

export default function Contact() {
    return (
        <div className='contact-page'>
            <h2>SALON KOSMETYCZNY CLEOPATRA</h2>
            <p className="address">ul. Kaszubska 23, 44-100 Gliwice</p>
            
            <div className='contact-info'>
                <div className='contact'>
                    <h3>Dane kontaktowe</h3>
                    <ul>
                        <li><strong>Telefon:</strong> +48 123-456-789</li>
                        <li><strong>Email:</strong> cleopatra@gmail.com</li>
                    </ul>
                </div>

                <div className='hours'>
                    <h3>Godziny otwarcia</h3>
                    <ul>
                        <li><strong>Pon.-Pt.:</strong> 10:00-20:00</li>
                        <li><strong>Sobota:</strong> 10:00-15:00</li>
                    </ul>
                </div>

                <div className='socialmedia'>
                    <h3>Media społecznościowe</h3>
                    <ul>
                        <li><strong>Facebook:</strong> Cleopatra Beauty</li>
                        <li><strong>Instagram:</strong> Cleopatra Beauty</li>
                    </ul>
                </div>
            </div>
            
            <div className='map'>
                <MapComponent />
            </div>
        </div>
    )
}
