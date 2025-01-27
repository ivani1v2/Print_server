// Conveniently import this file anywhere to use db

import firebase from "firebase/app";
import "firebase/database";
import store from "@/store/index";
import "firebase/auth";

export const db = firebase.initializeApp({
  apiKey: "AIzaSyBRZsvdirIVvKtRGlUG_hEJKDXyaeTACxg",
  authDomain: "mitienda-f5ef8.firebaseapp.com",
  databaseURL: "https://mitienda-f5ef8.firebaseio.com",
  projectId: "mitienda-f5ef8",
  storageBucket: "mitienda-f5ef8.appspot.com",
  messagingSenderId: "662761932641",
  appId: "1:662761932641:web:716d3f469e9c3947ede720",
});

export const auth = firebase.auth();
export const database = firebase.database();

const empresas = db.database().ref("empresas");
const notificaciones = db.database().ref("notificaciones");

export const allEmpresas = () => {
  return empresas;
};

export const nuevaEmpresa = (id, array) => {
  return empresas.child(id).set(array);
};

export const eliminaEmpresa = (id) => {
  return empresas.child(id).remove();
};

export const actualizaEmpresa = (id, array) => {
  return empresas.child(id).set(array);
};
//----pagos
export const allempresas_pagos = () => {
  return db.database().ref("gestion_pagos").child("lista_empresas");
};
export const nueva_lista_pago = (id, array) => {
  return db
    .database()
    .ref("gestion_pagos")
    .child("lista_empresas")
    .child(id)
    .set(array);
};
export const nuevo_pago = (id, array) => {
  return db
    .database()
    .ref("gestion_pagos")
    .child("lista_empresas")
    .child(id)
    .set(array);
};
//----------------empresa---------------------
export const obtenerBD = (empresa) => {
  return empresas.child(empresa);
};
export const allConfigura = () => {
  return db.database().ref(store.state.baseDatos.bd).child("configuracion");
};
export const grabaConfigura = (configura, value) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("configuracion")
    .child(configura)
    .set(value)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};

export const grabaConfiguraImpresora = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("configuracion")
    .child("impresoras")
    .child(id)
    .set(array);
};
export const allConfiguraImpresora = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("configuracion")
    .child("impresoras");
};
export const eliminaConfiguraImpresora = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("configuracion")
    .child("impresoras")
    .child(id)
    .remove();
};
//----------------empresa---------------------
export const obtenerImpresoras = () => {
  return db.database().ref(store.state.baseDatos.bd).child("impresora");
};
export const actualizaImpresoras = (tipo, dato) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("impresora")
    .child(tipo)
    .set(dato);
};
//----------------series---------------------
export const obtenerSeries = () => {
  return db.database().ref(store.state.baseDatos.bd).child("seriesdocumentos");
};
export const actualizaSeries = (tipo, dato) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("seriesdocumentos")
    .child(tipo)
    .set(dato);
};
//----------------und Medidas---------------------
export const allMedidas = (bd) => {
  return db.database().ref(bd).child("undmedida");
};
export const nuevaMedidas = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("undmedida")
    .child(id)
    .set(array);
};
export const eliminaMedidas = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("undmedida")
    .child(id)
    .remove();
};

//----------------productos---------------------
export const allProductos = () => {
  return db.database().ref(store.state.baseDatos.bd).child("productos");
};
export const nuevoProducto = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("productos")
    .child(id)
    .set(array);
};
export const eliminaProducto = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("productos")
    .child(id)
    .remove();
};
export const buscaProductos = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("productos")
    .child(id);
};
export const grabarStock = (id, stock) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("productos")
    .child(id)
    .child("stock")
    .set(stock)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const editaProducto = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("productos")
    .child(id)
    .child(campo)
    .set(data);
};
//-*-----------entradas-----------
export const allEntradas = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("entradas");
};
export const nuevoEntradas = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("entradas")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const eliminaEntradas = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("entradas")
    .child(id)
    .remove();
};
export const buscaEntradas = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("entradas");
};
//----------------productos---------------------
export const allInsumos = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("insumos");
};
export const nuevoInsumos = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("insumos")
    .child(id)
    .set(array);
};
export const eliminaInsumos = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("insumos")
    .child(id)
    .remove();
};
export const buscaInsumos = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("insumos")
    .child(id);
};
export const editaInsumos = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("insumos")
    .child(id)
    .child(campo)
    .set(data);
};
export const grabarStockInsumos = (id, stock) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("insumos")
    .child(id)
    .child("stock")
    .set(stock)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
