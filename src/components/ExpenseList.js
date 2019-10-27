import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Expense = (props) => (
    <li className='list-group-item d-flex flex-column' style={{margin: '5px'}}>
        <div className='d-flex' style={{lineHeight: 0}}>
            <div className='p-2 flex-grow-1'>
                <b>${props.expense.amount.toFixed(2)}</b>
            </div>
        </div>
        <div className='d-flex'>
            <div class='p-2 flex-grow-1'>{props.expense.desc}</div>
            <div class='p-2'>{props.expense.date.substring(0,10)}</div>
            <div class='p-2'>
                <Link to={'/update/' + props.expense._id}>Edit</Link> | <a href='#' onClick={() => {
                    props.deleteExpense(props.expense._id)
                }}>Delete</a>
            </div>
        </div>

        <div class='badge badge-secondary'>{props.expense.category}</div>
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