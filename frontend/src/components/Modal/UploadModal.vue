<template >
<v-dialog persistent max-width="1000" v-model="statusModal">
  <v-card class="modal">
    <div class="modalHeader">
      <h3>동영상 업로드</h3>

      <v-btn @click="closeModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>

    </div>
    <v-divider></v-divider>
    <v-card-text v-if="!uploaded">
    <div class="fileInpuStyle">
      <ValidationProvider
      ref="providerFileInput"
      name="동영상"
      rules="required-select|size:5000000"
      v-slot="{ error }">
        <v-file-input
        accept="Video/mp4"
        prepend-icon="mdi-video"
        :error-messages="error"
        v-model="selectedFile"
        @change="selectedUploadFile"
       >

        </v-file-input>
      </ValidationProvider>
     
    </div>
    </v-card-text>
    <v-card-text v-else>
      <ValidationObserver ref="videoUploadForm" v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submitContent)">
        <ValidationProvider>
        <v-file-input
        accept="image/*"
       
        
        ></v-file-input>
        <div >
          <!-- {{ UpdateThumbnail }} -->
          <img src="" height="200"/>
          </div>
        </ValidationProvider>
        <v-theme-provider></v-theme-provider>
      <ValidationProvider>
        <v-text-field
        name="title"
        label="Title"
        v-model="formData.title"
        ></v-text-field>
      </ValidationProvider>>
        <v-theme-provider></v-theme-provider>
        <ValidationProvider>
        <v-textarea>
          <template v-slot:label>
            <div>설명</div>
          </template>
        </v-textarea>
        </ValidationProvider>
        <v-theme-provider></v-theme-provider>
        <ValidationProvider>
        <v-select
        label="공개상태"></v-select>
        </ValidationProvider>
        <v-theme-provider></v-theme-provider>
        <ValidationProvider>
        <v-select
        label="카테고리"></v-select></ValidationProvider>
         <v-theme-provider></v-theme-provider>
         <v-btn 
         @click="answer"
         
          >저장</v-btn>
        </form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</v-dialog>
  
</template>
<script>
import Validate from '@/mixins/Validate.vue'
import axios from 'axios';
export default {
  name:'UploadModal',
  
   props:{
        openDialog : Boolean,
        UpdateThumbnail: null,
        
    },
    data:()=>({
      

      categories:[],
      categoryTitles:[],
      selectedFile:[],
      selectedImgFile:[],

      visivilty:['공개','비공개'],

      formData:{
        id:'',
        title:'',
        description:'',
        category:'',
        visibilty:'',
      },
      url:'',
      imgDataUrl:'',

      categoryLoading: false,
      uploading: false,
      uploaded: true,
      saveLoading: false,
    }),
    mixins:[Validate],
      
   
    computed:{
        statusModal(props){
            return props.openDialog;
        },
    },
    methods:{
        closeModal() {
            this.$emit('closeDialog');
        },
        


        async selectedUploadFile(e){
          console.log('----selectedUploadFile : ', this.selectedFile);

          const {valid} = await this.$refs.providerFileInput.validate(e);
          console.log('selectedUploadFile-valid', valid)

          if(!valid) return; 


          const videoFormData = new FormData();
          videoFormData.append('video', this.selectedFile, this.selectedFile.name)

        //append(name, value, filename)

        //폼데이터 확인
         


        for(let item of videoFormData.entries()){
          console.log(item)
        }
        //draft 비디오 업로드
        await axios
        .post(process.env.VUE_APP_API+'/videos', videoFormData,{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`,
          },
        
        })
          .then((response)=>{
            console.log('selectedUploadFile - response', response);
          //폼데이터 설정
          this.formData.id = response.data.data.id;
          this.formData.title = response.data.data.title;
          this.formData.description = response.data.data.description;
          this.formData.category = response.data.data.category;
          this.formData.visibilty = response.data.data.visibilty;
          this.url = `${process.env.VUE_APP_API}/video/${response.data.data.id}`;
          // this.Thumbnail = `${process.env.VUE_APP_API}/videos/${this.formData.id}/thumbnails`;
          })
          .catch((error)=>{
            console.log('selectedUploadFile - response', error)
          })
          .finally(()=>{
            this.uploaded = true;
            this.uploading = false;
          })
    

},
      answer(title){
        console.log(title)
      }


    },
}
</script>
<style >
.modal{
  box-sizing: border-box;
  padding: 20px 30px
}
  .modalHeader{
    align-items: center;
    /* border-bottom: 1px solid #333; */
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    width: 100%;
  }
  .fileInpuStyle{
    margin: 20px auto 0px auto;
    width: 80%
  }
  .formStyle{
    margin: 20px auto 0px auto;
  }
</style>