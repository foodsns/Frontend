import { getApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default class FirebaseStorage {
    storage = null
    constructor () {
        const firebaseApp = getApp()
        this.storage = getStorage(firebaseApp)
    }

    uploadFile (docID, file) {
        const imgRef = ref(this.storage, `posts/sadfsadf/mountains.jpg`)
        return uploadBytes(imgRef, file)
        .then((uploadResult) => getDownloadURL(uploadResult.ref))
    }
}
