<template>
  <div id="postbox">
    <div class="thumbnail-img"></div>
    <div>
        <h4>This is title</h4>
        <p>This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.</p>
        <div class="text-date">2021년 9월 4일</div>
        <hr>
        <div class="footer">
            <img class="profile-img" src="../assets/logo.png"/>
            <span class="writer">by <span class="bold">stories2</span></span>
            <font-awesome-icon icon="heart" class="gap_margin_5px_horizontal"/>
            <span class="gap_margin_5px_horizontal">105</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postbox',
  data () {
    return {
        msg: 'post box component'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#postbox {
    width: 300px;
    margin: 5px;
    border-radius: 10px;
    background-color: white;
    padding: 0 5px 5px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: .4s;
    text-align: left;
}
#postbox:hover {
    transform: translate(0, -30px);
}
.thumbnail-img {
    width: 100%;
    height: 150px;
    background-image: url('../assets/logo.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.profile-img {
    width: 32px;
    height: 32px;
    border-radius: 16px;
}

p {
    height: 150px;
    overflow:hidden;
    text-overflow:ellipsis;
    overflow-wrap: break-word;
    word-break: break-word;
}

.text-date {
    font-size: 0.9em;
}

.footer {
    display: flex;
    flex-direction: row;
}

.writer {
    flex-grow: 1;
}

.writer .bold {
    font-weight: bold;
}

.gap_margin_5px_horizontal {
    margin: 0 5px;
}
</style>
