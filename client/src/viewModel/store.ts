import { reactive } from "vue";
import { type User } from "@/model/users";

const API_URL = 'http://localhost:3000/';

const store = ({
  state: reactive({
    user:{} as User,
    token:'',
    pic_url:'',
  }),

  getters: {
    getUser(){
      return store.state.user;
    },
    getToken(){
      return store.state.token;
    },
    getPicture(){
      return store.state.pic_url;
    }
  },

  mutations: {
    authenticateUser(data:User,token:string, pic_url:string){
      store.state.user = data;
      store.state.token = token;
      store.state.pic_url = API_URL + pic_url;
    },
    logoutUser(){
      store.state.user = {} as User;
      store.state.token = '';
      store.state.pic_url = '';
    }
  },

})

export default store;