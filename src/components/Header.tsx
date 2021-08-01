import React from 'react';
import styled from 'styled-components'
import { Add, ChevronLeft } from '@material-ui/icons'
import Colors from '../utils/colors';
import { useHistory } from 'react-router-dom';
import { Tabs } from '../utils/tabs';
import { FaWhatsapp } from 'react-icons/fa';

export const Container = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
`

export const HeaderTitle = styled.span`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`

export const CenteredTitle = styled.span`
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
`

interface HeaderProps {
    backgroundColor?: string
    canGoBack?: boolean
    goBackTo?: string
    onGoBack?: () => void
    color?: string
    title: string
    suffixComponent?: JSX.Element
}

export const Header: React.FC<HeaderProps> = (
    { backgroundColor = Colors.primaryColor,
        color = '#fff',
        canGoBack = false,
        goBackTo,
        onGoBack = () => { },
        title,
        suffixComponent = <a href='whatsapp://send?phone=5516991934303' style={{ width: 32, height: 32 }}>
            <FaWhatsapp style={{ color: '#fff', fontSize: 32 }} />
            </a> 
    }
) => {

    const history = useHistory()

    const goBack = () => {
        onGoBack()
        if (goBackTo != null) {
            let tab = Tabs.CONSTRUCTION
            switch (goBackTo) {
                case 'home':
                    tab = Tabs.CONSTRUCTION
                    break;
                case 'review':
                    tab = Tabs.PROGRESS
                    break;
                case 'progress':
                    tab = Tabs.FINANCIAL
                    break;
                case 'profile':
                    tab = Tabs.CALENDAR
                    break;
                default:
                    tab = Tabs.CONSTRUCTION
                    break
            }
            history.replace('home', { tab })
        } else {
            history.goBack()
        }
    }

    return <Container id="header" style={{ backgroundColor }}>
        {canGoBack && <ChevronLeft onClick={() => goBack()} style={{
            fontSize: '40px', fontWeight: 'bold', color: color,
        }} />}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <HeaderTitle style={canGoBack || !suffixComponent ? { marginRight: '40px' } : suffixComponent ? { marginLeft: '40px' } : {}}>{title}</HeaderTitle>
        </div>
        {suffixComponent != null && suffixComponent}
    </Container>
}



