import axios from 'axios';
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

export default class Chart extends Component{
    constructor(props){
        super(props);

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
                const total = [];
                total[0] = data['Food'].reduce((a, b) => a + b, 0);
                total[1] = data['Transportation'].reduce((a, b) => a + b, 0);
                total[2] = data['Entertainment'].reduce((a, b) => a + b, 0);
                total[3] = data['Misc'].reduce((a, b) => a + b, 0);

                //set state
                this.setState({
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
                            data: total
                        }
                    ]
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render(){
        return (
            <div>
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