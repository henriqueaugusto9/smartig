
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { Header, LoadingComponent } from '../../components';
import { AppRepository } from '../../repositories/AppRepository';
import {
    Body, Container
} from './components/index';

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

    @resolve(AppRepository) private appRepo!: AppRepository


    state = {
        isLoading: true,
        url: ''
    }


    async componentDidMount() {
        const finance = await this.appRepo.getFinance()
        if (finance != null) {
            this.setState({ isLoading: false, url: finance.link })
        } else {
            this.props.history.replace('/login')
        }
    }


    render() {
        const { isLoading, url } = this.state

        const parsedUrl = url.replace('spreadsheets/d', 'spreadsheets/d/e')
        .replace(/edit(.*)/, 'pubhtml?widget=true&amp;headers=false')

        console.log(parsedUrl)
        return (
            <>
                <LoadingComponent show={isLoading} />
                {!isLoading && <iframe
                    src={parsedUrl}
                    style={{ width: '100%', height: '100%', overflowY: 'hidden' }}
                />}
            </>

        )
    }


}

export default withRouter(FinancialScene);