import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { CalendarToday, Home, TrendingUp, MenuBook, Business, MonetizationOn } from '@material-ui/icons';
import { resolve } from 'inversify-react';
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { StudentRepository } from '../../repositories/StudentRepository';
import Colors from '../../utils/colors';
import { Tabs } from '../../utils/tabs';
import HomeScene from '../ProgressScene';
import CalendarScene from '../CalendarScene';
import ProgressScene from '../ProgressScene';
import ConstructionScene from '../ConstructionScene';
import FinancialScene from '../FinancialScene';

const windowHeight = window.innerHeight

class TabBarScene extends Component<RouteComponentProps> {

    state = {
        tab: Tabs.CONSTRUCTION
    }

    @resolve(StudentRepository) private studentRepo!: StudentRepository

    onChangeTab = async (e: React.ChangeEvent<{}>, tab: Tabs) => {
        await this.studentRepo.setTab(tab)
        this.setState({ tab })
    }

    render() {
        const tab = this.studentRepo.tab!
        return <div style={{ height: windowHeight }}>
            <BottomNavigation
                value={tab}
                showLabels
                onChange={this.onChangeTab}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    borderTop: '3px solid #f3f3f3',
                    backgroundColor: '#fff',
                }}
            >
                <BottomNavigationAction label="Obra" value={Tabs.CONSTRUCTION} icon={<Business />} />
                <BottomNavigationAction label="Progresso" value={Tabs.PROGRESS} icon={<TrendingUp />} />
                <BottomNavigationAction label="Financeiro" value={Tabs.FINANCIAL} icon={<MonetizationOn />} />
                <BottomNavigationAction label="Calendario" value={Tabs.CALENDAR} icon={<CalendarToday />} />
            </BottomNavigation>
            {tab === Tabs.CONSTRUCTION && <ConstructionScene>

            </ConstructionScene>
            }
            {tab === Tabs.PROGRESS && <ProgressScene>

            </ProgressScene>
            }
            {tab === Tabs.FINANCIAL && <FinancialScene>

            </FinancialScene>
            }
            {tab === Tabs.CALENDAR && <CalendarScene>

            </CalendarScene>}
        </div>
    }
}

export default withRouter(TabBarScene)