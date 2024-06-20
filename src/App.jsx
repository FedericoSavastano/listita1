import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Link to='/' className='title'>
                <div>Listitas Linditas</div>
            </Link>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;
