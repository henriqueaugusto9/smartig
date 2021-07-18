import client from './config'

class ConstructionAPI {

    static getConstruction = async (token: string) => {
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