// Clase para manejar todas las peticiones a la API
class ApiService {
    constructor() {
        this.baseUrl = CONFIG.API_BASE_URL;
        this.timeout = CONFIG.REQUEST_TIMEOUT;
        this.useMock = true; 
        this.initMockData();
    }

    initMockData() {
        if (!localStorage.getItem('api_usuarios')) {
            localStorage.setItem('api_usuarios', JSON.stringify([
                { id: "U001", nombre: "María García López", email: "maria@email.com", telefono: "555-0101", tipo: "vendedor", comision: 5, activo: true },
                { id: "U002", nombre: "Carlos Rodríguez", email: "carlos@email.com", telefono: "555-0102", tipo: "vendedor", comision: 7, activo: true },
                { id: "U003", nombre: "Ana Martínez", email: "ana@email.com", telefono: "555-0103", tipo: "cliente", direccion: "Calle 123", categoria: "VIP", activo: true },
                { id: "U004", nombre: "Pedro Sánchez", email: "pedro@email.com", telefono: "555-0104", tipo: "cliente", direccion: "Av. 456", categoria: "Regular", activo: true }
            ]));
        }
        if (!localStorage.getItem('api_productos')) {
            localStorage.setItem('api_productos', JSON.stringify([
                { codigo: "P001", nombre: "Laptop Pro", descripcion: "Laptop 15.6\"", precioCosto: 800, precioVenta: 1200, stock: 25, categoria: "Electrónicos", proveedor: "TechSupply" },
                { codigo: "P002", nombre: "Monitor 27\"", descripcion: "Monitor 4K", precioCosto: 350, precioVenta: 550, stock: 40, categoria: "Electrónicos", proveedor: "DisplayMasters" },
                { codigo: "P003", nombre: "Teclado Mecánico", descripcion: "Teclado RGB", precioCosto: 60, precioVenta: 99.99, stock: 100, categoria: "Periféricos", proveedor: "GamingGear" }
            ]));
        }
        if (!localStorage.getItem('api_ventas')) {
            localStorage.setItem('api_ventas', JSON.stringify([]));
        }
        if (!localStorage.getItem('api_movimientos')) {
            localStorage.setItem('api_movimientos', JSON.stringify([]));
        }
    }

