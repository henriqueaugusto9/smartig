import AuthAPI from '../api/auth';
import { inject, injectable } from "inversify";
import { StudentRepository } from '../repositories/StudentRepository';
import ReviewAPI from '../api/review';
import ProfileAPI from '../api/profile';
import SubjectAPI from '../api/subject';

type LoginParams = { email: string, password: string }

type ReviewParams = { id: string, title: string, price: string, description: string }

type ProfileParams = {
    name: string,
    city: string,
    email: string,
    phoneNumber: string,
    generalProfile: string,
    mainGoal: string
}

type ClassParams = {
    classID: string,
    performance: string
}

type CheckSessionParams = {
    goBack: () => void
}

@injectable()
class StudentService {

    @inject(StudentRepository) private studentRepo!: StudentRepository

    login = async ({ email, password }: LoginParams) => {
        let response = await AuthAPI.authStudent({ email, password })

        if (response != null && response.token != null) {
            this.studentRepo.setStudent(response.student, response.token)
            return true
        }
        return false
    }

    checkSessionStatus = async ({ goBack }: CheckSessionParams) => {
        const token = await this.studentRepo.getLocalToken()
        if (token != null) {
            return token
        } else {
            goBack()
            return null
        }
    }

    editReview = async (review: ReviewParams) => {
        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ReviewAPI.putReview(review, { token })
        if (response != null && response.review != null) {
            await this.studentRepo.getReviews({ forceUpdate: true })
            return true
        }
        return false
    }

    addReview = async (review: ReviewParams) => {
        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ReviewAPI.postReview(review, { token })

        if (response != null && response.review != null) {
            await this.studentRepo.getReviews({ forceUpdate: true })
            return true
        }
        return false
    }


    deleteReview = async (id: string) => {
        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ReviewAPI.deleteReview(id, { token })
    }

    editProfile = async ({ name, email, phoneNumber, city, generalProfile, mainGoal }: ProfileParams) => {

        const body = {
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            profile: {
                address: {
                    state: city.split('-')[1] ?? '',
                    city: city.split('-')[0]
                },
                generalProfile: generalProfile,
            },
            goals: {
                course: mainGoal
            }
        }

        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const response = await ProfileAPI.putProfile(body, { token })
        if (response != null && response.student != null) {
            return true
        }
        return false
    }

    editClassPerformance = async ({ performance, classID }: ClassParams) => {
        const home = await this.studentRepo.getHomeData()
        const plan = home.plan[0]

        let newContents = plan.contents.map((content: any) => {
            let newContent = content
            newContent.subject.chapter = content.subject.chapter.map((chapter: any) => {
                let newChapter = chapter
                newChapter.classes = chapter.classes.map((c: any) => {
                    if (c._id == classID) {
                        let newClass = c
                        newClass.performance = performance
                        return newClass
                    } else {
                        return c
                    }
                })
                return newChapter
            })

            return newContent
        })

        const token = await this.studentRepo.getLocalToken()
        if (token == null) {
            return false
        }
        const result = await SubjectAPI.editClass({ planID: plan._id, contents: newContents }, { token })
        if (result != null && result.studyplan != null) {
            return true
        }
        return false
    }

}

export default StudentService