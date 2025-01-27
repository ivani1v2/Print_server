<template>
         <v-dialog
      persistent
      v-model="$store.state.dialogoprogress"
      max-width="200"
      >
    <v-card class="pa-12">
        <v-progress-circular
          :rotate="90"
          :size="100"
          :width="15"
          color="primary"
          indeterminate
        >  
        <v-icon @click="$store.commit('dialogoprogress')" color="red" small>mdi-close</v-icon>
        </v-progress-circular>
    </v-card>
      </v-dialog>

</template>
<script>
export default {
        data() {
        return{
            
        }
        },
        methods:{
        }
        
}

</script>
