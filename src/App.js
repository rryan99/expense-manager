import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import createExpense from './components/createExpense';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
      <div className="container-fluid" style={{paddingTop: '20px'}}>
        <Navbar/>
        <div className='container'>
          <br/>
          <Route path='/create' exact component={createExpense}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
