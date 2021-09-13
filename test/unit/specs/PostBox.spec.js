import { shallowMount } from '@vue/test-utils'
import PostBox from '@/components/PostBox'

const factory = (propsData) => {
    return shallowMount(PostBox, {
      propsData: {
        ...propsData
      }
    })
}

describe('PostBox.vue', () => {
    it('Should slice too long descript (200 len max)', () => {
        const postBox = factory({
            post: {
                title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                descript: 'TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTEST',
                date: '2021년 9월 4일',
                profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                good: 105
            }
        })
        expect(postBox.vm.cutDescript).toBe('TESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTTESTT...')
    })

    it('Should render empty info text when descript is null', () => {
        const postBox = factory({
            post: {
                title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                date: '2021년 9월 4일',
                profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                good: 105
            }
        })
        expect(postBox.vm.cutDescript).toBe('본문이 비어있습니다.')
    })

    it('Should render descript', () => {
        const postBox = factory({
            post: {
                title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
                descript: 'This is description.This is description.',
                date: '2021년 9월 4일',
                profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
                writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
                good: 105
            }
        })
        expect(postBox.vm.cutDescript).toBe('This is description.This is description.')
    })
})
