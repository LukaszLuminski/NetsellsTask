import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Articles from '../pages/index.vue'
import Card from '../components/Card.vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'

// 12 posts
import posts from './mockData/posts'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VueRouter)
const router = new VueRouter()
Vue.use(BootstrapVue)

const articlesMock = jest.fn()
articlesMock.mockReturnValue(posts)

const errorMock = jest.fn()
errorMock.mockReturnValue(null)

const pageMock = jest.fn()
pageMock.mockReturnValue(1)

const loadedMock = jest.fn()
loadedMock.mockReturnValue(false)

const searchMock = jest.fn()
searchMock.mockReturnValue('')

const lengthMock = jest.fn()
lengthMock.mockReturnValue(null)

const getters = {
  //12 posts passed to a Vuex getter
  getArticles: articlesMock,
  getError: errorMock,
  getPage: pageMock,
  getLoaded: loadedMock,
  getSearch: searchMock,
  getLength: lengthMock
}

const actions = {
  fetchLength: jest.fn(),
  fetchRange: jest.fn()
}

const mutations = {
  setPage: jest.fn(),
  setSearch: jest.fn(),
  setAppLoaded: jest.fn()
}

const store = new Vuex.Store({
  modules: {
    api: {
      namespaced: true,
      getters,
      mutations,
      actions
    },
  },
})

describe('Articles list component', () => {

  test('Posts are being displayed properly', async () => {
    const wrapper = mount(Articles, {
      localVue,
      store,
      router
    })

    // a Vuex getter has been called to fetch the array of posts
    expect(getters.getArticles).toHaveBeenCalled()

    // there should be 12 posts rendered on the current (first) page, in a reusable component 'Card'
    expect(wrapper.findComponent(Card).exists()).toBe(true)
    expect(wrapper.findAllComponents(Card)).toHaveLength(12)

    // third post on the page
    const thirdPost = wrapper.findAllComponents(Card).at(2)

    // image in the third post
    expect(thirdPost.find('.Card__img'))

    // title of the third post, which will be clicked to 'open' the post
    expect(thirdPost.find('.Card__title').text()).toBe('Test title')

    // intro content of the third post
    expect(thirdPost.find('.Card__intro').text()).toBe('Test intro.')

    // author of the post
    expect(thirdPost.find('.information__author').text()).toBe('Cheryl Dickinson')

    //formatted date of the post
    expect(thirdPost.find('.information__date').text()).toBe('15th Sep 2021')

    // mocking a method that is used to open a single post
    const spyGoTo = jest.spyOn(thirdPost.vm, 'goTo');

    // clicking on the third post title
    await thirdPost.find('.Card__title').trigger('click')

    // method 'goTo', have been called with parameter '3' - the id of the clicked post,
    // which will be used in a router push call
    expect(spyGoTo).toHaveBeenCalledWith(3);
  })
})
