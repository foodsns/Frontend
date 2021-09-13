import MainBoard from '@/components/MainBoard'
import { shallowMount } from '@vue/test-utils'

const factory = (propsData) => {
    return shallowMount(MainBoard, {
      propsData: {
        ...propsData
      }
    })
}

describe('MainBoard.vue', () => {
  it('Should render 8 items', () => {
    const mainBoard = factory({})
    mainBoard.setData({
        postList: [
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          },
          {
            title: '게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀게시물 타이틀',
            descript: 'This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.This is description.',
            date: '2021년 9월 4일',
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4',
            writer: 'stories2stories2stories2stories2stories2stories2stories2stories2stories2',
            good: 105,
            img: 'https://user-images.githubusercontent.com/16532326/132641481-95f52b8d-5069-4c20-ad52-866b1276899c.png'
          }
        ]
    })
    .then(() => {
        expect(mainBoard.vm.$el.querySelectorAll('post-box').length).toEqual(8)
    })
  })
})
