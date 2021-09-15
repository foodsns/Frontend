import { shallowMount } from '@vue/test-utils'
import ProfileIcon from '@/components/ProfileIcon'

const factory = (propsData) => {
    return shallowMount(ProfileIcon, {
      propsData: {
        ...propsData
      }
    })
}

describe('ProfileIcon.vue', () => {
    it('Should render profile img', () => {
        const profileIcon = factory({
        })
        profileIcon.setData({
            profileImg: 'https://avatars.githubusercontent.com/u/16532326?v=4'
        })
        .then(() => {
            expect(profileIcon.vm.$el.querySelector('img').getAttribute('src')).toBe('https://avatars.githubusercontent.com/u/16532326?v=4')
        })
    })
    it('Should render sign in / up div', () => {
        const profileIcon = factory({
        })
        expect(profileIcon.vm.$el.querySelector('div span').textContent).toBe('Sign in / up')
    })
})
