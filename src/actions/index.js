export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const signIn = (user) => {
    return {
        type: 'SIGN_IN',
        payload: user
    }
}

export const removeModal = () => {
    return {
        type: 'REMOVE_MODAL'
    }
}

export const putModal = (modal) => {
    return {
        type: 'PUT_MODAL',
        payload: modal
    }
}