import { shallowMount } from '@vue/test-utils'
import LoginBoard from '@/components/LoginBoard'

const factory = (propsData) => {
    return shallowMount(LoginBoard, {
      propsData: {
        ...propsData
      }
    })
}

describe('LoginBoard.vue', () => {
    it('Sign in / up error msg must show', () => {
        const loginBoard = factory({
        })
        loginBoard.vm.onError('This is error')
        expect(loginBoard.vm.error).toBe('This is error')
        loginBoard.setData({error: 'This is error'})
        .then(() => {
            expect(loginBoard.vm.$el.querySelector('#loginError').textContent.trim()).toBe('This is error')
        })
    })
})
