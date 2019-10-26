import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Expense = (props) => (
    <li class='list-group-item' style={{margin: '10px'}}>
        ${props.expense.amount}
        <h6>{props.expense.date.substring(0,10)}</h6>
        <span>
            <Link to={'/edit/' + props.expense._id}>Edit</Link> | <a href='#' onClick={() => {
                props.deleteExpense(props.expense._id)
            }}>Delete</a>
        </span>
        <br/>
        <span class='badge badge-dark'>{props.expense.category}</span>
    </li>
)

export default class ExpenseList extends Component {
    constructor(props){
        super(props);

        this.deleteExpense = this.deleteExpense.bind(this);

        this.state = { expenses: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/expenses')
            .then((res) => {
                this.setState({ expenses: res.data });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    ExpenseList(){
        return this.state.expenses.map((x) => {
            return <Expense expense={x} deleteExpense={this.deleteExpense} key={x._id}/>;
        });
    }

    deleteExpense(id){
        axios.delete('http://localhost:5000/expenses/' + id)
            .then((res) => {
                console.log(res.data);
            })
        this.setState({
            expenses: this.state.expenses.filter((ex) =>  ex._id !== id )
        });
    }

    render(){
        return (
            <div>
                <h2>Expenses</h2>
                <ul className='list-group'>
                    { this.ExpenseList() }
                </ul>
            </div>
        )
    }
}