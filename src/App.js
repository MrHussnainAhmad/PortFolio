
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Home from './components/Home';
import Education from './components/Education';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [name, setName] = useState('');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Main setName={setName} />} />
                <Route path="/home" element={<Home name={name} />} />
                <Route path="/education" element={<Education  name = {name}/>} />
            </Routes>
        </Router>
    );
}

export default App;
