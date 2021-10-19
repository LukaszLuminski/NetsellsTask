import PostInfo from './PostInfo.vue'

export default {
  title: 'Blog/Post information',
  component: PostInfo
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PostInfo },
  template: '<post-info v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  postInfo: {
    author: 'Cheryl Dickinson',
    date: '2021-09-15T01:16:19.162Z'
  }
}
