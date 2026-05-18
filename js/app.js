// Aplicación Principal
const app = Vue.createApp({
    setup() {
        const notificacion = Vue.reactive({
            mostrar: false,
            mensaje: '',
            tipo: 'success'
        });

        const mostrarNotificacion = (data) => {
            notificacion.mostrar = true;
            notificacion.mensaje = data.mensaje;
            notificacion.tipo = data.tipo;
            
            // Auto-ocultar después de 4 segundos
            setTimeout(() => {
                notificacion.mostrar = false;
            }, 4000);
        };

        // Proveer la función de notificación a todos los componentes
        Vue.provide('mostrarNotificacion', mostrarNotificacion);

        return {
            notificacion,
            mostrarNotificacion
        };
    }
});

// Usar el router
app.use(router);

// Montar la aplicación
app.mount('#app');

console.log('🚀 Sistema Ventas + CRM + Inventario iniciado correctamente');
console.log('📡 API Base URL:', CONFIG.API_BASE_URL);