//----------------categorias INSUMOS---------------------
export const allCategoriasInsumos = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("categorias");
};
export const nuevoCategoriaInsumos = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("categorias")
    .push(array);
};
export const editaCategoriaInsumos = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("categorias")
    .child(id)
    .child(campo)
    .set(data);
};
export const eliminaCategoriaInsumos = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("categorias")
    .child(id)
    .remove();
};
//---------crear masivos---------
export const crearCampo = (bd, id, nombre, valor) => {
  return db
    .database()
    .ref(bd)
    .child("productos")
    .child(id)
    .child(nombre)
    .set(valor);
};
export const crearCampoconfiguracion = (bd, tabla, nombre, valor) => {
  return db.database().ref(bd).child(tabla).child(nombre).set(valor);
};
export const crearCampoCATEGORIAS = (bd, tabla, id, nombre, valor) => {
  return db.database().ref(bd).child(tabla).child(id).child(nombre).set(valor);
};
//----------------contadores---------------------
export const obtenContador = () => {
  return db.database().ref(store.state.baseDatos.bd).child("contadores");
};
export const sumaContador = (contador, orden) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("contadores")
    .child(contador)
    .set(orden);
};
export const actualizaContador = (contador, orden) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("contadores")
    .child(contador)
    .set(orden);
};
//----------------categorias---------------------
export const allCategorias = () => {
  return db.database().ref(store.state.baseDatos.bd).child("categorias");
};
export const nuevoCategoria = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("categorias")
    .push(array);
};
export const editaCategoria = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("categorias")
    .child(id)
    .child(campo)
    .set(data);
};
export const eliminaCategoria = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("categorias")
    .child(id)
    .remove();
};
//----------------categorias---------------------
export const allSeries = () => {
  return db.database().ref(store.state.baseDatos.bd).child("series");
};
export const nuevoSeries = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("series")
    .child(id)
    .set(array);
};
export const eliminaSeries = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("series")
    .child(id)
    .remove();
};
//-----------Comprobante Venta--------------------
export const consulta_Cabecera = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(id);
};
export const allCabecera_general = (bd) => {
  return db.database().ref(bd).child("comprobantecabecera");
};
export const elimina_Cabecera = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(id)
    .remove();
};
export const eliminaNodo = (nodo) => {
  return db.database().ref(store.state.baseDatos.bd).child(nodo).remove();
};
export const allCabecera = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera");
};
export const grabaCabecera = (numeracion, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .set(array);
};
export const grabaDetalle = (numeracion, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantedetalle")
    .child(numeracion)
    .set(array);
};
export const consultaDetalle = (numeracion) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantedetalle")
    .child(numeracion);
};
export const grabaEstadoComprobante = (
  numeracion,
  personaID,
  estado,
  data,
  hash
) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("documentId")
    .set(personaID);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("estado")
    .set(estado);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("mensajeSunat")
    .set(data);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("hash")
    .set(hash);
};
export const grabaconsultacomprobante = (numeracion, estado, data) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("estado")
    .set(estado);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("mensajeSunat")
    .set(data);
};
export const grabaDatoC = (numeracion, campo, data) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child(campo)
    .set(data);
};
export const grabaconsultacomprobanteNC = (numeracion, estado, data) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .child("estado")
    .set(estado);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .child("mensajeSunat")
    .set(data);
};

