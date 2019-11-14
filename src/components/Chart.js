import axios from 'axios';
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class Chart extends Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.state = {};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/expenses')
            .then((res) => {
                //populate amounts
                const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(!data[res.data[i].category]){
                        data[res.data[i].category] = [];
                    }
                    data[res.data[i].category].push(res.data[i].amount);
                }

                //add amounts
                const amounts = [];
                amounts[0] = data['Food'].reduce((a, b) => a + b, 0);
                amounts[1] = data['Transportation'].reduce((a, b) => a + b, 0);
                amounts[2] = data['Entertainment'].reduce((a, b) => a + b, 0);
                amounts[3] = data['Misc'].reduce((a, b) => a + b, 0);

                for(let j = 0; j < amounts.length; j++){
                    amounts[j].toFixed(2);
                }

                //calculate total
                let total = amounts.reduce((a, b) => a + b, 0).toFixed(2);

                //set state
                this.setState({
                    total: total,
                    labels: ['Food', 'Transportation', 'Entertainment', 'Misc'],
                    datasets: [
                        {
                            backgroundColor: [
                            '#28A745', //food
                            '#007BFF', //transportation
                            '#FFC107', //entertainment
                            '#868E96' //misc
                            ],
                            hoverBackgroundColor: [
                            '#008627', //food
                            '#0061E0', //transportation
                            '#CC9500', //entertainment
                            '#687078' //misc
                            ],
                            data: amounts
                        }
                    ]
                });
            })
            .catch((err) => {
                console.log(err);
            })
        .catch(err => {
            console.log(err);
        })    
    }

    render(){
        return (
            <div>
                <h1 align='center'>${this.state.total}</h1>
                <Doughnut
                    data={this.state}
                    options={{
                        maintainAspectRatio: true,
                        title: {
                            display: true,
                            text: 'Money Spent'
                        }
                    }}
                />
            </div>
        )
    }
}