import Card from './Card.vue'

export default {
  title: 'Blog/Post card',
  component: Card
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Card },
  template: '<Card v-bind="$props" />'
})

export const Default = Template.bind({})

Default.args = {
  post: {
    createdAt: "2021-09-15T01:16:19.162Z",
    author: "Cheryl Dickinson",
    image: "http://placeimg.com/640/480",
    title: "facilis voluptatem repellat",
    intro: "Quis eligendi animi et esse. Aspernatur recusandae impedit porro dolor labore ab. Asperiores harum consectetur distinctio. Aliquam in eligendi. Nostrum et et ipsum possimus tempore quisquam dolore ipsa. Eum laudantium nulla ut molestiae qui ea.",
    text: "Maiores accusantium facere ea voluptatem. Corrupti aspernatur earum molestiae expedita at molestias laudantium eveniet sunt. Enim illum doloribus hic labore beatae dignissimos error dolorum.\n \rExpedita quo qui occaecati quo. Voluptatem accusantium voluptas. Consequuntur eaque inventore dolor molestiae suscipit.\n \rConsequatur consectetur et eos esse. Soluta cupiditate blanditiis qui ea. Vero dolores sit error sequi. Cupiditate aut eligendi.",
    id: "1"
  }
}