export const grabaEstadoTicketConsolidado = (numeracion, consolidado) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("estado")
    .set("consolidado");
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("documentId")
    .set(consolidado);
};
export const buscacabecera = (bd, numeracion) => {
  return db.database().ref(bd).child("comprobantecabecera").child(numeracion);
};
export const buscadetalle = (bd, numeracion) => {
  return db.database().ref(bd).child("comprobantedetalle").child(numeracion);
};
export const grabaDatoC_otrabd = (bd, numeracion, campo, data) => {
  db.database()
    .ref(bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child(campo)
    .set(data);
};
//-----------Gestion Mesas--------------------
export const allMesas = () => {
  return db.database().ref(store.state.baseDatos.bd).child("mesas");
};
export const nuevaMesas = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("mesas")
    .child(id)
    .set(array);
};
export const editaMesas = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("mesas")
    .child(id)
    .set(array);
};
export const eliminaMesas = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("mesas")
    .child(id)
    .remove();
};

//-----------Comandas-------------------
export const allComandas = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comanda");
};
export const nuevaComanda = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comanda")
    .child(id)
    .set(array);
};
export const buscaComanda = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comanda")
    .child(id);
};
export const eliminaComanda = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comanda")
    .child(id)
    .remove();
};
export const edita_Comanda = (id, pos, campo, value) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comanda")
    .child(id)
    .child(pos)
    .child(campo)
    .set(value);
};
export const elimina_producto_comanda = (id, pos) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comanda")
    .child(id)
    .child(pos)
    .remove();
};
//-------------cocina-------------------
export const allCocina = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("cocina");
};
export const eliminaTotalCocina = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("cocina")
    .remove();
};
export const enviaCocina = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("cocina")
    .push(array);
};
export const eliminaCocina = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("cocina")
    .child(id)
    .remove();
};
export const obtenMesacomanda = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("cocina")
    .child(id);
};
//------------------- barra -------------
export const allBarra = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("barra");
};
export const eliminaBarra = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("barra")
    .child(id)
    .remove();
};
export const obtenBarracomanda = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("barra")
    .child(id);
};
export const eliminaTotalBarra = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("barra")
    .remove();
};
export const enviaBarra = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("barra")
    .push(array);
};
//-------------------reporte cocina y  barra---------------
export const grabareportecocina = (array) => {
  var a = db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("reportecocina")
    .push(array)
    .then(() => {
      return true;
    });
  return a;
};
export const allreporteCocina = () => {
  return db.database().ref(store.state.baseDatos.bd).child("reportecocina");
};
export const EliminareporteCocina = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("reportecocina")
    .remove();
};

