import axios from 'axios';
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            total: 0,
            labels: ['Food', 'Transportation', 'Entertainment', 'Misc'],
            datasets: []
        };
    }

    //calculate total spendings and categorial spendings
    chartCalc(){
        axios.get('http://localhost:5000/expenses')
            .then(res => {
                //categorial spendings
                const data = [];
                for(let i = 0; i < res.data.length; i++){
                    if(!data[res.data[i].category]){
                        data[res.data[i].category] = [];
                    }
                    data[res.data[i].category].push(res.data[i].amount);
                }

                //total spendings
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
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount(){
        this.chartCalc();
    }

    render(){
        this.chartCalc();
        return (
            <div style={{height: '600px'}}>
                <h1 align='center'>${this.state.total}</h1>
                <Doughnut
                    data={this.state}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
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