import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import StructureInput from './pages/StructureInput';

const Home = () => <h2 style={{ textAlign: 'center' }}>🏠 Welcome to Structural Analysis</h2>;
const Analysis = () => <h2 style={{ textAlign: 'center' }}>📊 Structural Analysis Page</h2>;
const Results = () => <h2 style={{ textAlign: 'center' }}>📑 Analysis Results</h2>;

function App() {
    return (
        <Router> {/* Wrap everything inside Router */}
            <Navbar />
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analysis" element={<Analysis />} />
                <Route path="/results" element={<Results />} />
                <Route path="/structure-input" element={<StructureInput />} />
            </Routes>
        </Router>
    );
}

export default App;
