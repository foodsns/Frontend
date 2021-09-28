<template>
    <div id="writePostUI">
        <div class="form-floating">
            <textarea class="form-control" id="floatingTextarea" style="resize:none; margin-bottom:5px"></textarea>
        </div>
        <div class="Buttons">
            <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
                <input type="file" name="file" style="display:none"/>
                <b-icon icon="camera-fill" type="button" class="camerabtn" onclick="onclick=document.all.file.click()"></b-icon>
            </form>
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
