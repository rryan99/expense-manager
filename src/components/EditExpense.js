import axios from 'axios';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExpense extends Component {
    constructor(props){
        super(props);

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            desc: '',
            amount: 0,
            category: '',
            date: new Date()
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/expenses/' + this.props.match.params.id)
            .then((res) => {
                this.setState({
                    email: res.data.email,
                    desc: res.data.desc,
                    amount: res.data.amount,
                    category: res.data.category,
                    date: new Date(res.data.date)
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeEmail(e){
        this.setState({ email: e.target.value });
    }
    onChangeDesc(e){
        this.setState({ desc: e.target.value });
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
            desc: this.state.desc,
            amount: this.state.amount,
            category: this.state.category,
            date: this.state.date
        }

        console.log(expense);

        axios.post('http://localhost:5000/expenses/update/' + this.props.match.params.id, expense)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render(){
        return (
            <div>
                <h2>Edit Expense</h2>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <input type='hidden' required className='form-control' value={this.state.email} onChange={this.onChangeEmail}/>
                    </div>
                    <div className='form-group'>
                        <label>Description: </label>
                        <input type='text' required className='form-control' value={this.state.desc} onChange={this.onChangeDesc}/>
                    </div>
                    <div className='form-group'>
                        <label>Amount: </label>
                        <input type='number' required className='form-control' value={this.state.amount} onChange={this.onChangeAmount}/>
                    </div>
                    <div className='form-group'>
                        <label>Category: </label>
                        <select ref='expenseDate' required className='form-control' value={this.state.category} onChange={this.onChangeCategory}>
                            <option value='Food'>Food</option>
                            <option value='Transportation'>Transportation</option>
                            <option value='Entertainment'>Entertainment</option>
                            <option value='Misc'>Misc.</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Update' className='btn btn-dark'/>
                    </div>
                </form>
            </div>
        )
    }
}