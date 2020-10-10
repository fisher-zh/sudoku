import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './views/home';
import About from './views/about';

function App() {
  return (
    <div className="containter">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Router>
    </div>
  );
}

export default App;
