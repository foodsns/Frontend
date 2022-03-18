import ValidateModule from '@/module/validate.js'

describe('Validate Module', () => {
    it('If filename is empty in File structure', () => {
        expect(
            new ValidateModule().isFileStructureHasName(new File(['foo'], null, {
                type: 'text/plain'
              }))
        )
            .toEqual('undefined.png')
    })
    it('If filename is exist in File structure', () => {
        expect(
            new ValidateModule().isFileStructureHasName(new File(['foo'], 'this is file name.txt', {
                type: 'text/plain'
              }))
        )
            .toEqual('this is file name.txt')
    })
    it('If filename is empty in File structure, and passed custom file name', () => {
        expect(
            new ValidateModule().isFileStructureHasName(new File(['foo'], null, {
                type: 'text/plain'
              }), 'custom name.txt')
        )
            .toEqual('custom name.txt')
    })
    it('If filename is exist in File structure', () => {
        expect(
            new ValidateModule().isFileStructureHasName(new File(['foo'], 'this is file name.txt', {
                type: 'text/plain'
              }), 'custom name.txt')
        )
            .toEqual('this is file name.txt')
    })
})
