import client from './config'

interface IPutConstruction {
    id: string
    title: string
    price: string
    description: string
}

interface IPostConstruction {
    id: string
    title: string
    price: string
    description: string
}

interface ConstructionParams { id: string }

class ConstructionAPI {

    static getConstruction = async (token: string) => {
        console.log('token: ', token)
        return await client.get(`construction/`, { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                return response.data.construction
            })
            .catch((err) => {
                console.log(err)
                return null
            })
    }
}

export default ConstructionAPI