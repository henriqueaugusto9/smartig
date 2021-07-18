import { detect } from 'detect-browser';
import { injectable } from 'inversify';
import { AnyKindOfDictionary } from 'lodash';
import { Container } from 'unstated';
import ConstructionAPI from '../api/construction';
import FinanceAPI from '../api/finance';
import HomeAPI from '../api/home';
import ProfileAPI from '../api/profile';
import ProgressAPI from '../api/progress';
import ReviewAPI from '../api/review';
import { EMPTY_CONSTRUCTION } from '../model';
import { Tabs } from '../utils/tabs';

const browser = detect()

type AppRepositoryState = {
    user: any | null,
    progress: any | null,
    reviews: Array<any> | null,
    token: string | null,
    construction: any,
    finance: any,
    tab: Tabs,
}

type GetReviewsParams = {
    forceUpdate?: boolean
}


@injectable()
export class AppRepository extends Container<AppRepositoryState> {
    readonly state: AppRepositoryState = {
        user: null,
        token: null,
        progress: null,
        reviews: null,
        finance: null,
        construction: EMPTY_CONSTRUCTION,
        tab: Tabs.CONSTRUCTION,
    }

    get tab() {
        return this.state.tab
    }

    get progress() {
        return this.state.progress
    }

    get reviews() {
        return this.state.reviews
    }

    get user() {
        return this.state.user
    }


    setTab = async (tab: Tabs) => {
        // if (tab == Tabs.HOME) {
        //     await this.getHomeData()
        // }
        await this.setState({ tab })
    }

    getReviews = async ({ forceUpdate }: GetReviewsParams): Promise<Array<any>> => {
        const { reviews, token } = this.state
        if (reviews === null || forceUpdate) {
            if (token === null) {
                const localToken = this.getLocalToken()
                if (localToken === null) {
                    return new Array()
                }
            }
            let response = await ReviewAPI.getReview({ token: this.state.token! })
            console.log('review response: ', response)
            if (response === null) {
                return new Array()
            }
            await this.setState({ reviews: response })
        }
        return this.state.reviews!
    }

    getProgress = async () => {
        const { token } = this.state
        if (token === null) {
            const localToken = this.getLocalToken()
            if (localToken === null) {
                return null
            }
        }
        let response = await ProgressAPI.getProgress({ token: this.state.token! })
        if (response === null) {
            return null
        }
        await this.setState({ progress: response })
        return this.state.progress
    }


    setUser = async (user: any, token: string) => {
        localStorage.setItem('user', JSON.stringify(user))
        console.log('setUser token: ', token)
        localStorage.setItem('token', token)
        await this.setState({ user, token })
    }

    logout = async () => {
        localStorage.clear()
        await this.setState({
            user: null,
            token: null,
            progress: null,
            reviews: null,
            construction: EMPTY_CONSTRUCTION,
            tab: Tabs.CONSTRUCTION
        })
    }


    getConstructionData = async () => {
        const token = localStorage.getItem('token');
        let response = await ConstructionAPI.getConstruction(token as string)
        if (response === null && response.length === 0) {
            return EMPTY_CONSTRUCTION
        }
        await this.setState({ construction: response[0] })
        return this.state.construction!
    }

    getFinance = async () => {
        const token = localStorage.getItem('token');
        let response = await FinanceAPI.getFinance(token as string)
        if (response === null && response.length === 0) {
            return { link: '' }
        }
        await this.setState({ finance: response[0] })
        return this.state.finance!
    }

    getLocalToken = async () => {
        const localToken = localStorage.getItem('token');
        if (localToken !== null) {
            await this.setState({ token: localToken })
        } else {
            return null;
        }
        return this.state.token
    }

    getUser = async () => {
        const { user } = this.state
        if (user === null) {
            const localUser = localStorage.getItem('user');
            if (localUser != null) {
                let userJson = JSON.parse(localUser)
                await this.setState({ user: userJson })
            } else {
                return null
            }
        }
        return this.state.user
    }

}