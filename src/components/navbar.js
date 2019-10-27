import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg" style={{borderRadius: 10}}>
        <Link to="/" className="navbar-brand">Expense Manager</Link>
        <div className="collapse navbar-collapse justify-content-end">
          <a href='#' className='text-decoration-none text-light'>Log out</a>
        </div>
      </nav>
    );
  }
}