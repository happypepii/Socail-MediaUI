import { defineStore } from "pinia";

export const userUserStore = defineStore('user', {
    state: () => ({
        token: '',
        user: null
    }),
    actions: {
        setUser(token, user){
            this.token = token;
            this.user = user;
        },
        clearUser(){
            this.token = '';
            this.user = null;
        }
    },
    persist: true
})