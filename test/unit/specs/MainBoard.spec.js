import Vue from 'vue'
import MainBoard from '@/components/MainBoard'

describe('MainBoard.vue', () => {
  it('should render hello world msg', () => {
    const Constructor = Vue.extend(MainBoard)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent)
      .toEqual('hello world')
  })
})
