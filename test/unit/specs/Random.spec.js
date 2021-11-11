import { shallowMount } from '@vue/test-utils'
import Random from '@/components/Random'

const factory = (propsData) => {
    return shallowMount(Random, {
      propsData: {
        ...propsData
      }
    })
}

const HASHTAG_LIST = [
  ['#맛집', 3],
  ['#삼성컨퍼런스', 1],
  ['#코코로벤또', 1],
  ['#온더보더', 1],
  ['#롯데월드', 1],
  ['#아웃백', 1]
]

describe('Random.vue', () => {
    it('There should be a random button.', () => {
        const Random = factory({})
        expect(Random.vm.$el.querySelectorAll('b-button').length).toBe(1)
    })

    it('Return hashtag passed by set data when it dev mode', () => {
      const random = factory({})
      random.setData({
        hashTagList: HASHTAG_LIST
      })
      .then(() => {
        expect(random.vm.loadHashTagList(true)).toBe()
      })
    })
})