export const grabareporteBarra = (array) => {
  var a = db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("reportebarra")
    .push(array)
    .then(() => {
      return true;
    });
  return a;
};
export const allreporteBarra = () => {
  return db.database().ref(store.state.baseDatos.bd).child("reportebarra");
};
export const EliminareporteBarra = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("reportebarra")
    .remove();
};
//--------------Token-------------
export const guardaToken = (token) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("TokenAdmin")
    .child("token")
    .set(token);
};
export const consultaToken = () => {
  return db.database().ref(store.state.baseDatos.bd).child("TokenAdmin");
};
//-----------Acrhivos---------------
export const guardapago = (selectedFile, ubicacion) => {
  const storageRef = db.storage().ref(ubicacion);
  storageRef.put(selectedFile);
  return storageRef;
};
export const guardaArchivo = (BD, selectedFile, ubicacion) => {
  const storageRef = db.storage().ref(BD + "/" + ubicacion);
  storageRef.put(selectedFile);
  return storageRef;
};
export const guardaArchivos = (BD, selectedFile, ubicacion) => {
  const storageRef = db.storage().ref(BD + "/" + ubicacion);
  return storageRef.put(selectedFile);
};
export const guardaIcono = (selectedFile, ubicacion) => {
  const storageRef = db.storage().ref("carpetaiconos/" + ubicacion);
  return storageRef.put(selectedFile);
};
export const guardaRutaIconos = (orden, array) => {
  return db.database().ref("iconos").child(orden).set(array);
};
export const eliminaRutaIconos = (orden) => {
  return db.database().ref("iconos").child(orden).remove();
};
export const eliminaIcono = (ubicacion) => {
  return db
    .storage()
    .ref("carpetaiconos/" + ubicacion)
    .delete();
};
export const consultaIconos = () => {
  return db.database().ref("iconos");
};
export const guardaRutaArchibo = (ruta, tipo) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("Rutas")
    .child(tipo)
    .set(ruta);
};
export const consultaArchivo = () => {
  return db.database().ref(store.state.baseDatos.bd).child("Rutas");
};
export const bajarCartaPDF = (base) => {
  return db.database().ref(base).child("Rutas");
};
//--------------clientes------------
export const allClientes = () => {
  return db.database().ref(store.state.baseDatos.bd).child("clientes");
};
export const nuevoCliente = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("clientes")
    .child(id)
    .set(array);
};
export const eliminaCliente = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("clientes")
    .child(id)
    .remove();
};
export const buscaCliente = () => {
  return db.database().ref(store.state.baseDatos.bd).child("clientes");
};
export const edita_campo_Cliente = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("clientes")
    .child(id)
    .child(campo)
    .set(data)
    .then(() => {
      return true;
    });
};
//--------------clientes------------
export const allEmpleados = () => {
  return db.database().ref(store.state.baseDatos.bd).child("empleados");
};
export const nuevoEmpleados = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("empleados")
    .child(id)
    .set(array);
};
export const eliminaEmpleados = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("empleados")
    .child(id)
    .remove();
};
export const buscaEmpleados = () => {
  return db.database().ref(store.state.baseDatos.bd).child("empleados");
};
//--------------proveedores------------
export const allProveedor = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proveedor");
};
export const nuevoProveedor = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proveedor")
    .child(id)
    .set(array);
};
export const eliminaProveedor = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proveedor")
    .child(id)
    .remove();
};
export const buscaProveedor = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proveedor");
};
//-------buscar Otra BASE---------
export const buscaProductosOtraBase = (bd, id) => {
  return db.database().ref(bd).child("productos").child(id);
};
export const grabarStockOtraBase = (bd, id, stock) => {
  return db
    .database()
    .ref(bd)
    .child("productos")
    .child(id)
    .child("stock")
    .set(stock);
};
export const nuevoProductoOtraBase = (bd, id, array) => {
  return db.database().ref(bd).child("productos").child(id).set(array);
};
export const allProductoOtraBase = (bd) => {
  return db.database().ref(bd).child("productos");
};
export const allComprobantesCabeceraOtraBase = (bd) => {
  return db.database().ref(bd).child("comprobantecabecera");
};
export const nuevoComprobantesCabeceraSerie = (bd, id, serie) => {
  return db
    .database()
    .ref(bd)
    .child("comprobantecabecera")
    .child(id)
    .child("serie")
    .set(serie);
};
//--------------usuarios-----------
export const nuevoUsuario = (id, array) => {
  return db.database().ref("usuarios").child(id).set(array);
};
export const allUsuarios = () => {
  return db.database().ref("usuarios");
};
export const buscarUsuarios = (id) => {
  return db.database().ref("usuarios").child(id);
};
export const borra_usuario = (id) => {
  return db.database().ref("usuarios").child(id).remove();
};
export const primerUsuario = (id, correo, pass) => {
  db.database().ref("usuarios").child(id).child("correo").set(correo);
  db.database().ref("usuarios").child(id).child("pass").set(pass);
};
export const nuevoCampoUsuario = (id) => {
  return db
    .database()
    .ref("usuarios")
    .child(id)
    .child("modulooperaciones")
    .set(false);
};
//--------------DELIVERYS-------------
export const alldelivery = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("delivery");
};
export const nuevoDelivery = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("delivery")
    .push(array);
};
export const eliminaDelivery = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("delivery")
    .child(id)
    .remove();
};
export const allComandasDelivery = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comandaDelivery");
};
export const nuevaComandaDelivery = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comandaDelivery")
    .child(id)
    .set(array);
};
export const buscaComandaDelivery = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comandaDelivery")
    .child(id);
};
export const eliminaComandaDelivery = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("comandaDelivery")
    .child(id)
    .remove();
};
//--------------flujocaja-------------
export const allflujo = () => {
  return db.database().ref(store.state.baseDatos.bd).child("flujocaja");
};
export const elimina_all_flujo = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("flujocaja")
    .remove();
};
export const elimina_all_flujo_bd = (bd, array) => {
  return db.database().ref(bd).child("modopago").set(array);
};
export const nuevoflujo = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("flujocaja")
    .push(array);
};
export const estadoFlujo = (id, estado) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("flujocaja")
    .child(id)
    .child("estado")
    .set(estado);
};
export const edita_Flujo = (id, estado) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("flujocaja")
    .child(id)
    .set(estado);
};
export const flujo_historial = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("flujocaja_historial")
    .child(id);
};
export const allflujo_historial = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("flujocaja_historial");
};
export const nuevoflujo_historial = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("flujocaja_historial")
    .push(array);
};
//----modo pago---------
export const allModoPago = () => {
  return db.database().ref(store.state.baseDatos.bd).child("modopago");
};
export const nuevoModoPago = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("modopago")
    .set(array);
};
export const eliminaModoPago = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("modopago")
    .child(id)
    .remove();
};
//----qr modo pago---------
export const allModoPago_qr = () => {
  return db.database().ref(store.state.baseDatos.bd).child("modopago_qr");
};
export const nuevoModoPago_qr = (modo, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("modopago_qr")
    .child(modo)
    .set(array);
};
export const eliminaModoPago_qr = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("modopago_qr")
    .child(id)
    .remove();
};
//----modo pago---------
export const allPredefinidos = () => {
  return db.database().ref(store.state.baseDatos.bd).child("Predefinidos");
};
export const nuevoPredefinidos = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("Predefinidos")
    .child(id)
    .set(array);
};
export const eliminaPredefinidos = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("Predefinidos")
    .child(id)
    .remove();
};
//----cuentas bancos---------
export const allBancos = () => {
  return db.database().ref(store.state.baseDatos.bd).child("bancos");
};
export const nuevoBanco = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("bancos")
    .child(id)
    .set(array);
};
export const eliminaBanco = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("bancos")
    .child(id)
    .remove();
};

