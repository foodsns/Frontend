<template>
    <div id="writePostUI">
        <div class="form-floating">
            <textarea v-model="postctx" class="form-control" id="floatingTextarea"></textarea>
        </div>
        <div class="Buttons">
            <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
                <input type="file" name="files" style="display:none" accept="image/jpeg, image/png, image/jpg"/>
                <b-icon icon="camera-fill" type="button" class="camerabtn" onclick=document.all.file.click()></b-icon>
            </form>
            <b-button type="submit" pill variant="primary" class="postbtn">확인</b-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'WritePostUI',
    data () {
        return {
            hashtag: [],
            splitedArray: ''
        }
    }
}
</script>
<style>
.postBox{
    resize : none;
    height : 100px;
    width : 500px;
}
.postbtn{
    margin : 2px;
}
#form-floating {
    display : flex;
    border : 2px solid #FFFFFF;
    background-color : #FFFFFF;
}

#form-control{
    resize : none;
    margin-bottom : 5px;
    height:50%;
    border : 0px solid #000;
    padding : 12px 0 12px 0;
    position : relative;
    display: flex;
}

</style>
