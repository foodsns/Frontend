import { shallowMount } from '@vue/test-utils'
import GridMapToggle from '@/components/GridMapToggle'

const factory = (propsData) => {
    return shallowMount(GridMapToggle, {
      propsData: {
        ...propsData
      }
    })
}

describe('GridMapToggle.vue', () => {
    it('Current mode should be [map]', () => {
        const gridMapToggle = factory({
            mode: 'map'
        })
        expect(gridMapToggle.vm.$el.querySelectorAll('b-button').length).toBe(2)
        expect(gridMapToggle.vm.$el.querySelectorAll('b-button')[1].getAttribute('variant')).toBe('warning')
        gridMapToggle.find('b-button:nth-child(1)').trigger('click')
        .then(() => {
            expect(gridMapToggle.vm.$el.querySelectorAll('b-button').length).toBe(2)
            expect(gridMapToggle.vm.$el.querySelectorAll('b-button')[0].getAttribute('variant')).toBe('warning')
            expect(gridMapToggle.vm.currentMode).toBe('grid')
        })
    })

    it('Toggle mode by method', () => {
        const gridMapToggle = factory({
            mode: 'map'
        })
        expect(gridMapToggle.vm.currentMode).toBe('map')
        gridMapToggle.vm.toggleMode('grid')
        expect(gridMapToggle.vm.currentMode).toBe('grid')
    })

    it('If insert unexpected value it should be chage to [map]', () => {
        const gridMapToggle = factory({
            mode: 'grid'
        })
        expect(gridMapToggle.vm.currentMode).toBe('grid')
        gridMapToggle.vm.toggleMode('unexpected')
        expect(gridMapToggle.vm.currentMode).toBe('map')
    })
})
