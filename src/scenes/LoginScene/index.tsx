import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Card, Image } from 'antd'
import { Link } from 'react-router-dom'
import { TextField } from '../../components'
import { ButtonContainer, Container, DiagonalContainer, ErrorMessage, InputContainer, LogoContainer } from './components'
import AppService from '../../services/UserService'
import { resolve } from 'inversify-react'
import ReactLoading from 'react-loading';
import { Tabs } from '../../utils/tabs';
import Colors from '../../utils/colors'


const windowHeight = window.innerHeight
const windowWidth = window.innerWidth

class LoginScene extends Component<RouteComponentProps> {


    @resolve(AppService) private studentServ!: AppService

    state = {
        email: '',
        password: '',
        showError: false,
        isLoading: false
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        if (token != null) {
            this.props.history.replace('/home', { tab: Tabs.CONSTRUCTION})
        }
    }

    onSubmitLogin = async () => {
        this.setState({ isLoading: true })
        const { email, password } = this.state
        const isLogged = await this.studentServ.login({ email, password })
        if (isLogged) {
            this.props.history.replace('/home', { tab: Tabs.CONSTRUCTION})
        } else {
            localStorage.clear()
            this.setState({ showError: true })
        }
        this.setState({ isLoading: false })
    }

    onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: e.target.value })
    }

    onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ password: e.target.value })
    }

    render() {
        const { showError, isLoading } = this.state
        return (
            <Container>
                <DiagonalContainer></DiagonalContainer>
                <Card style={{
                    height: `${windowWidth < 768 ? '60%' : '70%'}`,
                    width: `${windowWidth < 768 ? '80%' : '50%'}`, borderRadius: '7px',
                    marginTop: `-${windowHeight < 920 ? '256' : windowHeight * 0.35}px`
                }} bodyStyle={{
                    display: 'flex',
                    height: '100%',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding: '16px',
                    backgroundColor: '#f3f9fe',
                    borderRadius: '7px'
                }}>
                    <LogoContainer><Image width={112} src={process.env.PUBLIC_URL + '/images/smartig.webp'} /></LogoContainer>
                    {showError && <ErrorMessage>E-mail ou senha incorretos</ErrorMessage>}
                    <InputContainer>
                        <TextField placeholder='Seu e-mail' type='email' onChange={this.onChangeEmail} />
                        <TextField placeholder='Sua senha' isPassword={true} onChange={this.onChangePassword} onSubmit={this.onSubmitLogin} />

                        <div style={{ width: '100%', textAlign: 'center' }}><Link to='/forgot-password'>Esqueci minha senha</Link></div>
                    </InputContainer>
                    <ButtonContainer>
                        <Button onClick={isLoading ? () => { } : this.onSubmitLogin} style={{ borderRadius: '8px', backgroundColor: Colors.primaryColor, borderColor: 'transparent', fontWeight: 'bold' }} size='large' type='primary'>{
                            isLoading ? <ReactLoading type='spin' color='#fff' height={24} width={24} /> :
                                'Entrar'
                        }</Button>
                    </ButtonContainer>
                </Card>
            </Container>
        )
    }

}

export default withRouter(LoginScene);