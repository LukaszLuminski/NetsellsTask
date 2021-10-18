import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
// import { addDecorator } from '@storybook/vue';
// import vuetify from './vuetify_storybook';
// import VueScrollactive from 'vue-scrollactive'
// import VueSmoothScroll from 'vue2-smooth-scroll'

// Vue.use(VueScrollactive)
// Vue.use(VueSmoothScroll, {
//   duration: 400,
//   updateHistory: false
// })

// addDecorator(() => ({
//   vuetify,
//   template: `
//     <v-app>
//       <v-main>
//         <v-container fluid >
//           <story />
//         </v-container>
//       </v-main>
//     </v-app>
//     `,
// }));

// export const parameters = {
//   actions: { argTypesRegex: "^on[A-Z].*" },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/,
//     },
//   },
// }