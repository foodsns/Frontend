<template>
<<<<<<< Updated upstream
    <div>
        <b-container fluid="fluid" style="margin-top:1%; position:relative; left:30% ">
            <b-row>
                <b-col sm="10" style="width:30%;">
                    <b-form-textarea id="textarea" v-model="text" no-resize="no-resize"></b-form-textarea>
                </b-col>
                <b-col>
                    <span>
                        <b-row>
                        <b-button type="submit" variant="outline-dark" style="width:7.3%;  margin:auto">입력</b-button>
                        </b-row>
                        <b-row>
                        <form method="post" enctype="multipart/form-data" style="display:inline; margin-left:-10px" >
                            <input
                                type="file"
                                id="imgupload"
                                name="imgupload"
                                accept="image/*"
                                multiple="multiple"
                                @click="PhotoUp(this)"/>
                        </form>
                        </b-row>
                    </span>
                </b-col>
            </b-row>
        </b-container>
=======
    <div id="writePostUI">
        <div class="form-floating">
            <textarea v-model="postctx" class="form-control" id="floatingTextarea" style="resize:none; margin-bottom:5px; height:50%"></textarea>
        </div>
        <div class="Buttons">
            <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
                <input type="file" name="file" style="display:none"/>
                <b-icon icon="camera-fill" type="button" class="camerabtn" onclick="onclick=document.all.file.click()"></b-icon>
            </form>
            <b-button type="submit" pill variant="primary" class="postbtn">확인</b-button>
        </div>
>>>>>>> Stashed changes
    </div>
</template>
<script>
export default {
<<<<<<< Updated upstream
    data() {
        return {context: '', images: ''};
    },
    method: {
        PhotoUp(input) {
            var file = input.files[0];
            var name = document.getElementById('fileName');
            name.textContent = file.name;
            var newImage = document.createElement("img");
            newImage.setAttribute("class", 'img');
            newImage.src = URL.createObjectURL(file);

            newImage.style.width = "70%";
            newImage.style.height = "70%";
            newImage.style.visibility = "hidden"; //버튼을 누르기 전까지는 이미지를 숨긴다
            newImage.style.objectFit = "contain";

            //이미지를 image-show div에 추가
            var container = document.getElementById('image-show');
            container.appendChild(newImage);
        }
    }
=======
    data () {
        return {
        postctx: ''
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
>>>>>>> Stashed changes
}
</script>
