import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Link to='/'>Listitas Linditas</Link>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
