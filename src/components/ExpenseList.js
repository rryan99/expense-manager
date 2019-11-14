import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Chart from './Chart';

const Expense = (props) => (
    <li className='list-group-item d-flex flex-column' style={{margin: '5px'}}>
        <div className='d-flex' style={{lineHeight: 0}}>
            <div className='p-2 flex-grow-1'>
                <b>${props.expense.amount.toFixed(2)}</b>
            </div>
        </div>
        <div className='d-flex'>
            <div className='p-2 flex-grow-1'>{props.expense.desc}</div>
            <div className='p-2'>{props.expense.date.substring(0,10)}</div>
            <div className='p-2'>
                <Link to={'/update/' + props.expense._id}>✏️</Link> <a href='#' onClick={() => {
                    props.deleteExpense(props.expense._id)
                }}>🗑️</a>
            </div>
        </div>
        {
            (() => {
                switch(props.expense.category){
                    case 'Food': return <div className='badge badge-success'>Food</div>
                    case 'Transportation': return <div className='badge badge-primary'>Transportation</div>
                    case 'Entertainment': return <div className='badge badge-warning'>Entertainment</div>
                    case 'Misc': return <div className='badge badge-secondary'>Misc.</div>
                }
            })()
        }
    </li>
)

export default class ExpenseList extends Component {
    constructor(props){
        super(props);
        this.deleteExpense = this.deleteExpense.bind(this);

        this.state = { expenses: [] };
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

    deleteExpense(id){
        axios.delete('http://localhost:5000/expenses/' + id)
            .then((res) => {
                console.log(res.data);
                axios.get('http://localhost:5000/expenses')
                    .then(res => {
                        this.setState({ expenses: res.data });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            })
        console.log(this.state);
    }

    ExpenseList(){
        return this.state.expenses.map((x) => {
            return <Expense expense={x} deleteExpense={this.deleteExpense} key={x._id}/>;
        });
    }
    
    render(){
        return (
            <div className='row'>
                <div className='col-sm-6 align-self-center'>
                    <Chart />
                </div>
                <div className='col-sm-6'>
                    <h2>
                        Expenses &nbsp;
                        <Link to='/add'>
                            <button type='button' className='btn btn-secondary btn-sm' style={{marginBottom: 5}}>+</button>
                        </Link>
                    </h2>
                    <hr/>
                    <ul className='list-group'>
                        { this.ExpenseList() }
                    </ul>
                </div>
            </div>
        )
    }
}