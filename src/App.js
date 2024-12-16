import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './DashBoard/DashBoard';
import AddDNSForm from './Forms/AddDNSForm';
import EditDNSForm from './Forms/EditDNSForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
            <div>
              <Dashboard/>
            </div>
        } 
        />
        <Route path="/newDNS" element={
            <div>
              <AddDNSForm/>
            </div>
        } />
        <Route path={`/editDNS/:id`} element={
          <div>
            <EditDNSForm/>
          </div>
        }/>
      </Routes>
    </Router>
  );
}

export default App;
