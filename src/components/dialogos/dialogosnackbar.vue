<template>

    <div class="text-center">
      <v-snackbar
        v-model="$store.state.dialogosnackbar"
        :timeout="timeout"
        top
      >
        {{ $store.state.textosnackbar }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="$store.commit('dialogosnackbar','')"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>


</template>
<script>
export default {
        data() {
        return{
            timeout: 2500,
        }
        },
        methods:{
        }
        
}

</script>
