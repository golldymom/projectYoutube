<!--<template lang="">
    <div>
        
    </div>
</template>
-->
<script>
import moment from 'moment'
export default {
    methods:{
        setDateFormat(value){
            const result = moment(value).format('YYYY-MM-DD HH:mm:ss');
            return result;
        },
        setCalDate(value){
            const result = moment(value).fromNow(); 
//fromNow 며칠전 지금을 기준으로나오는 그거 moment 1년 더하기 키워드 검색(내장이 엄청 많음)
            return result;
        }
    }
}
</script>
<style>
    
</style>