import { mapState, mapGetters, mapActions } from 'vuex'
export const loginComputed = { ...mapGetters(['GET_FILTER_LOGIN','GET_FILTER_USER']) }
export const loginMethods = mapActions( [
    'ADD_FILTER_LOGIN',
    'CLEAR_FILTER_LOGIN',



])