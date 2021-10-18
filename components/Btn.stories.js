import Btn from './Btn.vue'

export default {
  title: 'Blog/Button',
  component: Btn,
  argTypes: {
    onClick: {
      action: ('clicked')
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Btn },
  template: '<btn @clicked="onClick" v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  label: 'Go back'
}
