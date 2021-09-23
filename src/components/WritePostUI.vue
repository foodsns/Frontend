<template>
    <div id="writePostUI">
        <div>
            <textarea v-model="inputText" maxlength="280" placeholder="내용 입력" class="postBox"></textarea>
        </div>
        <div class="Buttons">
            <b-icon icon="camera-fill" type="button" class="camerabtn" @click="postclick"></b-icon>
            <b-button type="submit" pill variant="primary" class="postbtn">확인</b-button>
        </div>
    </div>
</template>

<style>
.postBox{
    resize : none;
    height : 100px;
    width : 500px;
}
.postbtn{
    margin : 2px;
}
</style>
