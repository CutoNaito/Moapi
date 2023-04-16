import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Home() {
    return (
        <div>
            <Header />
            <div className='home'>
                <h1>What is Moapi?</h1>
                <p>
                    Have you ever wondered why is it so difficult to send a request through browser? Say no more!
                    Moapi is a solution for that, providing a simple, user-friendly application, in which you can send
                    any kind of request. Moapi runs nativly both on Windows and Linux.

                    Alongside with the app, Moapi comes with a website that tracks your send requests, so you can control them
                    very easily.
                </p>
                <h2>Get Moapi on GitHub</h2>
                <img src="https://cdn.discordapp.com/attachments/713470791056097384/1097244686571294801/qr.png"></img>
            </div>
            <Footer />
        </div>
    );
}