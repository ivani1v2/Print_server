<template>
  <v-app>
    <v-container grid-list-xs>
      <barrasuperior />
    </v-container>
    <router-view class="mt-6"></router-view>

    <v-footer dark padless absolute>
      <v-card class="flex" flat tile>

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>Domotica Inc.</strong>
        </v-card-text>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
import barrasuperior from '../src/components/barrasuperior.vue'
export default {
  name: 'App',
  components: {
    barrasuperior

  },
  data: () => ({
    //
  }),
};
</script>
