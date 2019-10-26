import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddExpense from './components/AddExpense';
import Navbar from './components/Navbar';
import ExpenseList from './components/ExpenseList';

function App() {
  return (
    <Router>
      <div className="container-fluid" style={{paddingTop: '20px'}}>
        <Navbar/>
        <div className='container'>
          <br/>
          <Route path='/' exact component={ExpenseList}/>
          <Route path='/add' component={AddExpense}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
