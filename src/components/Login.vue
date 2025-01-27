<template>
    <v-container fluid class="d-flex justify-center align-center" style="height: 80vh;">
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-12">
                    <v-card-title class="headline justify-center">
                        <v-icon left>mdi-login</v-icon> Iniciar Sesión
                    </v-card-title>
                    <v-card-subtitle class="text-center">
                        Bienvenido de nuevo, por favor ingresa tus credenciales.
                    </v-card-subtitle>

                    <v-card-text>
                        <v-form @submit.prevent="login">
                            <v-text-field v-model="email" label="Correo Electrónico" prepend-icon="mdi-email"
                                type="email" outlined dense required></v-text-field>

                            <v-text-field v-model="password" label="Contraseña" prepend-icon="mdi-lock" type="password"
                                outlined dense required></v-text-field>

                            <v-btn type="submit" color="primary" block class="mt-4" :loading="loading">
                                Iniciar sesión
                            </v-btn>
                        </v-form>
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions class="justify-center">
                        <v-btn text @click="forgotPassword">¿Olvidaste tu contraseña?</v-btn>
                    </v-card-actions>
                </v-card>

                <!-- Alerta de éxito o error -->
                <v-snackbar v-model="snackbar" :timeout="timeout" :color="snackbarColor">
                    {{ mensaje }}
                </v-snackbar>
            </v-col>
        </v-row>
    </v-container>
</template>


<script>

import firebase from "firebase/app";
import "firebase/auth"; // ✅ Importación para Firebase 7
import axios from "axios"; // ✅ Importación para conexión con el backend
import { allEmpresas } from "@/db"; // Asegúrate de que esta referencia esté bien definida

export default {
    name: "login",
    data() {
        return {
            email: "demo@domotica.com",
            password: "12345678",
            loading: false,
            snackbar: false,
            snackbarColor: "error",
            mensaje: "",
            timeout: 3000,
        };
    },
    methods: {
        // ✅ Método de inicio de sesión con Firebase
        async login() {
            const auth = firebase.auth();
            if (!this.email || !this.password) {
                alert("❗ Por favor, completa todos los campos.");
                return;
            }
            this.loading = true;
            try {
                await auth.signInWithEmailAndPassword(this.email.trim(), this.password.trim());
                alert("✅ Inicio de sesión exitoso");
                await this.guardarEmpresas(); // ✅ Llamar a la función de guardado
                this.$router.push({ name: "panel" });
            } catch (error) {
                this.mostrarError(`❌ Error: ${error.message}`);
            } finally {
                this.loading = false;
            }
        },

        // ✅ Guardar empresas desde Firebase en MongoDB
        async guardarEmpresas() {
            try {
                const snapshot = await allEmpresas().once('value');
                if (snapshot.exists()) {
                    const empresasArray = [];
                    snapshot.forEach((item) => {
                        empresasArray.push(item.val());
                    });

                    // ✅ Enviar empresas al backend usando Axios
                    const response = await axios.post("http://localhost:3030/api/empresas", {
                        empresas: empresasArray
                    });
                    alert("✅ Empresas guardadas correctamente en MongoDB");
                } else {
                    alert("⚠️ No se encontraron empresas en Firebase.");
                }
            } catch (error) {
                this.mostrarError("❌ Error al guardar empresas en MongoDB");
            }
        },

        // ✅ Método para recuperación de contraseña
        async forgotPassword() {
            const auth = firebase.auth();
            if (this.email) {
                try {
                    await auth.sendPasswordResetEmail(this.email.trim());
                    this.snackbar = true;
                    this.snackbarColor = "success";
                    this.mensaje = "📩 Correo de recuperación enviado.";
                } catch (error) {
                    this.mostrarError(`❌ Error: ${error.message}`);
                }
            } else {
                this.mostrarError("❗ Por favor, ingresa tu correo electrónico.");
            }
        },

        // ✅ Método de error genérico
        mostrarError(mensaje) {
            this.snackbar = true;
            this.snackbarColor = "error";
            this.mensaje = mensaje;
        }
    },
};
</script>
