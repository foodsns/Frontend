import { shallowMount } from '@vue/test-utils'
import InfiniteScroll from '@/components/InfiniteScroll'

const factory = (propsData) => {
    return shallowMount(InfiniteScroll, {
      propsData: {
        ...propsData
      }
    })
}

describe('InfiniteScroll.vue', () => {
    it('Should not render infinite scroll when client height + threshold >= scroll height', () => {
        const infiniteScroll = factory({
            clientHeight: 300,
            scrollHeight: 500,
            scrollTop: 0,
            thresholdProp: 200,
            messageProp: ''
        })

        expect(infiniteScroll.vm.$el.querySelectorAll('span').length).toBe(0)
    })
    it('Should not render infinite scroll when threshold <= 100', () => {
        const infiniteScroll = factory({
            clientHeight: 300,
            scrollHeight: 500,
            scrollTop: 0,
            thresholdProp: 100,
            messageProp: ''
        })

        expect(infiniteScroll.vm.$el.querySelectorAll('span').length).toBe(0)
    })
    it('Should render infinite scroll [Scroll down more msg]', () => {
        const infiniteScroll = factory({
            clientHeight: 976,
            scrollHeight: 1575,
            scrollTop: 0,
            thresholdProp: 200,
            messageProp: ''
        })
        expect(infiniteScroll.vm.$el.querySelector('span > span').textContent).toContain('아래로 내려 더 많은 리뷰를 확인하세요')
        expect(infiniteScroll.vm.appendHeightCalc).toBe(false)
    })
    it('Should render infinite scroll [Still show scroll down more msg]', () => {
        const infiniteScroll = factory({
            clientHeight: 976,
            scrollHeight: 1575,
            scrollTop: 558,
            thresholdProp: 200,
            messageProp: ''
        })
        // 976 + 558 = 1534, 1575 - 200 = 1375, 1536 - 1375 = 159
        // 200 / 5 * 4 = 160
        expect(infiniteScroll.vm.$el.querySelector('span > span').textContent).toContain('아래로 내려 더 많은 리뷰를 확인하세요')
        expect(infiniteScroll.vm.appendHeightCalc).toBe(false)
    })
    it('Should render infinite scroll [Searching msg]', () => {
        const infiniteScroll = factory({
            clientHeight: 976,
            scrollHeight: 1575,
            scrollTop: 560,
            thresholdProp: 200,
            messageProp: ''
        })
        // 976 + 560 = 1536, 1575 - 200 = 1375, 1536 - 1375 = 161
        // 200 / 5 * 4 = 160
        expect(infiniteScroll.vm.$el.querySelector('span > span').textContent).toContain('새로운 리뷰가 있는지 찾아보는 중')
        expect(infiniteScroll.vm.appendHeightCalc).toBe(true)
    })
    it('Should render msg instead of searching msg', () => {
        const infiniteScroll = factory({
            clientHeight: 976,
            scrollHeight: 1575,
            scrollTop: 560,
            thresholdProp: 200,
            messageProp: 'hello'
        })
        // 976 + 560 = 1536, 1575 - 200 = 1375, 1536 - 1375 = 161
        // 200 / 5 * 4 = 160
        expect(infiniteScroll.vm.$el.querySelector('span').textContent).toContain('hello')
        expect(infiniteScroll.vm.appendHeightCalc).toBe(false)
    })
    it('Check default', () => {
        const infiniteScroll = factory({
        })
        expect(infiniteScroll.vm.message).toBe('')
        expect(infiniteScroll.vm.clientHeight).toBe(0)
        expect(infiniteScroll.vm.scrollHeight).toBe(0)
        expect(infiniteScroll.vm.scrollTop).toBe(0)
        expect(infiniteScroll.vm.threshold).toBe(0)
    })
})
