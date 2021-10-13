import { getFirestore, collection, collectionGroup, query, startAfter, where, getDocs, getDoc, FieldValue, orderBy, limit } from 'firebase/firestore'
// , doc, setDoc startAt
export default class FirestoreDao {
    _lastSelectPostsOptions = {}
    _lastSelectPostsDoc = null
    _lastSelectThumbsUpPostsOptions = {}
    _lastSelectThumbsUpPostsDoc = null

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

    km2Lat (km) {
        return 1 / 110.574 * km
    }

    km2Lot (lat, km) {
        return 1 / (111.320 * Math.cos(lat * (Math.PI / 180))) * km
    }

    // https://stackoverflow.com/a/26578323/7270469
    // 게시물을 좋아요 기준 정렬하는데 공개형, 같은 나라, 같은 시도, 같은 시군구, 같은 읍면동을 기준으로 페이징 기법을 사용함
    // 자신의 게시물 중 비공개형이 보이지 않으므로 따로 조회하는 api 호출해야 함 (추후 변동될 수 있음)
    async selectPosts ({
        lat = 37.566227,
        lot = 126.977966,
        distance = 1,
        sortBy = 'best',
        pageSize = 8,
        includeMine = false,
        country,
        city,
        state,
        street,
        uid
    } = {}) {
        let goodOrderByDir = 'desc'
        let dateOrderByDir = 'desc'
        switch (sortBy) {
            case 'best':
                goodOrderByDir = 'desc'
                dateOrderByDir = 'desc'
                break
            case 'recent':
                goodOrderByDir = 'asc'
                dateOrderByDir = 'desc'
                break
        }
        const db = getFirestore()
        // https://stackoverflow.com/a/50658718/7270469
        const constraints = [
            orderBy('good', goodOrderByDir), orderBy('date', dateOrderByDir),
            where('visibility', '==', 'public'),
            where('country', '==', country), where('city', '==', city), where('state', '==', state), where('street', '==', street)]

        if (JSON.stringify(this._lastSelectPostsOptions) !== JSON.stringify({
            lat,
            lot,
            distance,
            sortBy,
            pageSize,
            includeMine,
            country,
            city,
            state,
            street,
            uid
        }) || !this._lastSelectPostsDoc) {
            this._lastSelectPostsOptions = {
                lat,
                lot,
                distance,
                sortBy,
                pageSize,
                includeMine,
                country,
                city,
                state,
                street,
                uid
            }
        } else {
            constraints.push(startAfter(this._lastSelectPostsDoc))
        }
        constraints.push(limit(pageSize))
        const queryRef = query(collection(db, 'posts'), ...constraints)
        // [
        //     {
        //         authorId: "vQKAPO2qdNKUn5zn5Ahi"
        //         city: "서울특별시"
        //         country: "Korea"
        //         date: nt {seconds: 1633867884, nanoseconds: 893000000}
        //         descript: "37.075, 127.527"
        //         good: 999602
        //         goodMarked: false
        //         hashtag: "DarkMagenta"
        //         id: "dummy_vQKAPO2qdNKUn5zn5Ahi"
        //         img: "https://picsum.photos/200/300"
        //         lat: 33.35329404385084
        //         lot: 126.23775929756054
        //         profileImg: "https://picsum.photos/64/64"
        //         state: "중구"
        //         street: "정동"
        //         title: "dummy"
        //         visibility: "public"
        //         writer: "vQKAPO2qdNKUn5zn5Ahi"
        //     },
        //     ...
        // ]
        return Promise.all((await getDocs(queryRef)).docs.map(async item => {
            this._lastSelectPostsDoc = item
            const data = item.data()
            return {
                ...data,
                goodMarked: uid ? !(await getDocs(query(collection(item.ref, 'goods'), where('authorId', '==', uid)))).empty : false,
                img: `${data.img}?_${Math.random()}`,
                profileImg: `${data.profileImg}?_${Math.random()}`,
                date: new Date(data.date.seconds * 1000).toLocaleDateString()
            }
        }))
        .catch(err => {
            console.error(`[firestore.dao] [selectPosts] Cannot get post list: ${err.message}`)
        })
    }

    // 내가 좋아요 표시한 게시물을 최근 혹은 예전에 추가했었는지로 정렬하는 쿼리
    async selectMyThumbsUpPosts ({
        lat = 37.566227,
        lot = 126.977966,
        distance = 1,
        sortByRecently = true,
        pageSize = 8,
        // country = null,
        // city = null,
        // state = null,
        // street = null,
        uid
    } = {}) {
        const constraints = [
            orderBy('setTime', sortByRecently ? 'desc' : 'asc'),
            where('authorId', '==', uid)]
        if (JSON.stringify(this._lastSelectThumbsUpPostsOptions) !== JSON.stringify({
            lat,
            lot,
            distance,
            sortByRecently,
            pageSize,
            // country,
            // city,
            // state,
            // street,
            uid
        }) || !this._lastSelectThumbsUpPostsDoc) {
            this._lastSelectThumbsUpPostsOptions = {
                lat,
                lot,
                distance,
                sortByRecently,
                pageSize,
                // country,
                // city,
                // state,
                // street,
                uid
            }
        } else {
            constraints.push(startAfter(this._lastSelectThumbsUpPostsDoc))
        }
        constraints.push(limit(pageSize))
        const db = getFirestore()
        return Promise.allSettled((await getDocs(query(collectionGroup(db, 'goods'), ...constraints))).docs.map(async item => {
            this._lastSelectThumbsUpPostsDoc = item
            return {
                ...(await getDoc(item.ref.parent.parent)).data(),
                goodMarked: true
            }
        }))
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
