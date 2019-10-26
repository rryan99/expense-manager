import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class createExpense extends Component {
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            amount: 0,
            category: [],
            date: new Date()
        }
    }

    onChangeEmail(e){
        this.setState({ email: e.target.value });
    }
    onChangeAmount(e){
        this.setState({ amount: e.target.value });
    }
    onChangeCategory(e){
        this.setState({ category: e.target.value });
    }
    onChangeDate(date){
        this.setState({ date: date });
    }

    onSubmit(e){
        e.preventDefault();

        const expense = {
            email: this.state.email,
            amount: this.state.amount,
            category: this.state.category,
            date: this.state.date
        }

        console.log(expense);

        window.location = '/';
    }

    render(){
        return (
            <div>
                <h2>New Expense</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Email: </label>
                        <input type='text' required className='form-control' value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className='form-group'>
                        <label>Amount: </label>
                        <input type='number' required className='form-control' value={this.state.amount} onChange={this.onChangeAmount}/>
                    </div>
                    <div className='form-group'>
                        <label>Category: </label>
                        <select ref='expenseDate' required className='form-control' value={this.state.category} onChange={this.onChangeCategory}>
                            {
                                this.state.category.map((category) => {
                                    return <option key={category} value={category}>
                                        {category}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Add Expense' className='btn btn-dark'/>
                    </div>
                </form>
            </div>
        )
    }
}