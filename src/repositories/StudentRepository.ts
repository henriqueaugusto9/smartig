import { detect } from 'detect-browser';
import { injectable } from 'inversify';
import { Container } from 'unstated';
import HomeAPI from '../api/home';
import ProfileAPI from '../api/profile';
import ProgressAPI from '../api/progress';
import ReviewAPI from '../api/review';
import { Tabs } from '../utils/tabs';

const browser = detect()

type StudentRepositoryState = {
    student: any | null,
    homeData: any | null,
    progress: any | null,
    reviews: Array<any> | null,
    profile: any | null,
    token: string | null,
    dates: Array<number>,
    tab: Tabs
}

type GetReviewsParams = {
    forceUpdate?: boolean
}


@injectable()
export class StudentRepository extends Container<StudentRepositoryState> {
    readonly state: StudentRepositoryState = {
        student: null,
        homeData: null,
        token: null,
        progress: null,
        profile: null,
        reviews: null,
        dates: [],
        tab: Tabs.CONSTRUCTION
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

    get profile() {
        return this.state.profile
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
        // console.log('progress response: ', response)
        if (response === null) {
            return null
        }
        await this.setState({ progress: response })
        return this.state.progress
    }

    getProfile = async () => {
        const { profile, token } = this.state
        // console.log('getProfile: ', profile)
        if (profile === null) {
            if (token === null) {
                const localToken = this.getLocalToken()
                if (localToken === null) {
                    return null
                }
            }
            const response = await ProfileAPI.getProfile({ token: this.state.token! })
            // console.log('profile response: ', response)
            if (response === null) {
                return null
            }
            await this.setState({ profile: response })

        }
        return this.state.profile
    }

    setStudent = async (student: any, token: string) => {
        localStorage.setItem('student', JSON.stringify(student))
        localStorage.setItem('token', token)
        await this.setState({ student, token })
    }

    logout = async () => {
        localStorage.clear()
        await this.setState({
            student: null,
            homeData: null,
            token: null,
            progress: null,
            profile: null,
            reviews: null,
            dates: [],
            tab: Tabs.CONSTRUCTION
        })
    }

    getHomeData = async () => {
        const { homeData, token } = this.state
        if (homeData === null) {
            if (token === null) {
                const localToken = await this.getLocalToken()
                if (localToken === null) {
                    return null
                }
            }
            const response = await HomeAPI.homeData({ token: this.state.token! })
            if (response === null) {
                return null
            } else {
                // console.log('repository: ', response)
                // let newStudent = this.state.student
                // newStudent.image = response.student.image
                // await this.setState({ homeData: { plan: response.plan, note: response.note }, student: newStudent })

            }
        }
        return this.state.homeData
    }

    getLocalToken = async () => {
        const localToken = localStorage.getItem('token');
        if (localToken != null) {
            await this.setState({ token: localToken })
        } else {
            return null;
        }
        return this.state.token
    }

    getStudent = async () => {
        const { student } = this.state
        if (student === null) {
            const localStudent = localStorage.getItem('student');
            if (localStudent != null) {
                let studentJson = JSON.parse(localStudent)
                await this.setState({ student: studentJson })
            } else {
                return null
            }
        }
        return this.state.student
    }

    getDates = async () => {
        const { dates } = this.state
        if (dates === null || dates.length === 0) {
            const actualDate = new Date()
            const month = actualDate.getUTCMonth()
            const monthThirtyDays = [4, 6, 9, 11]
            let maxDays = 31

            if (monthThirtyDays.includes(month)) {
                maxDays = 30
            } else if (month === 2) {
                maxDays = actualDate.getFullYear() % 4 === 0 ? 29 : 28
            }

            let newDates = []

            for (var i = 1; i <= maxDays; i++) {
                newDates.push(i)
            }
            await this.setState({ dates: newDates })
        }
        return this.state.dates
    }

}