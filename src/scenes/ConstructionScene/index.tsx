
import { resolve } from 'inversify-react';
import _ from 'lodash';
import React, { Component } from 'react';
import { StaticContext, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {
    Body, CardComponent, Header, InputColumn, InputRow, Label,
    LoadingComponent,
    SubmitButton
} from '../../components';
import { EMPTY_CONSTRUCTION } from '../../model';
import { AppRepository } from '../../repositories/AppRepository';
import {
    ValueText
} from './components/';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

type LocationState = {
    url: string
}

class ConstructionScene extends Component<RouteComponentProps<{}, StaticContext, LocationState>>{

    @resolve(AppRepository) private appRepo!: AppRepository

    state = {
        isLoading: true,
        id: '',
        construction: EMPTY_CONSTRUCTION,
        isCardOpen: false
    }

    async componentDidMount() {


        const constructions = await this.appRepo.getConstructionData()
        if (constructions !== null) {
            this.setState({ isLoading: false, construction: constructions })
        } else {
            this.appRepo.logout()
            this.props.history.replace('/login')
        }
    }

    openPdfLink = (url: string) => {
        this.props.history.push({ pathname: `/showPdf/`, state: { url: url } })
    }

    render() {
        const { isLoading, construction, isCardOpen } = this.state
        return (
            <>
                <Header
                    title={'Dados da obra'}
                />
                <Body style={{ padding: '16px 16px' }}>

                    <LoadingComponent show={isLoading} />
                    {!isLoading && <><CardComponent>
                        <InputColumn>
                            <Label>
                                Endereço:
                            </Label>
                            <ValueText>{_.get(construction, 'endereco')}</ValueText>
                        </InputColumn>
                    </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Lote:
                                </Label>
                                <ValueText>{_.get(construction, 'lote')}</ValueText>
                            </InputColumn>

                        </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Quadra:
                                </Label>
                                <ValueText>{_.get(construction, 'quadra')}</ValueText>
                            </InputColumn>

                        </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Proprietário:
                                </Label>
                                <ValueText>{_.get(construction, 'proprietario')}</ValueText>
                            </InputColumn>

                        </CardComponent>
                        <CardComponent>
                            <InputColumn>
                                <Label>
                                    Início Contrato:
                                </Label>
                                <ValueText>{_.get(construction, 'inicioContrato')}</ValueText>
                            </InputColumn>

                        </CardComponent>

                        {_.get(construction, 'docs.ART') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.ART'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Art: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }{_.get(construction, 'docs.matricula') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.matricula'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Matrícula: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }{_.get(construction, 'docs.relContribuinte') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.relContribuinte'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Rel Contribuinte: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }
                        {_.get(construction, 'docs.alana') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.alana'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Alana </Label>
                                    <ArrowForwardIcon />
                                </InputRow>

                            </CardComponent>
                        }
                        {_.get(construction, 'docs.habiteSe') !== '' &&
                            <CardComponent onClick={() => this.openPdfLink(_.get(construction, 'docs.habiteSe'))}>
                                <InputRow style={{ justifyContent: 'space-between' }}>
                                    <Label>Habite-se: </Label>
                                    <ArrowForwardIcon />
                                </InputRow>
                            </CardComponent>
                        }
                    </>}

                    <SubmitButton 
                    style={{ marginTop: 64 }}
                    onClick={() => {
                        this.appRepo.logout()
                        this.props.history.replace('/login')
                    }}
                    >
                        Logout
                    </SubmitButton>
                </Body>
            </>
        )
    }
}

export default withRouter(ConstructionScene);