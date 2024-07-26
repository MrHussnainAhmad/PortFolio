
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import Education from './components/Education';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Indev from './components/indev';

function App() {
    const [name, setName] = useState('');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main setName={setName} />} />
                <Route path="/home" element={<Home name={name} />} />
                <Route path="/education" element={<Education  name = {name}/>} />
                <Route path="/contact" element={<Contact  name = {name}/>} />
                <Route path="/projects" element={<Projects  name = {name}/>} />
                <Route path="/indev" element={<Indev  name = {name}/>} />
            </Routes>
        </Router>
    );
}

export default App;
