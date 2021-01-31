
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Header } from '../../components';
import { StudentRepository } from '../../repositories/StudentRepository';
import Colors from '../../utils/colors';
import ReactLoading from 'react-loading';
import { Line } from 'react-chartjs-2';
import {
    CardTitle,
    ChartCard,
    Container,
    ScrollableCardBody, 
    Body
} from './components/index';
import { Card } from 'antd';

// type Progress = {
//     title: string,
//     date: string,
//     percentage: string
// }

const defaultDataSets = (label: string, color: string, data: Array<any>) => {
    return {
        label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: color,
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: color,
        pointBackgroundColor: color,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: color,
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data
    }
}


class FinancialScene extends Component<RouteComponentProps>{

    // @resolve(StudentRepository) private studentRepo!: StudentRepository

    // state = {
    //     isLoading: true,
    //     progressDataSets: new Array()
    // }

    async componentDidMount() {
        // const result = await this.studentRepo.getProgress()
        // if (result.progress != null && result.progress.length > 0) {
        //     let progressDataSets = result.progress.map((p: any) => {
        //         let dataSet = defaultDataSets(p.title, Colors.primaryColor, p.data)
        //         let chartData = {
        //             labels: p.data.map(() => ''),
        //             datasets: [
        //                 dataSet
        //             ]
        //         };
        //         return { title: p.title, data: chartData }
        //     })

        //     this.setState({ isLoading: false, progressDataSets })
        // } else {
        //     this.props.history.replace('/login')
        // }
    }


    render() {
        // const { isLoading, progressDataSets } = this.state
        // const progress = this.studentRepo.progress!
        return (
            <>
                <Header title='Financeiro' />
                <Container>
                    <Body>
                       <p>Financeiro</p>
                    </Body>
                </Container>
            </>

        )
    }


}

export default withRouter(FinancialScene);