    async request(endpoint, type, data = {}, method = 'POST') {
        if (this.useMock) {
            return this.mockRequest(endpoint, type, data);
        }
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const url = `${this.baseUrl}${endpoint}`;
            let options = {
                method: method,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            };

            if (method === 'GET') {
                const params = new URLSearchParams({ type, ...data });
                const response = await fetch(`${url}?${params.toString()}`, options);
                clearTimeout(timeoutId);
                return await response.json();
            } else {
                options.body = JSON.stringify({ type, ...data });
                const response = await fetch(url, options);
                clearTimeout(timeoutId);
                return await response.json();
            }
        } catch (error) {
            clearTimeout(timeoutId);
            throw new Error(`Error de conexión: ${error.message}`);
        }
    }

    // Simulador de API para desarrollo
    mockRequest(endpoint, type, data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let response = { success: true, message: 'Operación exitosa' };
                
                switch(endpoint) {
                    case CONFIG.ENDPOINTS.USUARIOS:
                        response = this.mockUsuarios(type, data);
                        break;
                    case CONFIG.ENDPOINTS.PRODUCTOS:
                        response = this.mockProductos(type, data);
                        break;
                    case CONFIG.ENDPOINTS.VENTAS:
                        response = this.mockVentas(type, data);
                        break;
                    case CONFIG.ENDPOINTS.INVENTARIO:
                        response = this.mockInventario(type, data);
                        break;
                    case CONFIG.ENDPOINTS.DASHBOARD:
                        response = this.mockDashboard();
                        break;
                }
                
                resolve(response);
            }, 300);
        });
    }

    mockUsuarios(type, data) {
        let usuarios = JSON.parse(localStorage.getItem('api_usuarios') || '[]');
        
        switch(type) {
            case CONFIG.OPERATIONS.LISTAR_USUARIOS:
                return { success: true, data: usuarios };
            
            case CONFIG.OPERATIONS.AGREGAR_USUARIO:
                usuarios.push(data);
                localStorage.setItem('api_usuarios', JSON.stringify(usuarios));
                return { success: true, message: 'Usuario creado', data: data };
            
            case CONFIG.OPERATIONS.EDITAR_USUARIO:
                const index = usuarios.findIndex(u => u.id === data.id);
                if (index >= 0) usuarios[index] = data;
                localStorage.setItem('api_usuarios', JSON.stringify(usuarios));
                return { success: true, message: 'Usuario actualizado', data: data };
            
            case CONFIG.OPERATIONS.ELIMINAR_USUARIO:
                usuarios = usuarios.filter(u => u.id !== data.id);
                localStorage.setItem('api_usuarios', JSON.stringify(usuarios));
                return { success: true, message: 'Usuario eliminado' };
            
            default:
                return { success: true, data: usuarios };
        }
    }

    mockProductos(type, data) {
        let productos = JSON.parse(localStorage.getItem('api_productos') || '[]');
        
        switch(type) {
            case CONFIG.OPERATIONS.LISTAR_PRODUCTOS:
                return { success: true, data: productos };
            
            case CONFIG.OPERATIONS.AGREGAR_PRODUCTO:
                data.stock = data.stock || 0;
                productos.push(data);
                localStorage.setItem('api_productos', JSON.stringify(productos));
                return { success: true, message: 'Producto creado', data: data };
            
            case CONFIG.OPERATIONS.EDITAR_PRODUCTO:
                const index = productos.findIndex(p => p.codigo === data.codigo);
                if (index >= 0) productos[index] = data;
                localStorage.setItem('api_productos', JSON.stringify(productos));
                return { success: true, message: 'Producto actualizado', data: data };
            
            case CONFIG.OPERATIONS.ELIMINAR_PRODUCTO:
                productos = productos.filter(p => p.codigo !== data.codigo);
                localStorage.setItem('api_productos', JSON.stringify(productos));
                return { success: true, message: 'Producto eliminado' };
            
            default:
                return { success: true, data: productos };
        }
    }

    mockVentas(type, data) {
        let ventas = JSON.parse(localStorage.getItem('api_ventas') || '[]');
        
        switch(type) {
            case CONFIG.OPERATIONS.LISTAR_VENTAS:
                return { success: true, data: ventas };
            
            case CONFIG.OPERATIONS.REGISTRAR_VENTA:
                data.fecha = new Date().toLocaleString();
                ventas.unshift(data);
                localStorage.setItem('api_ventas', JSON.stringify(ventas));
                
                // Actualizar stock
                let productos = JSON.parse(localStorage.getItem('api_productos') || '[]');
                data.lineas.forEach(linea => {
                    const prod = productos.find(p => p.codigo === linea.codigoProducto);
                    if (prod) {
                        prod.stock = Math.max(0, prod.stock - linea.cantidad);
                    }
                });
                localStorage.setItem('api_productos', JSON.stringify(productos));
                
                return { success: true, message: 'Venta registrada', data: data };
            
            default:
                return { success: true, data: ventas };
        }
    }

    mockInventario(type, data) {
        let movimientos = JSON.parse(localStorage.getItem('api_movimientos') || '[]');
        let productos = JSON.parse(localStorage.getItem('api_productos') || '[]');
        
        switch(type) {
            case CONFIG.OPERATIONS.LISTAR_MOVIMIENTOS:
                return { success: true, data: movimientos };
            
            case CONFIG.OPERATIONS.AGREGAR_ENTRADA:
                data.id = Date.now();
                data.fecha = new Date().toLocaleString();
                data.tipo = 'entrada';
                movimientos.unshift(data);
                localStorage.setItem('api_movimientos', JSON.stringify(movimientos));
                
                const prodEntrada = productos.find(p => p.codigo === data.codigoProducto);
                if (prodEntrada) {
                    prodEntrada.stock += data.cantidad;
                    localStorage.setItem('api_productos', JSON.stringify(productos));
                }
                
                return { success: true, message: 'Entrada registrada', data: data };
            
            default:
                return { success: true, data: movimientos };
        }
    }

    mockDashboard() {
        const usuarios = JSON.parse(localStorage.getItem('api_usuarios') || '[]');
        const productos = JSON.parse(localStorage.getItem('api_productos') || '[]');
        const ventas = JSON.parse(localStorage.getItem('api_ventas') || '[]');
        
        return {
            success: true,
            data: {
                estadisticas: {
                    usuariosActivos: usuarios.filter(u => u.activo).length,
                    totalProductos: productos.length,
                    ventasMes: ventas.reduce((sum, v) => sum + (v.total || 0), 0),
                    productosBajos: productos.filter(p => p.stock < 10).length
                },
                ultimasVentas: ventas.slice(0, 5),
                productosBajos: productos.filter(p => p.stock < 10)
            }
        };
    }

    // Métodos públicos
    async listarUsuarios(filtros = {}) {
        return this.request(CONFIG.ENDPOINTS.USUARIOS, CONFIG.OPERATIONS.LISTAR_USUARIOS, filtros, 'GET');
    }

    async guardarUsuario(usuario) {
        const operacion = usuario.id && JSON.parse(localStorage.getItem('api_usuarios') || '[]').find(u => u.id === usuario.id) 
            ? CONFIG.OPERATIONS.EDITAR_USUARIO 
            : CONFIG.OPERATIONS.AGREGAR_USUARIO;
        return this.request(CONFIG.ENDPOINTS.USUARIOS, operacion, usuario, 'POST');
    }

    async eliminarUsuario(id) {
        return this.request(CONFIG.ENDPOINTS.USUARIOS, CONFIG.OPERATIONS.ELIMINAR_USUARIO, { id }, 'POST');
    }

    async listarProductos(filtros = {}) {
        return this.request(CONFIG.ENDPOINTS.PRODUCTOS, CONFIG.OPERATIONS.LISTAR_PRODUCTOS, filtros, 'GET');
    }

    async guardarProducto(producto) {
        const operacion = producto.codigo && JSON.parse(localStorage.getItem('api_productos') || '[]').find(p => p.codigo === producto.codigo)
            ? CONFIG.OPERATIONS.EDITAR_PRODUCTO 
            : CONFIG.OPERATIONS.AGREGAR_PRODUCTO;
        return this.request(CONFIG.ENDPOINTS.PRODUCTOS, operacion, producto, 'POST');
    }

    async eliminarProducto(codigo) {
        return this.request(CONFIG.ENDPOINTS.PRODUCTOS, CONFIG.OPERATIONS.ELIMINAR_PRODUCTO, { codigo }, 'POST');
    }

    async listarVentas(filtros = {}) {
        return this.request(CONFIG.ENDPOINTS.VENTAS, CONFIG.OPERATIONS.LISTAR_VENTAS, filtros, 'GET');
    }

    async obtenerVenta(numeroFactura) {
        return this.request(CONFIG.ENDPOINTS.VENTAS, CONFIG.OPERATIONS.OBTENER_VENTA, { numeroFactura }, 'GET');
    }

    async registrarVenta(venta) {
        return this.request(CONFIG.ENDPOINTS.VENTAS, CONFIG.OPERATIONS.REGISTRAR_VENTA, venta, 'POST');
    }

    async anularVenta(numeroFactura) {
        return this.request(CONFIG.ENDPOINTS.VENTAS, CONFIG.OPERATIONS.ANULAR_VENTA, { numeroFactura }, 'POST');
    }

    async listarMovimientos(filtros = {}) {
        return this.request(CONFIG.ENDPOINTS.INVENTARIO, CONFIG.OPERATIONS.LISTAR_MOVIMIENTOS, filtros, 'GET');
    }

    async registrarEntrada(movimiento) {
        return this.request(CONFIG.ENDPOINTS.INVENTARIO, CONFIG.OPERATIONS.AGREGAR_ENTRADA, movimiento, 'POST');
    }

    async registrarSalida(movimiento) {
        return this.request(CONFIG.ENDPOINTS.INVENTARIO, CONFIG.OPERATIONS.AGREGAR_SALIDA, movimiento, 'POST');
    }

    async obtenerEstadisticas() {
        return this.request(CONFIG.ENDPOINTS.DASHBOARD, CONFIG.OPERATIONS.OBTENER_ESTADISTICAS, {}, 'GET');
    }
}

// Crear instancia global
const api = new ApiService();