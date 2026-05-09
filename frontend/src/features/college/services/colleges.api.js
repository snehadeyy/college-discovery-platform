import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export async function getColleges(params) {
    try {
        const response = await api.get('/colleges', { params })
        return response.data
    }
    catch (err) {
        console.log(err.message)
        throw err
    }
}

export async function getDetails(id) {
    try {
        const response = await api.get(`/colleges/${id}`)
        // console.log(response)
        return response
    }
    catch (err) {
        console.log(err.message)
        throw err
    }
}

export async function compareColleges(ids) {
    try {
        const response = await api.post('/compare', {
            ids: ids
        })
        console.log(response)
        return response.data
    }
    catch (err) {
        console.log(err)
        throw err
    }
}