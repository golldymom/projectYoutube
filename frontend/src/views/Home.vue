<template>
  <div id="Home">
   <VideoBox v-for="video in videos" :key="video.id" :video="video" :channel="video.userId"></VideoBox>
   <!-- <div class="VideoCard"  v-for="video in videos" :key="video.id">
      <div class="Thumbnail"></div>
      
      <div class="VideoBotton">
        <div class="VideoPhoto"></div>
        <div class="VideoTitles">
          <p></p>
          <p></p>
          <div class="VideoInfo">
            <span></span>
            <span></span>
          </div>          
          <div>            
          </div>          
        </div>        
      </div>    -->

    <!-- </div> -->
  </div>
</template>
<script>
import axios from 'axios'

import VideoBox from "@/components/VideoBox.vue"
export default {
  name: 'Home',
  data:()=>({
    // headers:[{
    //   text:'동영상',
    //   align:'start',
    //   value:'title',
    // },
    // {text:'공개상태',value:'status'},
    // {text:'조회수',value:'views'},
    // {text:'좋아요',value:'feelings'},
    // {text:'생성날짜',value:'createdAt'},
    // {text:'수정날짜',value:'updatedAt'},
    // ],
    videos:[],
  }),
  components:{
    VideoBox,
  },
  methods:{
    async getVideos(){
      await axios
      .get(process.env.VUE_APP_API+'/videos/public',{},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        },
      })
       .then((response)=>{console.log('getVideos - response', response,response.data.data)
         this.videos = response.data.data;})
      .catch((error)=>{console.log('getVideos-error',error)})
    }
  },
  mounted(){
    this.getVideos()
  }
};
</script>
<style>
#Home{
  display: grid;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(350px, auto));
  padding: 20px;
  row-gap: 20px;
}

</style>
