import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.orange.darken1,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
        background: colors.grey.lighten4,
      },
      dark: {
        primary: colors.orange.darken1,
        secondary: colors.grey.darken2,
        background: colors.grey.darken4,
      },
    },
  },
});
