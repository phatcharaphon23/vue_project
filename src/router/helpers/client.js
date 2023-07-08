import axios from 'axios'




const request = axios.create({
    baseURL: 'https://localhost:7129/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + '123',
    },
})

request.interceptors.request.use(
    async (request) => {


        return request
    },
    (error) => {
        // eventBus.$emit('changeLoadingState', false)
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        // eventBus.$emit('changeLoadingState', false)
        return response
    },
    (error) => {
        // eventBus.$emit('changeLoadingState', false)
        if (error.response) {
            switch (error.response.status) {
                case 400:
                    return Promise.resolve(error.response)
                case 401:
                    redirectLogin()
                    break
                case 403:
                    break
                case 404:
                    break
                case 412:
                    break
                case 500:
                    // EventBus.$emit('internalServerError', error.response)
                    break
                default:
                    console.log('Error')
            }
        }
        return Promise.reject(error.response)
    }
)


const core = {
    head(endpoint, data, config, loadingState = false) {

        const params = {
            params: data,
        }
        const newParams = Object.assign(params, config)
        return request.head(endpoint, newParams)
    },
    fetch(endpoint, data, config, loadingState = true) {

        const params = {
            params: data,
        }
        const newParams = Object.assign(params, config)
        return request.get(endpoint, newParams)
    },

    create(endpoint, data, config, loadingState = true) {

        return request.post(endpoint, data, config)
    },

    upload(endpoint, form, config, loadingState = true) {


        const result = request.post(endpoint, form, config)
        if (loadingState)
            setTimeout(() => {

            }, 300)
        return result
    },

    update(endpoint, data, config, loadingState = true) {

        return request.put(endpoint, data, config)
    },

    edit(endpoint, data, config, loadingState = true) {

        return request.patch(endpoint, data, config)
    },

    remove(endpoint, data, config, loadingState = true) {

        const params = { data }
        const newParams = Object.assign(params, config)
        return request.delete(endpoint, newParams)
    },

    delete(endpoint, id, config, loadingState = true) {

        const params = {
            params: {
                id,
            },
        }
        const newParams = Object.assign(params, config)
        return request.delete(endpoint, newParams)
    },
}

export default core
