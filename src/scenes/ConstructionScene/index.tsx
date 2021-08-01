
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { Card } from 'antd';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import ReactLoading from 'react-loading';
import { StaticContext, withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import {
    CardComponent,
    Divider,
    InputRow,
    Label,
    LoadingComponent
} from '../../components';
import { EMPTY_CONSTRUCTION } from '../../model';
import { AppRepository } from '../../repositories/AppRepository';
import Colors from '../../utils/colors';
import {
    Body, ValueText, ValueLink
} from './components/';
import _ from 'lodash'

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
        if (constructions != null) {
            this.setState({ isLoading: false, construction: constructions })
        } else {
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

                <LoadingComponent show={isLoading} />
                <Body style={{ padding: '16px 16px' }}>



                    {!isLoading && <CardComponent
                        style={{
                            marginTop: '16px',
                            width: '100%',
                            borderRadius: '7px',
                            boxShadow: "5px 4px 2px 0.5px rgba(208, 216, 243, 0.6)",
                        }}
                        bodyStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '16px 16px 16px 16px',
                            height: '100%'
                        }}
                    >
                        <InputRow>
                            <Label>
                                Endereço:
                            </Label>
                            <ValueText>{_.get(construction, 'endereco')}</ValueText>
                        </InputRow>

                        <InputRow>
                            <Label>
                                Lote:
                            </Label>
                            <ValueText>{_.get(construction, 'lote')}</ValueText>
                        </InputRow>

                        <InputRow>
                            <Label>
                                Quadra:
                            </Label>
                            <ValueText>{_.get(construction, 'quadra')}</ValueText>
                        </InputRow>
                        <InputRow>
                            <Label>
                                Proprietário:
                            </Label>
                            <ValueText>{_.get(construction, 'proprietario')}</ValueText>
                        </InputRow>
                        <InputRow>
                            <Label>
                                Início Contrato:
                            </Label>
                            <ValueText>{_.get(construction, 'inicioContrato')}</ValueText>
                        </InputRow>

                        {isCardOpen && <><Divider />
                            <Label style={{ fontSize: '16px' }}>ANEXOS</Label>

                            <InputRow>
                                <Label>Art: </Label>
                                <ValueLink onClick={() => this.openPdfLink(_.get(construction, 'docs.ART'))}>
                                    {_.get(construction, 'docs.ART')}
                                </ValueLink>
                            </InputRow>
                            <InputRow>
                                <Label>Matrícula: </Label>
                                <ValueLink onClick={() => this.openPdfLink(_.get(construction, 'docs.matricula'))}>
                                    {_.get(construction, 'docs.matricula')}
                                </ValueLink>
                            </InputRow>
                            <InputRow>
                                <Label>Rel Contribuinte: </Label>
                                <ValueLink onClick={() => this.openPdfLink(_.get(construction, 'docs.relContribuinte'))}>
                                    {_.get(construction, 'docs.relContribuinte')}
                                </ValueLink>
                            </InputRow>
                            <InputRow>
                                <Label>Alana </Label>
                                <ValueLink onClick={() => this.openPdfLink(_.get(construction, 'docs.alana'))}>
                                    {_.get(construction, 'docs.alana')}
                                </ValueLink>
                            </InputRow>
                            <InputRow>
                                <Label>Habite-se: </Label>
                                <ValueLink onClick={() => this.openPdfLink(_.get(construction, 'docs.habiteSe'))}>
                                    {_.get(construction, 'docs.habiteSe')}
                                </ValueLink>
                            </InputRow>
                        </>}
                        <InputRow style={{ justifyContent: 'center', padding: 0, marginBottom: '-16px' }}>
                            <div onClick={() => this.setState({ isCardOpen: !isCardOpen })}>
                                {isCardOpen ? <KeyboardArrowUp style={{ fontSize: 32 }} /> : <KeyboardArrowDown style={{ fontSize: 32 }} />}
                            </div>
                        </InputRow>
                    </CardComponent>}
                </Body>
            </>
        )
    }
}

export default withRouter(ConstructionScene);