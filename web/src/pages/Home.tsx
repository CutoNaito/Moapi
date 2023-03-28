import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Home() {
    return (
        <div className="home">
            <Header />
            <h1>Home</h1>
            <p>Home page</p>
            <Footer />
        </div>
    );
}