import { shallowMount } from '@vue/test-utils'
import Random from '@/components/Random'

const factory = (propsData) => {
    return shallowMount(Random, {
      propsData: {
        ...propsData
      }
    })
}

describe('Random.vue', () => {
    it('There should be a random button.', () => {
        const Random = factory({})
        expect(Random.vm.$el.querySelectorAll('b-button').length).toBe(1)
    })
})