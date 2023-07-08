const login = {
    accessToken: {
        username: '',
        password: '',

    },
    isUser: false,

    mutations: {
        ADD_FILTER_LOGIN: (state, data) => {
            state.accessToken = data

            state.isUser = true
        },

        CLEAR_FILTER_LOGIN: (state) => {
            state.accessToken = {
                username: '',
                password: '',
      
            }
            state.isUser = false
        },
    },
    actions: {
        ADD_FILTER_LOGIN: ({ commit }, data) => {
            commit('ADD_FILTER_LOGIN', data)
        },

        CLEAR_FILTER_LOGIN: ({ commit }) => {
            commit('CLEAR_FILTER_LOGIN')
        },
    },
    getters: {
        GET_FILTER_LOGIN: (state) => {
            return state.accessToken
        },
        GET_FILTER_USER: (state) => {
            return state.isUser
        },
    },
}

export default login
