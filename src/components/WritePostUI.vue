<template>
    <div id="writePostUI">
        <div class="postBox">
            <textarea v-model="inputText" maxlength="280" bottom-slots></textarea>
            <label for="floatingInput">내용</label>
        </div>
        <div class="Buttons">
            <b-icon icon="camera-fill" class="camerabtn" @click="postclick()"></b-icon>
            <b-button type="submit" pill variant="primary" class="postbtn">확인</b-button>
        </div>
    </div>
</template>
<script>
export default{
    name: 'WritePostUI',
    data(){
        return{
            inputText:''
        }
    }
}
</script>

<style>
.postBox{
    resize : none;
    border:none;
    flex:1;
    margin-left:20px;
}
</style>