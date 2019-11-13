import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import EditExpense from './components/EditExpense';

function App() {
  return (
    <Router>
      <div className="container-fluid" style={{paddingTop: '20px'}}>
        <Navbar/>
        <div className='container-fluid'>
          <br/>
          <Route path='/' exact component={ExpenseList}/>
          <Route path='/add' component={AddExpense}/>
          <Route path='/update/:id' component={EditExpense}/>
        </div>
      </div>
    </Router>
  );
}

export default App;
