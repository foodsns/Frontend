import { shallowMount } from '@vue/test-utils'
import InfiniteScrollGap from '@/components/InfiniteScrollGap'

const factory = (propsData) => {
    return shallowMount(InfiniteScrollGap, {
      propsData: {
        ...propsData
      }
    })
}

describe('InfiniteScrollGap.vue', () => {
    it('Should height 0 when client height + threshold < scroll height', () => {
        const infiniteScroll = factory({
            clientHeight: 2000,
            scrollHeight: 2201,
            thresholdProp: 200
        })

        expect(infiniteScroll.vm.calcHeightGap()).toBe(0)
    })
    it('Should height equal scrollHeight when client height + threshold == scroll height', () => {
        const infiniteScroll = factory({
            clientHeight: 2000,
            scrollHeight: 2200,
            thresholdProp: 200
        })

        expect(infiniteScroll.vm.calcHeightGap()).toBe(2200)
    })
    it('Should height more than 0 when client height + threshold >= scroll height', () => {
        const infiniteScroll = factory({
            clientHeight: 2000,
            scrollHeight: 1500,
            thresholdProp: 200
        })

        expect(infiniteScroll.vm.calcHeightGap()).toBeGreaterThan(0)
    })
})
