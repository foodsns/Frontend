import { collection, doc, setDoc, getDoc, FieldValue } from 'firebase/firestore'

export default class FirestoreDao {
    generateGuid () {
        var result, i, j
        result = ''
        for (j = 0; j < 32; j++) {
          if (j === 8 || j === 12 || j === 16 || j === 20) { result = result + '-' }
          i = Math.floor(Math.random() * 16).toString(16).toUpperCase()
          result = result + i
        }
        return result
    }

    // https://stackoverflow.com/a/26578323/7270469
    selectPosts ({
        lat = 37.566227,
        lot = 126.977966,
        distance = 1,
        orderBy = 'goods',
        page = 0,
        pageSize = 8,
        includeMine = false
    } = {}) {

    }

    selectMyThumbsUpPosts ({
        lat = 37.566227,
        lot = 126.977966,
        distance = 1,
        orderBy = 'goods',
        page = 0,
        pageSize = 8
    } = {}) {
    }

    selectMyPosts ({
        lat = 37.566227,
        lot = 126.977966,
        distance = 1,
        orderBy = 'goods',
        page = 0,
        pageSize = 8
    } = {}) {
    }

    signUpMyInfo ({
        displayName,
        email,
        emailVerified = false,
        photoURL,
        lastLogin
    } = {}) {
    }

    insertPost ({
        id = this.generateGuid(),
        title,
        descript,
        date = FieldValue.serverTimestamp(),
        profileImg,
        writer,
        good = 0,
        img,
        lat,
        lot,
        visibility = 'public',
        authorId,
        country,
        city,
        state,
        street,
        hashtag
    } = {}) {
    }

    updatePost ({
        title,
        descript,
        date = FieldValue.serverTimestamp(),
        profileImg,
        writer,
        img,
        lat,
        lot,
        visibility = 'public',
        country,
        city,
        state,
        street,
        hashtag
    } = {}) {
    }

    deletePost (postId) {
    }

    thumbsUpPost (postId, uid) {
    }

    thumbsDownPost (postId, uid) {
    }
}
