// import { shallowMount, mount } from '@vue/test-utils'
// // import { render } from '@vue/server-test-utils'
// // import App from '@/App'
// import KakaoMap from '@/components/KakaoMap'

// const factory = (propsData) => {
//     return shallowMount(KakaoMap, {
//       propsData: {
//         ...propsData
//       }
//     })
// }

// const factoryMount = (propsData) => {
//     return mount(KakaoMap, {
//       propsData: {
//         ...propsData
//       }
//     })
// }

// describe('KakaoMap.vue', () => {
//     it('Should render map', (done) => {
//         // const app = mount(App)
//         const kakaoMapComponent = factoryMount({
//             dev: true
//         })
//         kakaoMapComponent.vm.initKakaoMap()
//         .then(() => kakaoMapComponent.vm.$nextTick())
//         .then(() => {
//             // kakaoMapComponent.vm.$forceUpdate()
//             // .then(() => {
//             // })
//             console.log('kakao map', kakaoMapComponent.vm.$el.innerHTML)
//             done()
//         })
//         .catch(err => {
//             console.error('kakao map error', err)
//         })
//         // render(KakaoMap)
//         // .then((wrapper) => {
//         //     console.log('kakao map', wrapper.html())
//         // })
//     }, 5000)
// })
