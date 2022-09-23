<template>
  <nav>
    <v-app-bar app clipped-left flat class="white">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link class="black--text" to="/">Vuetube</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>
       <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn
        outlined
        color="blue"
        router
        to=""
        v-on="on">
        <v-icon left size="26">mdi-video-box</v-icon>
        만들기
        </v-btn>
        </template>
         <v-card>
           <v-list-item @click="openUploadModal" >
              <v-list-item-icon>
                <v-icon>mdi-upload</v-icon>
              </v-list-item-icon>
              <v-list-item-title  >동영상 업로드1</v-list-item-title>
            </v-list-item>
         </v-card>
      </v-menu>

      <v-btn
        outlined
        rounded
        color="blue"
        router
        to="/signin"
        v-if="!GE_LOGIN_STATUS">
        <v-icon left size="26">mdi-account-circle</v-icon>
        로그인
      </v-btn>

       <v-menu offset-y v-else>
        <template v-slot:activator="{ on }">
          <v-btn
            depressed
            fab
            small
            color="red white--text"
            class="font-weight-bold"
            v-on="on">
                <span v-if="photoUrl !== true">{{ channelAvatar }}</span>
                <v-avatar v-else>
                  <img
                    :src="thuUrl"
                    :alt="GE_USER_DATA.channelName" />>
                </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list class="MenuStyle">
            <v-list-item>
              <v-list-item-avatar
                small
                color="red white--text"
                class="align-center d-flex font-weight-bold justify-center">
                 <!-- <v-avatar v-if="GE_USER_DATA.photoUrl !== 'no-photo.jpg'">  -->
              <span v-if="photoUrl !== true">{{ channelAvatar }}</span>
                <v-avatar v-else>
                  <img
                    :src="thuUrl"
                    :alt="GE_USER_DATA.channelName" />>
                </v-avatar>

                
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{
                  GE_USER_DATA.channelName
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  GE_USER_DATA.email
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="mt-3"></v-divider>

            <v-list-item router to="/VuetubeStudio">
              <v-list-item-icon>
                <v-icon>mdi-youtube-studio</v-icon>
              </v-list-item-icon>
              <v-list-item-title  >Vuetube 스튜디오</v-list-item-title>
            </v-list-item>
            <v-list-item @click="AC_SIGN_OUT">
              <v-list-item-icon>
                <v-icon>mdi-login-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu> 
    </v-app-bar>

    <v-navigation-drawer app clipped v-model="drawer">
      <v-list dense nav>
        <v-list-item router to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>홈</v-list-item-title>
        </v-list-item>
        <v-list-item router to="/subscriptions">
          <v-list-item-icon>
            <v-icon>mdi-youtube-subscription</v-icon>
          </v-list-item-icon>
          <v-list-item-title>구독</v-list-item-title>
        </v-list-item>

        <v-divider class="my-3"></v-divider>

        <v-list-item router to="/history">
          <v-list-item-icon>
            <v-icon>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-title>시청 기록</v-list-item-title>
        </v-list-item>

        <v-divider class="my-3"></v-divider>

        <v-subheader>구독</v-subheader>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
// import UploadModal from '@/components/Modal/UploadModal.vue'

export default {
  name: 'NavBar',

  data: () => ({
    drawer: true,
    modalStatus:false,
  }),

  computed: {
    // UploadModal,
    ...mapGetters({
      GE_URL: 'GE_URL',
      GE_USER_DATA: 'GE_USER_DATA',
      GE_LOGIN_STATUS: 'GE_LOGIN_STATUS',
    }),
    photoUrl() {
      const thisUrl = JSON.parse(localStorage.getItem('user')).data.photoUrl;
      console.log(thisUrl, thisUrl !== undefined && thisUrl !== 'no-photo.jpg');
      if(thisUrl !== undefined && thisUrl !== 'no-photo.jpg') return true
      else return false
      // return thisUrl
    },
    thuUrl(){
      const thisUrl = JSON.parse(localStorage.getItem('user')).data.photoUrl;
      console.log('thuUrl : ', thisUrl)
      return `${process.env.VUE_APP_URL}/uploads/avatars/${thisUrl}`;
    },

    channelAvatar() {
      // const setChannelAvatar = this.$store.getters.GE_USER_DATA.channelName
     if(JSON.parse(localStorage.getItem('user')).data.channelName !== undefined) {
        const setChannelAvatar = JSON.parse(localStorage.getItem('user')).data.channelName
        .split('')[0]
        .toUpperCase();
      console.log('setChannelAvatar : ', setChannelAvatar);
      return setChannelAvatar;
      }
      return JSON.parse(localStorage.getItem('user')).data.channelName;

    },
  },

  methods: {
    ...mapActions({
      AC_SIGN_OUT: 'AC_SIGN_OUT',
    }),
    openUploadModal(){
      this.modalStatus = true;
      console.log('--open : ', this.modalStatus)
    },
    // //모달닫기
    // closeUploadModal(){
    //   this.modalStatus = false;
    //   console.log('--close : ', this.modalStatus)
    // },
    
  },
   mounted(){
      
    },
};

// app: 컴포넌트를 어플리케이션 레이아웃은 한 부분으로 지정. 컨텐츠 크기를 동적으로 맞추는데 사용됨
// clipped-left: v-navigation-drawer를 왼쪽부터 잘리도록 지정
// dense: 툴바 컨텐츠와 확장의 높이를 줄임 64px -> 48px
// depressed: 버튼 박스의 그림자를 없앰
// fab: 버튼 둥글게
// flat: 버튼의 배경색을 없앰
// icon: 버튼이 아이콘임을 지정 - round & flat

// v-menu: template v-slot:activator="{ on }" 사용
// v-btn: v-on="on"

// v-divider: 직선
</script>
<style>
.MenuStyle{
  width: 300px;

}
</style>
