<template>
<div>
    <h2>채널 콘텐츠</h2>

    <v-tabs class="mt-5" v-model="tab">
    <v-tab>동영상</v-tab>
    <v-tab>실시간 스트리밍</v-tab>
    <v-tab>whatIMake</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" >
    <v-tab-item>
        <table class="tableStyle">
            <thead>
                <tr>
                <th>동영상</th>
                <th>공개상태</th>
                <th>조회수</th>
                <th>좋아요</th>
                <th>생성날짜</th>
                <th>수정날짜</th>
                </tr>
                </thead> 
            <tbody>
                <tr v-for="video in videos" :key="video.id">
                    <td>{{ video.title }}</td>
                    <td>{{ video.status }}</td>
                    <td>{{ video.views }}</td>
                    <td>{{ video.likes }}</td>
                    <!-- <td>{{ video.createdAt }}</td> -->
                    <td>{{ video.createdAt| moment('YYYY-MM-DD')}}</td>
                    <!-- <td>{{ setCalDate(video.createdAt) }}</td> -->
                    <!-- <td>{{ video.updatedAt }}</td> -->
                    <td>{{ video.updatedAt | moment('YYYY-MM-DD')}}</td>
                   
                   
                </tr>
            </tbody>
        </table>
    </v-tab-item>
    <v-tab-item>
        <v-data-table :headers="headers" :items="videos">
            <template v-slot:[`item.yearDate`]="{ item }">
                <span>{{item.createdAt| moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
            <template v-slot:[`item.updateDate`]="{ item }">
                <span>{{item.updatedAt| moment('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
            <template v-slot:[`item.feelings`]="{ item }">
                <span class="mr-3">
                    <v-icon small class="pr-1">mdi-thumb-up</v-icon>
                    {{ item.likes}}
                </span>
                <span>
                     <v-icon small class="pr-1">mdi-thumb-down</v-icon>
                    {{ item.dislikes}}
                </span>
                
            </template>

        </v-data-table>
    </v-tab-item>
     <v-tab-item>
        <v-data-table :headers="headers" :items="videos">
            <template v-slot:item="{item}">
                <tr>
                    <td>{{item.title}}</td>
                    <td>{{item.status}}</td>
                    <td>
                        <!-- <v-chip :color="setViewsChip(item.vies)" class="white-text">
                        {{item.views}}
                        </v-chip> -->
                         {{item.views}}
                    </td>
                    <td>
                        <span class="mr-3">
                        <v-icon small class="pr-1">mdi-thumb-up</v-icon>
                        {{ item.likes}}
                    </span>
                    <span>
                        <v-icon small class="pr-1">mdi-thumb-down</v-icon>
                        {{ item.dislikes}}
                    </span>
                        </td>
                        <td>{{item.createdAt| moment('YYYY-MM-DD HH:mm:ss')}}</td>
                        <td>{{setDateFormat(item.updatedAt)}}</td>

                </tr>
            </template>
        </v-data-table>
     </v-tab-item>
    </v-tabs-items>
   
 </div>   
</template>
<script>
import axios from 'axios';
import SetFormat from '@/mixins/setFormat.vue';
export default {
    name : 'Contents',
     mixins:
        [SetFormat],
    data:()=>({
        tab:null,
        headers:[{
            text:'동영상',
            align:'start',
            value:'title',
        },
        {text:'공개상태',value:'status'},
        {text:'조회수',value:'views'},
        {text:'좋아요',value:'feelings'},
        {text : '생성날짜', value:'yearDate'},
        {text : '수정날짜', value:'updateDate'},
        ],
        videos:[],
    }),
    methods:{
         async getVideos(){
        await axios
        .get(process.env.VUE_APP_API+'/videos/public',{},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response)=>{console.log('getVideos - response', response,response.data.data)
         this.videos = response.data.data;})
       
        .catch((error)=>{console.log('getVideos - error',error)})
    }
    },
    mounted(){
       this.getVideos()
    }
}
</script>
<style>
    .tableStyle{
        border: 1px solid #000;
        border-collapse: collapse;
        background-image : url(C:\Users\User\Pictures\KakaoTalk_20220914_142037415.jpg);
        background-size: 380px 300px;
        background-position: center;
        margin: 10px auto;
        table-layout: fixed;

        width:100%;
        
    }
    .tableStyle th,
    .tableStyle td{
        border: 2px dashed rgb(255, 252, 252);
        border-radius: 17px;
    }
     .tableStyle th{
        /* background-color: blueviolet; */
        color: rgb(103, 224, 226);
        font-size: 18px;
        padding: 5px 0px;
    }
    .tableStyle td{
        /* background-color: greenyellow; */
        color: rgb(250, 11, 11);
        /* display: flex; */
        text-align: center;
        /* align-content: center; */
        font-size: 16px;
        padding: 5px ;
    }
</style>