import { getFirestore, collection, query, where, getDocs, FieldValue, orderBy, limit } from 'firebase/firestore'
// , doc, setDoc startAt
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
        goodOrderByDir = 'desc',
        dateOrderByDir = 'desc',
        fromLast = false,
        pageSize = 8,
        includeMine = false,
        country,
        city,
        state,
        street,
        uid
    } = {}) {
        const db = getFirestore()
        const queryRef = query(collection(db, 'posts'),
                                orderBy('good', goodOrderByDir), orderBy('date', dateOrderByDir),
                                where('visibility', '==', 'public'),
                                where('country', '==', country), where('city', '==', city), where('state', '==', state), where('street', '==', street),
                                // where('authorId', '!=', uid),
                                // where('lat', '>', lat - this.km2Lat(distance)), where('lat', '<', lat - this.km2Lat(distance)),
                                // where('lot', '>', lot - this.km2Lot(lat, distance)), where('lot', '<', lot - this.km2Lot(lat, distance)),
                                limit(pageSize))
                                // https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=ko#paginate_a_query
                                // startAfter 는 마지막 문서를 기준
        // console.log(await (await getDocs(queryRef)).data())
        // console.log(await (await getDocs(queryRef)).docs, await (await getDocs(queryRef)).query)
        console.log(await Promise.all(await (await getDocs(queryRef)).docs.map(async item => {
            return {
                ...await (item.data()),
                goodMarked: !await (await getDocs(query(collection(item.ref, 'goods'), where('authorId', '==', uid)))).empty
            }
        })))
        // const [checkGoodMarkedAndPublicOtherPostList, checkGoodMarkedMyPostList] = await Promise.all([
        //     // 내가 쓴게 아니고 공개 게시물이고, 내가 좋아요를 표시했었는지
        //     Promise.all(await (await getFirestore(myAuth).collection("posts").where("authorId", "!=", myAuth.uid).where("visibility", "==", "public").get()).docs.map(async item => {
        //         return {
        //             ...(await item.data()),
        //             goodMarked: !await (await item.ref.collection("goods").where("authorId", "==", myAuth.uid).get()).empty
        //         }
        //     })),
        //     // 내가 썼지만 위의 데이터 포맷을 맞추기 위함
        //     Promise.all((await getFirestore(myAuth).collection("posts").where("authorId", "==", myAuth.uid).get()).docs.map(async item => {
        //         return {
        //             ...(await item.data()),
        //             goodMarked: false
        //         }
        //     }))
        // ])
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