//-----------------------notaCredito DEbito
export const consulta_CabeceraNCD = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(id);
};
export const allCabeceraNCD = () => {
  return db.database().ref(store.state.baseDatos.bd).child("ncdcabecera");
};
export const grabaCabeceraNCD = (numeracion, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const grabaDetalleNCD = (numeracion, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("ncddetalle")
    .child(numeracion)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const consultaDetalleNCD = (numeracion) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("ncddetalle")
    .child(numeracion);
};
export const grabaEstadoComprobanteNCD = (numeracion, estado, data, hash) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .child("estado")
    .set(estado);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .child("mensajeSunat")
    .set(data);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .child("hash")
    .set(hash);
};
export const grabaAnulacionreferecia = (numeracion, estado, data) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("estado")
    .set(estado);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("comprobantecabecera")
    .child(numeracion)
    .child("mensajeSunat")
    .set(data);
};
export const grabaAnulacionrefereciaNC = (numeracion, estado, data) => {
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .child("estado")
    .set(estado);
  db.database()
    .ref(store.state.baseDatos.bd)
    .child("ncdcabecera")
    .child(numeracion)
    .child("mensajeSunat")
    .set(data);
};
//-------------------------RESUMEN DE ANULACION-----------------+
export const allCabeceraRA = () => {
  return db.database().ref(store.state.baseDatos.bd).child("racabecera");
};
export const grabaCabeceraRA = (numeracion, array) => {
  var c = db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("racabecera")
    .child(numeracion)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const grabaDetalleRA = (numeracion, array) => {
  var c = db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("radetalle")
    .child(numeracion)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const consultaDetalleRA = (numeracion) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("radetalle")
    .child(numeracion);
};
//-----------------------NOTIFICACIONES--------------------
export const grabaNotificacion = (bd, estado, mensaje) => {
  var c = db
    .database()
    .ref("notificaciones")
    .child(bd)
    .child("mensaje")
    .set(mensaje)
    .then(() => {
      db.database()
        .ref("notificaciones")
        .child(bd)
        .child("dialogoAlerta")
        .set(estado);
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const grabaactualizadialogo = (bd, estado, dialog) => {
  var c = db
    .database()
    .ref("notificaciones")
    .child(bd)
    .child(dialog)
    .set(estado)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const allnotificaciones = (bd) => {
  return db.database().ref("notificaciones").child(bd);
};
export const grabaCronogramapago = (bd, array) => {
  return db.database().ref("pagoempresas").child(bd).set(array);
};
export const allCronogramapago = (bd) => {
  return db.database().ref("pagoempresas").child(bd);
};
export const grabapagocronograma = (bd, periodo, data, valor) => {
  return db
    .database()
    .ref("pagoempresas")
    .child(bd)
    .child(periodo)
    .child(data)
    .set(valor);
};
//-----------------------REPORTES--------------------
export const grabareporte = (tipo, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("reportes")
    .child(tipo)
    .set(array);
};
export const consultareporte = (tipo) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("reportes")
    .child(tipo);
};
//-----------------proformas-------------
export const allCabeceraProforma = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("proformas")
    .child("cabecera");
};
export const grabaCabeceraProforma = (numeracion, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("proformas")
    .child("cabecera")
    .child(numeracion)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const grabaDetalleProforma = (numeracion, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("proformas")
    .child("detalle")
    .child(numeracion)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const consultaDetalleProforma = (numeracion) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("proformas")
    .child("detalle")
    .child(numeracion);
};
///--------------------------------recentas-------------
export const nuevoReceta = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("receta")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const allReceta = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("receta");
};
export const elimiia_Receta = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("receta")
    .child(id)
    .remove();
};
//------------------costeo---------
export const nuevoCosteo = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("costeo")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const allCosteo = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("costeo");
};
///cuentas x cobrar
export const nuevaCuentaxcobrar = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("x_cobrar")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
//--------------nuevo formato deluvery
export const all_cabecera_delivery = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("delivery")
    .child("cabecera");
};
export const cabecera_delivery = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("delivery")
    .child("cabecera")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const detalle_delivery = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("delivery")
    .child("detalle")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const carga_detalle_delivery = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("delivery")
    .child("detalle")
    .child(id);
};
export const elimina_detalle_delivery = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("delivery")
    .child("detalle")
    .child(id)
    .remove();
};
export const elimina_cabecera_delivery = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("delivery")
    .child("cabecera")
    .child(id)
    .remove();
};
export const allMovimientos = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("almacen")
    .child("movimientos");
};
export const elmina_mov_kardex = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("almacen")
    .child("movimientos")
    .child(id)
    .remove();
};
export const nuevoMovimiento = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("almacen")
    .child("movimientos")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
