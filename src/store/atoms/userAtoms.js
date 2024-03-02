import {atom} from 'recoil';

export const userAtom = new atom({
    key: 'userAtom', 
    default: {
     name: "Guest",
     email: "guest"  
    }
})

export const signInErrorAlert = new atom({
    key: 'signInErrorAlert', 
    default: false
})

export const signUpErrorAlert = new atom({
    key: 'signUpErrorAlert', 
    default: false
})

export const userExistsErrorAlert = new atom({
    key: 'userExistsErrorAlert', 
    default: false
})

export const logoutAlert = new atom({
    key: 'logoutAlert', 
    default: false
})