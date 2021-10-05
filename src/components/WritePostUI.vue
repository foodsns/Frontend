<template>
<<<<<<< Updated upstream
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
=======
    <div id="writePostUI" style="position: relative">
            <div>
              <div class="form-floating">
                <textarea class="form-control" value="inputText" id="floatingTextarea" placeholder="내용입력" @keyup.#="hashE" enctype="multipart/form-data" style="resize:none; margin-bottom:5px"></textarea>
              </div>
            </div>
            <div class="Buttons">
              <form action="upload" id="uploadForm" method="post" style="display:inline; margin-right:5px">
                <label class="btn btn-primary" pill variant="primary" for="filebtn">
                  사진
                </label>
                <input type="file" id="filebtn" @change="uploadPhoto()" style="display:none" accept="image/*" multiple/>
            </form>
              <button type="submit" class="btn btn-success" id="postbtn">확인</button>
            </div>
          </div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        postctx: ''
=======
            inputText: '',
            hashtag: [],
            hash_count: 0
        }
    },
    methods: {
        uploadPhoto: function (e) {
            console.log('uploadPhoto :', e)
            if (e.target.files) {
                var fileList = e.target.files
                var maxSize = 3 * 1024 * 1024
                for (const file of fileList) {
                    if (file.size > maxSize) {
                        alert(file.name + ' : 3MB이하 이미지만 가능합니다.')
                        return false
                    }
                }
            }
>>>>>>> Stashed changes
        }
    }
}

</script>
<style>
<<<<<<< Updated upstream
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
=======
#form-control{
    resize : none;
    margin-bottom : 5px;
    height:50%;
    position : relative;
}

.postbtn{
  padding: 6px 25px;
  background-color:#FF6600;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

</style>
>>>>>>> Stashed changes
