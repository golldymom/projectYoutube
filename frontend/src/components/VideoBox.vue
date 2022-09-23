<template >
    
    <div class="VideoCard"  >
      <div class="Thumbnail"></div>      
      <div class="VideoBotton">
        <div class="VideoPhoto"></div>
        <div class="VideoTitles">
          <p>{{ videoData.title }}</p>
          <p>{{channelData.channelName}}</p>          
          <div class="VideoInfo">
            <span>{{videoData.views}}</span>
            <span>{{setCalDate(videoData.createdAt)}}</span>
            <!-- <span>{{videoData.createdAt | moment('YYYY-MM-DD')}}</span> -->            
          </div>          
        <div>            
        </div>          
      </div>        
      </div>   

    </div>
    
</template>
<script>
// import moment from 'moment'
import SetFormat from '@/mixins/setFormat.vue';
export default {
    name : 'VideoBox',
    mixins:
        [SetFormat],
    
    props:{
        video:Object,
        channel:Object,
    },
    computed:{
        videoData(props){
            return props.video;
        },
        channelData(props){
            return props.channel;
        }
    }
}
</script>
<style>
    .VideoCard{
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  column-gap: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

}
.Thumbnail{
background-color: black;
height: 200px;
width: 100%;
}
.VideoBotton{
  column-gap: 20px;
  display: grid;
  grid-template-columns: 50px calc(100% - 50px);
  margin-top: 10px;
  width: 100%;
}
.VideoPhoto{
 background-color: black;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
.VideoTitles{
  align-items: flex-start;
  column-gap: 2px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.VideoTitles p{
  font-size: 14px;
}
.VideoTitles span{
  columns: rgb(144, 143,143);
  font-size: 12px;
  margin-right: 8px;
}
</style>