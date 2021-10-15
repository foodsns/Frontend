 <template>
<div>
     <b-container>
         <h4 v-show="value" class= "mx-auto">좋아요 누른 목록 표시</h4>
         <grid-board v-bind:postListProps="postList"/>
     </b-container>
     <div>
    <b-button  v-on:click="back()" class="back-btn" pill variant="outline-danger">
        <b-icon icon="arrow90deg-left" ></b-icon> Back
    </b-button>
</div>
</div>
</template>

<script>
import Vue from 'vue'
import FirestoreDao from '../module/firestore.dao'
// import {EventBus} from '../lib/event-bus.js'
export default {
    props: ['liked'],
    components: {

    },
    data () {
        return {
            value: false,
            firestoreDao: new FirestoreDao(),
            postList: []
        }
    },
    mounted () {
        this.selectMyThumbsUpPosts()
    },
    methods: {
        back: function () {
            this.$router.push('MainBoard')
        },
        selectMyThumbsUpPosts: function () {
            this.firestoreDao.selectMyThumbsUpPosts({
                lat: 37.566227,
                lot: 126.977966,
                distance: 1,
                sortByRecently: true,
                pageSize: 8,
                // country = null,
                // city = null,
                // state = null,
                // street = null,
                uid: Vue.prototype.$firebaseAuth.getCurrentUserUid()
            })
            .then(postList => {
                this.postList.splice(0)
                return postList
            })
            .then(_postList => {
                _postList.forEach(post => this.postList.push(post))
            })
        }
    }
}
</script>

<style scoped>

.back-btn{
    position : fixed;
    bottom : 130px;
    width : 90px;
    right : 30px;
    border: 5px;
    }

</style>
