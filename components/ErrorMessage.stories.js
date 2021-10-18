import ErrorMessage from './ErrorMessage.vue'

export default {
  title: 'Blog/Error Message',
  component: ErrorMessage
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ErrorMessage },
  template: '<error-message v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  apiError: null,
  content: 'No results.',
  top: 50
}

export const ApiError = Template.bind({})

ApiError.args = {
  apiError: { message: 'Network Error' },
  content: 'If the problem persists, try again later',
  top: 50
  
}

export const ChangePosition = Template.bind({})

ChangePosition.args = {
  apiError: { message: 'Network Error' },
  content: 'If the problem persists, try again later',
  top: 130
  
}