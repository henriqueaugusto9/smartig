import React from 'react';
import styled from 'styled-components';
import { CardComponent } from '../../../components';
import Colors from '../../../utils/colors';

export const Container = styled.div`
    display: flex;
    position: fixed;
    top: 69px;
    bottom: 56px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 0 16px 56px 16px;
    padding: 32px 0 32px 0;
    overflow-y: scroll;
`

export const ProgressHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify: 'center';
    margin-bottom: 16px;
    height: 70px;
    background: ${Colors.primaryColor};
`

export const CardTitle = styled.div`
    font-size: 24px;
    font-weight: bold;
    padding: 0 0 16px 0;
`

export const ScrollableCardBody = styled.div`
    height: 100%;
    width: 100%;
    overflow-y: scroll;
    padding: 32px 0 16px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    ::-webkit-scrollbar {
        width: 0px;
    }
`

export const ChartCard: React.FC = (props) => {
    return <CardComponent
        style={{
            width: '90%',
            borderRadius: '7px',
            backgroundColor: '#fff',
            margin: '16px 0 16px 0'
        }}
        bodyStyle={{
            width: '100%',
            padding: '8px 16px 8px 16px',
            height: '100%',
            color: Colors.primaryColor
        }}
    >
        {props.children}
    </CardComponent>
} 