///data_mesas
export const nuev_histo_mesa = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("historial")
    .child(id)
    .set(array);
};
//--------------- grupo observacioines
export const nuevo_grupo_obs = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("grupo_obs")
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
};
export const all_grupo_obs = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("grupo_obs");
};
export const edita_campo_grupo_obs = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("grupo_obs")
    .child(id)
    .child(campo)
    .set(data);
};
//--------graba pedido------------------
export const nuevo_pedido = (bd, id, array) => {
  return db
    .database()
    .ref(bd)
    .child("restaurante")
    .child("pedidos")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
};
export const all_pedidos_online = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("pedidos");
};
/// --------------- carta ONLINE-----------------
export const allCategorias_carta = (bd) => {
  return db.database().ref(bd).child("categorias");
};
export const allProductos_carta = (bd) => {
  return db.database().ref(bd).child("productos");
};
///-----------------agrega tablaa------------------
export const agrega_tabla = (tabla, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("tablas")
    .child(tabla)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const busca_tabla = (tabla) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("tablas")
    .child(tabla);
};
////////////---------carta 2
export const allCategorias_2 = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("categorias");
};
export const copia_productos1 = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("productos")
    .set(array);
};
export const copia_categoria1 = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("categorias")
    .set(array);
};
export const copia_productos2 = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("productos")
    .set(array);
};
export const copia_categoria2 = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("categorias")
    .set(array);
};
export const nuevoCategoria2 = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("categorias")
    .push(array);
};
export const editaCategoria2 = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("categorias")
    .child(id)
    .child(campo)
    .set(data);
};
export const eliminaCategoria2 = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("categorias")
    .child(id)
    .remove();
};

