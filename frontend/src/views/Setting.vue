<template >
  <v-container fluid class="full-geight pa-10">
    <ValidationObserver v-slot="{handleSubmit,invalid}"
    >
    <form @submit.prevent="handleSubmit(submitData)">
    <p>채널이름</p>
    <ValidationProvider
    name ='채널이름'
    rules = "required"
    v-slot="{ errors }">
    <v-text-field outlined type="text" :error-messages="errors" v-model="channelName"></v-text-field>
    <v-text-field disabled outlined type="text" label="email" v-model="email"></v-text-field>
    </ValidationProvider>
    <ValidationProvider
    name = '프로필'
    rules="required"
    v-slot="{error}">
    <v-file-input 
    accept="image/*" 
    v-model="avatar" 
    :error-messages="error">
    
    </v-file-input>
    </ValidationProvider>

    <v-btn :disabled="invalid" type="submit">수정</v-btn>
    
</form>
</ValidationObserver>
  </v-container>
</template>
<script>

// import { mapGetters} from 'vuex'
import Validate from "@/mixins/Validate.vue";
import axios from 'axios';

export default {
    name : 'Setting',
    mixins:[Validate],
    data:()=>({
        avatar:[],
        channelName : '',
        email:','
    }),
    computed:{

    },
    methods:{
        async submitData(){
            console.log(this.channelName)
            const axiosBody ={
                channelName:this.channelName,
                email:this.email
                
            }
            console.log('submitData - axiosBody',axiosBody)

            const photoFormdata = new FormData();
            photoFormdata.append('avatar',this.avatar, this.avatar.name),
            console.log('submitData - avatar', this.avatar, this.avatar.name);
            // process.env.VUE_APP_URL/uploads/avatars/photoUrl

            await axios
            .put(process.env.VUE_APP_API+ '/auth/avatar', photoFormdata,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .then((response)=>{
                console.log('submitData - response', response)
                // localStorage.setItem('user', JSON.stringify(response.data))
            })
            .catch((error)=>{
                console.log('submitData - avatar error', error);
            })

            await axios
            .put(process.env.VUE_APP_API+ '/auth/updatedetails',axiosBody, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            })
            .then((response)=>{
                console.log('submitData - response',response)
                localStorage.setItem('user', JSON.stringify(response.data))
            })
            .catch((error)=>{
                console.log('submitData - error', error)
            })
            
        }
    },
    mounted(){
        const userData = JSON.parse(localStorage.getItem('user')).data;
        console.log(userData)
        this.channelName = userData.channelName;
        this.email = userData.email;
  
    },
}
</script>
<style >
    
</style>