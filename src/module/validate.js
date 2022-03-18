export default class ValidateModule {
    isFileStructureHasName (file, defaultName = 'undefined.png') {
        return (file.name == null || file.name.split('.').length <= 1) ? defaultName : file.name
    }
}
