
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { CardComponent, Header, Label, LoadingComponent } from '../../components';
import { LinearProgress } from '@material-ui/core';
import { AppRepository } from '../../repositories/AppRepository';
import {
    Body, Container
} from './components/index';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const EMPTY_PROGRESS_TYPE = {
    _id: '',
    title: '',
    indexes: new Array<any>()
}

class ProgressScene extends Component<RouteComponentProps>{

    @resolve(AppRepository) private appRepo!: AppRepository

    state = {
        isLoading: true,
        progress: {
            totalPercentage: 0,
            progressTypes: new Array<any>()
        },
        currentlyOpenProgressType: {
            isOpen: false,
            progressType: EMPTY_PROGRESS_TYPE
        }
    }

    async componentDidMount() {
        const progress = await this.appRepo.getProgress()

        this.setState({ isLoading: false, progress })

    }

    openProgressType = (progressTypeId: string) => () => {
        const progressType = this.state
            .progress
            .progressTypes
            .find((progressType: any) => progressType._id === progressTypeId)

        this.setState({ currentlyOpenProgressType: { isOpen: true, progressType } })
    }


    render() {
        let { isLoading, progress, currentlyOpenProgressType } = this.state
        return (
            <>
                <Header
                    canGoBack={currentlyOpenProgressType.isOpen}
                    goBackTo={'progress'}
                    onGoBack={() => this.setState({ currentlyOpenProgressType: { isOpen: false, progressType: EMPTY_PROGRESS_TYPE } })}
                    title={currentlyOpenProgressType.isOpen ? currentlyOpenProgressType.progressType.title : 'Progresso'}
                />
                <Container>
                    <LoadingComponent show={isLoading} />
                    <Body style={{ padding: '3rem 2rem', margin: '4px 0' }}>
                        {(!isLoading && !currentlyOpenProgressType.isOpen) && progress &&
                            progress.progressTypes && progress.progressTypes.length > 0 &&
                            progress.progressTypes.map((progressType: any, index) => (
                                <CardComponent
                                    key={index}
                                    onClick={this.openProgressType(progressType._id)}
                                >
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        width: '100%'
                                    }}>
                                        <span style={{
                                            fontSize: 22
                                        }}>{progressType.title}</span>
                                        <ArrowForwardIcon />
                                    </div>
                                </CardComponent>
                            ))}
                        {(!isLoading && currentlyOpenProgressType.isOpen) && currentlyOpenProgressType.progressType &&
                            currentlyOpenProgressType.progressType.indexes.length > 0 &&
                            currentlyOpenProgressType.progressType.indexes.map((index: any, i) => (
                                <CardComponent key={i}>

                                    <h2 style={{
                                        textAlign: 'center'
                                    }}>
                                        {index.title}
                                    </h2>
                                    <div>
                                        <LinearProgress variant="determinate" value={index.percentage} />
                                        <span>{`${Math.round(
                                            index.percentage,
                                        )}%`}
                                        </span>
                                    </div>
                                    <div style={{
                                        marginTop: '1rem'
                                    }}>
                                        <Label>Comentários</Label>
                                        <p style={{ fontSize: '1rem', marginLeft: '0.5rem' }}>{index.description}</p>
                                    </div>
                                </CardComponent>
                            ))}
                    </Body>
                </Container>
            </>

        )
    }


}

export default withRouter(ProgressScene);