const userReducer = (state = null, action) => {
    switch (action.type){
        case 'SIGN_OUT':
            return null
        case 'SIGN_IN':
            return action.payload
        default:
            return state
    }
}

const modalReducer = (state = null, action) => {
    switch (action.type){
        case 'PUT_MODAL':
            return action.payload
        case 'REMOVE_MODAL':
            return null
        default:
            return state
    }
}

export {userReducer,modalReducer}