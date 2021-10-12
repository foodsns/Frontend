import { getFirestore, collection, query, startAfter, where, getDocs, FieldValue, orderBy, limit } from 'firebase/firestore'
// , doc, setDoc startAt
export default class FirestoreDao {
    _lastSelectPostsOptions = {}
    _lastSelectPostsDoc = null

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
        return Promise.all(await (await getDocs(queryRef)).docs.map(async item => {
            this._lastSelectPostsDoc = item
            return {
                ...await (item.data()),
                goodMarked: uid ? !await (await getDocs(query(collection(item.ref, 'goods'), where('authorId', '==', uid)))).empty : false
            }
        }))
        .then(posts => {
            return posts.map(item => {
                return {
                    ...item,
                    img: `${item.img}?_${Math.random()}`,
                    profileImg: `${item.profileImg}?_${Math.random()}`,
                    date: new Date(item.date.seconds * 1000).toLocaleDateString()
                }
            })
        })
        .catch(err => {
            console.error(`[firestore.dao] [selectPosts] Cannot get post list: ${err.message}`)
        })
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
