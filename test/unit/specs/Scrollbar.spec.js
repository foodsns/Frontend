import { shallowMount } from '@vue/test-utils'
import Scrollbar from '@/components/Scrollbar'

const factory = (propsData) => {
    return shallowMount(Scrollbar, {
      propsData: {
        ...propsData
      }
    })
}

describe('Scrollbar.vue', ()=>{
    it('need to adjust the distance', () => {
        const scrollbar = factory({
            
        })
    })
})