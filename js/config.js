// Configuración global del sistema
const CONFIG = {
    // URL base de la API
    API_BASE_URL: 'http://localhost:8080/api',
    
    // Endpoints
    ENDPOINTS: {
        USUARIOS: '/usuario',
        PRODUCTOS: '/producto',
        VENTAS: '/venta',
        INVENTARIO: '/inventario',
        DASHBOARD: '/dashboard'
    },
    
    // Tipos de operaciones
    OPERATIONS: {
        // Usuarios
        LISTAR_USUARIOS: 'listar_usuarios',
        OBTENER_USUARIO: 'obtener_usuario',
        AGREGAR_USUARIO: 'agregar_usuario',
        EDITAR_USUARIO: 'editar_usuario',
        ELIMINAR_USUARIO: 'eliminar_usuario',
        
        // Productos
        LISTAR_PRODUCTOS: 'listar_productos',
        OBTENER_PRODUCTO: 'obtener_producto',
        AGREGAR_PRODUCTO: 'agregar_producto',
        EDITAR_PRODUCTO: 'editar_producto',
        ELIMINAR_PRODUCTO: 'eliminar_producto',
        
        // Ventas
        LISTAR_VENTAS: 'listar_ventas',
        OBTENER_VENTA: 'obtener_venta',
        REGISTRAR_VENTA: 'registrar_venta',
        ANULAR_VENTA: 'anular_venta',
        
        // Inventario
        LISTAR_MOVIMIENTOS: 'listar_movimientos',
        AGREGAR_ENTRADA: 'agregar_entrada',
        AGREGAR_SALIDA: 'agregar_salida',
        CONSULTAR_STOCK: 'consultar_stock',
        
        // Dashboard
        OBTENER_ESTADISTICAS: 'obtener_estadisticas'
    },
    
    // Timeout para peticiones (ms)
    REQUEST_TIMEOUT: 10000,
    
    // Mensajes del sistema
    MESSAGES: {
        SUCCESS_SAVE: 'Registro guardado exitosamente',
        SUCCESS_DELETE: 'Registro eliminado exitosamente',
        SUCCESS_UPDATE: 'Registro actualizado exitosamente',
        ERROR_GENERAL: 'Ocurrió un error en la operación',
        ERROR_CONEXION: 'Error de conexión con el servidor',
        CONFIRM_DELETE: '¿Está seguro de eliminar este registro?'
    }
};

// Exportar para uso global
window.CONFIG = CONFIG;