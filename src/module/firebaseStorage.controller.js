import { getApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { isFileStructureHasName } from './validate'

export default class FirebaseStorage {
    storage = null
    constructor () {
        const firebaseApp = getApp()
        this.storage = getStorage(firebaseApp)
    }

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

    uploadFile (docID, file) {
        const imgRef = ref(this.storage, `posts/${docID}/${this.generateGuid()}.${isFileStructureHasName(file).split('.').pop()}`)
        return uploadBytes(imgRef, file)
        .then((uploadResult) => getDownloadURL(uploadResult.ref))
    }
}
