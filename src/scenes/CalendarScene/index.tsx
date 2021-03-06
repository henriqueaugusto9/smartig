
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
    Body,
    LogoutButton
} from './components/index';
import { Card } from 'antd';

// type Progress = {
//     title: string,
//     date: string,
//     percentage: string
// }



class CalendarScene extends Component<RouteComponentProps>{

    @resolve(StudentRepository) private studentRepo!: StudentRepository

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

    logout = () => {
        this.studentRepo.logout()
        this.props.history.replace('/login')
    }

    render() {
        // const { isLoading, progressDataSets } = this.state
        // const progress = this.studentRepo.progress!
        return (
            <>
                <Header title='Calendario' />
                <Container>
                    <Body>
                       <p>Calendario</p>
                    </Body>
                    <LogoutButton onClick={() => this.logout()}>Logout</LogoutButton>
                </Container>
            </>

        )
    }


}

export default withRouter(CalendarScene);