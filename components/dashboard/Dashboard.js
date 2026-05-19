// Componente Dashboard
const Dashboard = {
    template: `
        <div>
            <h2>📊 Panel de Control</h2>
            
            <!-- Tarjetas de Estadísticas -->
            <div class="stats-grid">
                <div class="stat-card" style="background: linear-gradient(135deg, #667eea, #764ba2);">
                    <div>👥 Usuarios Activos</div>
                    <div class="stat-number">{{ estadisticas.usuariosActivos || 0 }}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
                    <div>📦 Productos</div>
                    <div class="stat-number">{{ estadisticas.totalProductos || 0 }}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
                    <div>💰 Ventas del Mes</div>
                    <div class="stat-number">{{ formatoMoneda(estadisticas.ventasMes) }}</div>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
                    <div>📈 Productos Bajos</div>
                    <div class="stat-number">{{ estadisticas.productosBajos || 0 }}</div>
                </div>
            </div>

            <!-- Contenido Secundario -->
            <div class="two-columns">
                <!-- Últimas Ventas -->
                <div class="card">
                    <h3>🛒 Últimas Ventas</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Factura</th>
                                <th>Cliente</th>
                                <th>Total</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="venta in ultimasVentas" :key="venta.numeroFactura">
                                <td>{{ venta.numeroFactura }}</td>
                                <td>{{ venta.nombreCliente }}</td>
                                <td>{{ formatoMoneda(venta.total) }}</td>
                                <td>
                                    <span :class="'badge ' + getBadgeClass(venta.estado)">
                                        {{ venta.estado }}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="ultimasVentas.length === 0">
                                <td colspan="4" class="text-center">No hay ventas registradas</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Productos con Bajo Stock -->
                <div class="card">
                    <h3>⚠️ Productos con Bajo Stock</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Stock</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="producto in productosBajos" :key="producto.codigo">
                                <td>{{ producto.nombre }}</td>
                                <td>{{ producto.stock }}</td>
                                <td>
                                    <span :class="'badge ' + getStockBadgeClass(producto.stock)">
                                        {{ producto.stock <= 5 ? 'Crítico' : 'Bajo' }}
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="productosBajos.length === 0">
                                <td colspan="3" class="text-center">✅ Todos los productos tienen stock suficiente</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,
    setup(props, { emit }) {
        const estadisticas = Vue.ref({});
        const ultimasVentas = Vue.ref([]);
        const productosBajos = Vue.ref([]);

        const cargarDatos = async () => {
            try {
                const response = await api.obtenerEstadisticas();
                if (response.success) {
                    estadisticas.value = response.data.estadisticas;
                    ultimasVentas.value = response.data.ultimasVentas || [];
                    productosBajos.value = response.data.productosBajos || [];
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al cargar estadísticas: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const formatoMoneda = (valor) => {
            return new Intl.NumberFormat('es-GT', {
                style: 'currency',
                currency: 'GTQ'
            }).format(valor || 0);
        };

        const getBadgeClass = (estado) => {
            const clases = {
                'Completada': 'badge-success',
                'Pagada': 'badge-success', 
                'Pendiente': 'badge-warning',
                'Cancelada': 'badge-danger'
            };
            return clases[estado] || 'badge-info';
        };

        const getStockBadgeClass = (stock) => {
            return stock <= 5 ? 'badge-danger' : 'badge-warning';
        };

        Vue.onMounted(cargarDatos);

        return {
            estadisticas,
            ultimasVentas,
            productosBajos,
            formatoMoneda,
            getBadgeClass,
            getStockBadgeClass
        };
    }
};