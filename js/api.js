class ApiService {
    constructor() {
        this.baseUrl = "http://10.201.243.13/api_crm/api.php";
        this.timeout = 10000; // 10 segundos de espera
        
        this.useMock = false; 
    }


    async request(endpoint, type, data = {}, method = 'POST') {
        if (this.useMock) {
            return this.mockRequest(endpoint, type, data);
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            // Se construye la URL con el parámetro endpoint requerido por tu api.php
            const urlWithEndpoint = `${this.baseUrl}?endpoint=${endpoint}`;
            
            let options = {
                method: method,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            if (method === 'GET') {
                // Para GET, concatenamos 'type' y los datos adicionales a la URL
                const params = new URLSearchParams({ type, ...data });
                const response = await fetch(`${urlWithEndpoint}&${params.toString()}`, options);
                clearTimeout(timeoutId);
                return await response.json();
            } else {
                // Para POST, enviamos 'type' y los datos en el cuerpo del JSON
                options.body = JSON.stringify({ type, ...data });
                const response = await fetch(urlWithEndpoint, options);
                clearTimeout(timeoutId);
                return await response.json();
            }
        } catch (error) {
            clearTimeout(timeoutId);
            console.error("Error en ApiService:", error.message);
            throw new Error(`Error de conexión al servidor (10.201.243.13): ${error.message}`);
        }
    }

    // --- MÉTODOS PÚBLICOS DE LA API ---

    // Usuarios (CRM)
    async listarUsuarios(filtros = {}) {
        return this.request('usuarios', 'listar_usuarios', filtros, 'GET');
    }

    async guardarUsuario(usuario) {
        // La lógica de si es EDITAR o AGREGAR se puede manejar por la presencia de ID
        const operacion = usuario.id ? 'editar_usuario' : 'agregar_usuario';
        return this.request('usuarios', operacion, usuario, 'POST');
    }

    async eliminarUsuario(id) {
        return this.request('usuarios', 'eliminar_usuario', { id }, 'POST');
    }

    // Productos (Inventarios)
    async listarProductos(filtros = {}) {
        return this.request('productos', 'listar_productos', filtros, 'GET');
    }

    async guardarProducto(producto) {
        const operacion = producto.codigo ? 'editar_producto' : 'agregar_producto';
        return this.request('productos', operacion, producto, 'POST');
    }

    async eliminarProducto(codigo) {
        return this.request('productos', 'eliminar_producto', { codigo }, 'POST');
    }

    // Ventas (CRM)
    async listarVentas(filtros = {}) {
        return this.request('ventas', 'listar_ventas', filtros, 'GET');
    }

    async obtenerVenta(numeroFactura) {
        return this.request('ventas', 'obtener_venta', { numeroFactura }, 'GET');
    }

    async registrarVenta(venta) {
        return this.request('ventas', 'registrar_venta', venta, 'POST');
    }

    async anularVenta(numeroFactura) {
        return this.request('ventas', 'anular_venta', { numeroFactura }, 'POST');
    }

    // Inventario (Movimientos)
    async listarMovimientos(filtros = {}) {
        return this.request('inventario', 'listar_movimientos', filtros, 'GET');
    }

    async registrarEntrada(movimiento) {
        return this.request('inventario', 'agregar_entrada', movimiento, 'POST');
    }

    async registrarSalida(movimiento) {
        return this.request('inventario', 'agregar_salida', movimiento, 'POST');
    }

    // Dashboard
    async obtenerEstadisticas() {
        return this.request('dashboard', 'obtener_estadisticas', {}, 'GET');
    }

    initMockData() {
        console.log("ApiService: Conectado a base de datos real. MockData omitido.");
    }
}

const api = new ApiService();