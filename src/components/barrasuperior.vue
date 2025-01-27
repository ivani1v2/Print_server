<template>
    <nav>
        <v-app-bar app color="black" dark elevate-on-scroll dense>
            <div class="d-flex align-center">

                <v-btn v-if="!barra" @click="drawer = !drawer" fab x-small>
                    <v-app-bar-nav-icon x-small color="white">
                    </v-app-bar-nav-icon>
                </v-btn>
                <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
                    src="domotica.png" width="100" />
            </div>

            <v-spacer></v-spacer>


        </v-app-bar>

        <v-navigation-drawer v-if="!barra" v-model="drawer" temporary app>

            <v-list-item class="px-3">
                <v-list-item-avatar>
                    <v-img
                        src="https://firebasestorage.googleapis.com/v0/b/mitienda-f5ef8.appspot.com/o/carpetaiconos%2Ficono25?alt=media&token=9ead45f5-7735-4386-8647-e1d80cc913ab"></v-img>
                </v-list-item-avatar>

                <v-list-item-title class="mb-2">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <span style="font-size: 0.8em; color: #FF2D00;">Usuario:</span>

                        </v-col>
                        <v-col cols="12">
                            <span style="font-size: 0.8em ; text-transform:uppercase">{{ nombreusuario }}</span>
                        </v-col>
                    </v-row>

                </v-list-item-title>

                <v-btn icon @click.stop="drawer = !drawer">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item link @click.prevent="router('panel')">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Impresoras</v-list-item-title>
                    </v-list-item-content>

                </v-list-item>



                <v-spacer></v-spacer>
                <v-divider></v-divider>

                <v-list-item v-if="user == 'ivanac1992@domotica.com'" @click.prevent="router('panelgeneral')">
                    <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Admin</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link @click.prevent="router('miempresa')">
                    <v-list-item-icon>
                        <v-icon>mdi-cog-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Configuracion</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item @click.prevent="accion('Cerrar Sesion')">
                    <v-list-item-icon>
                        <v-icon>mdi-logout-variant</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Cerrar Sesion</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>


        <dialogoprogress />
        <dialogosnackbar />
    </nav>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase'
import { insertar_uno } from '../db_mongo';
import {
    obtenerBD,
    allConfigura,
    allUsuarios,
} from '../db'
import store from '@/store/index'

import dialogoprogress from '@/components/dialogos/dialogoprogress'
import dialogosnackbar from '@/components/dialogos/dialogosnackbar'


export default {
    name: 'barrasuperior',

    components: {

        dialogoprogress,
        dialogosnackbar
    },
    data() {
        return {
            drawer: false,
            dialog: false,
            barra: false,
            nombreusuario: '',
            user: '',
        }
    },
    beforeCreate() {

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.user = user.email
                this.nombreusuario = user.email.slice(0, -13)
                this.barra = false
                //this.obtenEmpresa()  //  habilitar solo para crear usuarios
                this.obtenerDatausuario(user.email)
            } else {
                this.user = null
                store.commit('BD', '')

            }
        })
    },
    methods: {
        accion(accion) {
            if (accion == "Cerrar Sesion") {
                firebase.auth().signOut().then(() => {
                    this.$router.push({
                        name: 'Home'
                    })
                    this.barra = true
                    store.commit('BD', '')
                })
            }
            if (accion == "paneladmin") {
                this.$router.push({
                    name: 'paneladmin'
                })
            }
        },
        router(view) {
            this.$router.push({
                name: view
            })
        },
        async obtenerDatausuario(user) {
            var snapshot = await allUsuarios().orderByChild('correo').equalTo(user).once("value")
            if (snapshot.exists()) {
                snapshot.forEach((item) => {
                    this.bd = item.val().bd
                    console.log(item.val())
                    //  insertar_uno('usuario', 1, item.val())
                    store.commit('permisos', item.val())
                })
                this.obtenerCliente(this.bd)
            }
        },
        async obtenerCliente(BD) {
            var snapshot = await obtenerBD(BD).once("value")
            store.commit('BD', snapshot.val())
            console.log(snapshot.val())
            //insertar_uno('empresa', 1, snapshot.val())
            if (snapshot.exists()) {
                this.obtenconfiguracion()
            } else {
                alert('Empresa sin informacion')
            }
        },
        async obtenconfiguracion() {
            allConfigura().once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    store.commit('configuracion', snapshot.val())
                }
            })
        },

        opcionCaja() {
            if (store.state.baseDatos.caja2) {
                this.$router.push({
                    name: 'caja2'
                })
            }
        },
        opcionCaja2() {
            if (store.state.baseDatos.caja2) {
                this.$router.push({
                    name: 'caja_pc'
                })
            }
        },


    },


}
</script>
