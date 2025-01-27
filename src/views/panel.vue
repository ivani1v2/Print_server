<template>
    <div class="pa-4 mb-5">
        <v-container>
            <v-row class="mb-4 mt-3 d-flex justify-center">
                <v-col cols="12" md="8">
                    <v-card>
                        <v-card-title class="headline justify-center">
                            Lista de Impresoras 3
                        </v-card-title>
                        <v-card-subtitle class="text-center">
                            Servidor: {{ serverIP }}:{{ serverPort }}
                        </v-card-subtitle>
                        <v-card-text>
                            <v-simple-table dense>
                                <thead>
                                    <tr>
                                        <th>Nombre de la Impresora</th>
                                        <th>ID de Dispositivo</th>
                                        <th>Tipo</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(printer, index) in impresoras" :key="index">
                                        <td>{{ printer.name }}</td>
                                        <td>{{ printer.deviceId }}</td>
                                        <td>{{ printer.tipo }}</td>
                                        <td>
                                            <v-icon color="green" @click="editar = true, seleccionar_imp(printer)">
                                                mdi-pencil
                                            </v-icon>
                                            <v-icon color="red" @click="eliminarImpresora(printer, index)">
                                                mdi-delete
                                            </v-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn small color="secondary" @click="ver_impresoras">
                                ver Impresoras
                            </v-btn>
                            <v-btn small color="primary" @click="guardarImpresoras">
                                Sincroniza Config.
                            </v-btn>

                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="dial_impresoras" max-width="400px">
            <div>
                <v-system-bar window dark>
                    <v-icon @click="dial_impresoras = !dial_impresoras">mdi-close</v-icon>

                    <h3 class=" justify-center">
                        Impresoras Disponibles
                    </h3>
                </v-system-bar>
            </div>
            <v-card class="pa-3">
                <v-row dense>
                    <v-col cols="12">
                    </v-col>
                </v-row>
                <v-simple-table fixed-header max-width="70vh" dense>
                    <template v-slot:default>

                        <thead>
                            <tr>
                                <th>Nombre de la Impresora</th>
                                <th>ID de Dispositivo</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="(printer, index) in imp_disponibles" :key="index"
                                @click="seleccionar_imp(printer)">
                                <td>{{ printer.name }}</td>
                                <td>{{ printer.deviceId }}</td>

                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-card>
        </v-dialog>
        <v-dialog v-model="dial_select_tipo" max-width="400px" persistent>
            <v-card>
                <v-card-title>
                    <span>Seleccionar Tipo</span>
                </v-card-title>
                <v-card-text>
                    <v-select v-model="imp_selecta.tipo" :items="tiposImpresora" label="Seleccionar Tipo"
                        outlined></v-select>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="confirmarTipo">Confirmar</v-btn>
                    <v-btn color="red" @click="dial_select_tipo = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import axios from "axios";
import store from '@/store/index';
import { iniciarEscuchaActiva, actualizarDocumento, crearDocumento, leerTabla, eliminarDocumento } from '../db_mongo';

export default {
    name: "ListaImpresoras",
    data() {
        return {
            dial_impresoras: false,
            dial_select_tipo: false,
            imp_disponibles: [],
            impresoras: [], // Lista de impresoras
            tiposImpresora: ["Caja1", "Cocina1", "Cocina2", "Cocina3", "Barra1", "Barra2", "Barra3"], // Opciones
            serverIP: "Cargando...", // IP del servidor
            serverPort: "Cargando...", // Puerto del servidor
            imp_selecta: '',
            editar: false
        };
    },

    async mounted() {
        await this.obtenerImpresorasGuardadas()
        await this.obtenerInfoServidor();
        iniciarEscuchaActiva("impresoras", (data) => {
            this.impresoras = data
        });
    },
    methods: {
        async confirmarTipo() {
            if (this.imp_selecta.tipo == '' || this.imp_selecta.tipo == undefined) {
                alert('seleccione un tipo valido')
                return
            }
            if (this.imp_selecta) {
                store.commit("dialogoprogress")
                if (this.editar) {
                    const { _id, ...dataToUpdate } = this.imp_selecta;
                    await actualizarDocumento('impresoras', this.imp_selecta._id, dataToUpdate)
                } else {
                    await crearDocumento('impresoras', this.imp_selecta)
                }
                this.dial_select_tipo = false;
                this.dial_impresoras = false
                this.editar = false
                store.commit("dialogoprogress")
            }
        },

        seleccionar_imp(data) {
            console.log(data)
            this.imp_selecta = data
            this.dial_select_tipo = true
        },
        async ver_impresoras() {
            try {
                store.commit("dialogoprogress")
                const response = await axios.get("http://localhost:3030/api/impresoras");
                this.imp_disponibles = response.data.map((printer) => ({
                    name: printer.name,
                    deviceId: printer.deviceId,
                    tipo: null, // Inicialmente vacío
                }));
                store.commit("dialogoprogress")
                this.dial_impresoras = true
            } catch (error) {
                console.error("Error al sincronizar impresoras:", error);
                alert("❌ Error al sincronizar impresoras");
            }
        },
        async obtenerInfoServidor() {
            try {
                const response = await axios.get("http://localhost:3030/api/server-info");
                this.serverIP = response.data.ip;
                this.serverPort = response.data.port;
            } catch (error) {
                console.error("Error al obtener información del servidor:", error);
                alert("❌ Error al obtener información del servidor");
            }
        },
        async guardarImpresoras() {
            console.log(store.state.permisos.token)

            var data = {
                ip: this.serverIP + ':' + this.serverPort,
                impresoras: this.impresoras
            }
            try {
                store.commit("dialogoprogress")
                const response = await axios.post(
                    // 'http://localhost:5000/mitienda-f5ef8/us-central1/set_impresoras',
                    'https://us-central1-mitienda-f5ef8.cloudfunctions.net/set_impresoras',
                    {
                        data
                    },
                    {
                        headers: {
                            Authorization: store.state.permisos.token, // Encabezado de autorización
                        },
                    }
                );
                store.commit("dialogoprogress")
                console.log("Respuesta del servidor:", response.data);
                return response.data;
            } catch (error) {
                console.error("Error al conectar con la API:", error.response?.data || error.message);
                throw error;
            }
        },
        async obtenerImpresorasGuardadas() {
            try {
                const response = await leerTabla("impresoras");
                this.impresoras = response.result || [];
                console.log("✅ Impresoras cargadas:", this.impresoras);
            } catch (error) {
                console.error("Error al obtener impresoras guardadas:", error);
                alert("❌ Error al obtener impresoras guardadas");
            }
        },
        async eliminarImpresora(data, index) {
            store.commit("dialogoprogress")
            console.log(data._id)
            if (data._id != undefined) {
                await eliminarDocumento('impresoras', data._id)
            }
            store.commit("dialogoprogress")
        },
    },
};
</script>

<style scoped>
.v-card {
    padding: 20px;
}

.v-card-title {
    font-weight: bold;
}
</style>
