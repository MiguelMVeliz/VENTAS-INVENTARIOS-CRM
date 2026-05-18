// Componente Lista de Inventario
const InventarioList = {
    template: `
        <div>
            <h2>🏭 Gestión de Inventario</h2>
            
            <div class="two-columns">
                <!-- Formulario de Entrada -->
                <div class="card">
                    <h3>📥 Registrar Entrada</h3>
                    <inventario-form
                        :productos="productos"
                        tipo="entrada"
                        @procesar="procesarMovimiento"
                    ></inventario-form>
                </div>

                <!-- Alertas de Stock -->
                <div class="card">
                    <h3>⚠️ Productos con Stock Bajo</h3>
                    <div v-for="prod in productosBajos" :key="prod.codigo"
                         class="alert alert-warning" style="justify-content: space-between;">
                        <div>
                            <strong>{{ prod.nombre }}</strong><br>
                            <small>{{ prod.codigo }}</small>
                        </div>
                        <span class="badge badge-danger">Stock: {{ prod.stock }}</span>
                    </div>
                    <p v-if="productosBajos.length === 0" class="alert alert-success">
                        ✅ Todos los productos tienen stock suficiente
                    </p>
                </div>
            </div>

            <!-- Historial de Movimientos -->
            <div class="card mt-20">
                <h3>📋 Historial de Movimientos</h3>
                <div class="flex-between mb-20">
                    <div style="display: flex; gap: 10px;">
                        <select v-model="filtros.tipo" @change="cargarMovimientos" style="width: 200px;">
                            <option value="">Todos los tipos</option>
                            <option value="entrada">Entradas</option>
                            <option value="salida">Salidas</option>
                        </select>
                    </div>
                </div>
                
                <table>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Tipo</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Motivo</th>
                            <th>Documento</th>
                            <th>Stock Resultante</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="mov in movimientos" :key="mov.id">
                            <td>{{ mov.fecha }}</td>
                            <td>
                                <span :class="'badge ' + (mov.tipo === 'entrada' ? 'badge-success' : 'badge-danger')">
                                    {{ mov.tipo === 'entrada' ? '📥 Entrada' : '📤 Salida' }}
                                </span>
                            </td>
                            <td>{{ mov.nombreProducto || mov.codigoProducto }}</td>
                            <td>{{ mov.cantidad }}</td>
                            <td>{{ mov.motivo }}</td>
                            <td>{{ mov.documentoReferencia || '-' }}</td>
                            <td>{{ mov.stockResultante }}</td>
                        </tr>
                        <tr v-if="movimientos.length === 0">
                            <td colspan="7" class="text-center">No hay movimientos registrados</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    components: {
        'inventario-form': InventarioForm
    },
    setup(props, { emit }) {
        const productos = Vue.ref([]);
        const movimientos = Vue.ref([]);
        const filtros = Vue.reactive({ tipo: '' });

        const productosBajos = Vue.computed(() =>
            productos.value.filter(p => p.stock < 10)
        );

        const cargarDatos = async () => {
            try {
                const [prodResponse, movResponse] = await Promise.all([
                    api.listarProductos(),
                    api.listarMovimientos(filtros)
                ]);
                if (prodResponse.success) productos.value = prodResponse.data;
                if (movResponse.success) movimientos.value = movResponse.data;
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al cargar datos: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const cargarMovimientos = () => {
            cargarDatos();
        };

        const procesarMovimiento = async (movimiento) => {
            try {
                let response;
                if (movimiento.tipo === 'entrada') {
                    response = await api.registrarEntrada(movimiento);
                } else {
                    response = await api.registrarSalida(movimiento);
                }
                
                if (response.success) {
                    emit('notificar', {
                        mensaje: response.message || 'Movimiento registrado exitosamente',
                        tipo: 'success'
                    });
                    await cargarDatos();
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al procesar movimiento: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        Vue.onMounted(cargarDatos);

        return {
            productos,
            movimientos,
            filtros,
            productosBajos,
            cargarMovimientos,
            procesarMovimiento
        };
    }
};