export const editaProducto2 = (id, campo, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("productos")
    .child(id)
    .child(campo)
    .set(data);
};
export const eliminaProducto2 = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("productos")
    .child(id)
    .remove();
};
export const allProductos2 = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("carta_adicional")
    .child("productos");
};
// mesas
//-----------Gestion Mesas--------------------
export const allMesa = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mesas");
};
export const nuevaMesa = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mesas")
    .child(id)
    .set(array);
};
export const editaaMesa = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mesas")
    .child(id)
    .set(array);
};
export const eliminaMesa = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mesas")
    .child(id)
    .remove();
};
//-----------Gestion Mozos--------------------
export const allMozo = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mozo");
};
export const nuevoMozo = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mozo")
    .child(id)
    .set(array);
};
export const editaMozo = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mozo")
    .child(id)
    .set(array);
};
export const eliminaMozo = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("mozo")
    .child(id)
    .remove();
};
//--costeo recetas
export const allcosteo_receta = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("costeo_recetas");
};
export const nuevo_costeo_receta = (array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("costeo_recetas")
    .push(array);
};
//--costeo recetas
export const allcosteo_insumo = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("costeo_insumos");
};
export const nuevo_costeo_insumo = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("costeo_insumos")
    .child(id)
    .set(array);
};

//-------------entradas------------
export const allProformas = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proformas");
};
export const nuevoProformas = (id, array) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proformas")
    .child(id)
    .set(array)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      return error;
    });
  return c;
};
export const eliminaProformas = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proformas")
    .child(id)
    .remove();
};
export const buscaProformas = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("kardex")
    .child("proformas");
};
export const guard_historial = (data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("historial")
    .push(data);
};
export const ver_historial = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("restaurante")
    .child("historial");
};

//-----------hoteles
export const all_habitaciones = () => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("hoteles")
    .child("habitacion");
};
export const nueva_habitacion = (id, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("hoteles")
    .child("habitacion")
    .child(id)
    .set(data);
};
export const delete_habitacion = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("hoteles")
    .child("habitacion")
    .child(id)
    .remove();
};
export const guard_registro = (id, data) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("hoteles")
    .child("registro")
    .child(id)
    .set(data);
};
export const ver_registro = (id) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("hoteles")
    .child("registro")
    .child(id);
};

export const nueva_serie = (data) => {
  return db.database().ref(store.state.baseDatos.bd).child("series").push(data);
};
export const elimina_serie = (key) => {
  return db
    .database()
    .ref(store.state.baseDatos.bd)
    .child("series")
    .child(key)
    .remove();
};
export const all_serie = () => {
  return db.database().ref(store.state.baseDatos.bd).child("series");
};
