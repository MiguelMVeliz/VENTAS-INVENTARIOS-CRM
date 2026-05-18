// Componente Formulario de Venta
const VentaForm = {
    template: `
        <div>
            <h2>💰 Registrar Nueva Venta</h2>
            
            <form @submit.prevent="procesarVenta">
                <!-- Datos Generales -->
                <div class="card mb-20">
                    <h3>📋 Datos de la Venta</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>N° Factura:</label>
                            <input 
                                v-model="venta.numeroFactura" 
                                required 
                                :placeholder="'FAC-' + new Date().getFullYear() + '-XXX'"
                            />
                        </div>
                        <div class="form-group">
                            <label>Vendedor:</label>
                            <select v-model="venta.idVendedor" required>
                                <option value="">Seleccione vendedor...</option>
                                <option v-for="vendedor in vendedores" :key="vendedor.id" :value="vendedor.id">
                                    {{ vendedor.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Cliente:</label>
                            <select v-model="venta.idCliente" required>
                                <option value="">Seleccione cliente...</option>
                                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                                    {{ cliente.nombre }} {{ cliente.categoria === 'VIP' ? '⭐' : '' }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Líneas de Venta -->
                <div class="card mb-20">
                    <h3>🛒 Productos</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Stock</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Descuento</th>
                                <th>Subtotal</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(linea, index) in lineas" :key="index"
                                :style="linea.errorStock ? 'background: #ffe0e0;' : ''">
                                <td>
                                    <select v-model="linea.codigoProducto" 
                                            @change="actualizarLinea(index)" required>
                                        <option value="">Seleccione...</option>
                                        <option v-for="prod in productosDisponibles" 
                                                :key="prod.codigo" 
                                                :value="prod.codigo">
                                            {{ prod.nombre }} - {{ formatoMoneda(prod.precioVenta) }}
                                        </option>
                                    </select>
                                </td>
                                <td>
                                    <span :class="'badge ' + getStockClass(linea.stockDisponible)">
                                        {{ linea.stockDisponible }}
                                    </span>
                                </td>
                                <td>
                                    <input v-model.number="linea.cantidad" 
                                           type="number" 
                                           min="1" 
                                           :max="linea.stockDisponible"
                                           @input="validarStock(index)"
                                           required />
                                </td>
                                <td>{{ formatoMoneda(linea.precioUnitario) }}</td>
                                <td>
                                    <input v-model.number="linea.descuento" 
                                           type="number" 
                                           step="0.01" 
                                           min="0"
                                           style="width: 80px;" />
                                </td>
                                <td><strong>{{ formatoMoneda(calcularSubtotal(linea)) }}</strong></td>
                                <td>
                                    <button type="button" @click="eliminarLinea(index)" 
                                            class="btn-danger">✕</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="mt-20">
                        <button type="button" @click="agregarLinea" class="btn-secondary">
                            ➕ Agregar Producto
                        </button>
                    </div>
                </div>

                <!-- Resumen -->
                <div class="card">
                    <div class="flex-between">
                        <div>
                            <h3>Resumen de Venta</h3>
                            <p>Productos: {{ lineas.length }}</p>
                            <p>Total artículos: {{ totalArticulos }}</p>
                        </div>
                        <div style="text-align: right;">
                            <h2 style="color: #e94560; font-size: 2em;">
                                {{ formatoMoneda(totalVenta) }}
                            </h2>
                            <button type="submit" 
                                    class="btn-success" 
                                    style="font-size: 1.2em; padding: 15px 40px;"
                                    :disabled="!ventaValida">
                                💰 Registrar Venta
                            </button>
                        </div>
                    </div>
                    <div v-if="errorMensaje" class="alert alert-error mt-20">
                        ⚠️ {{ errorMensaje }}
                    </div>
                </div>
            </form>
        </div>
    `,
    setup(props, { emit }) {
        const productos = Vue.ref([]);
        const usuarios = Vue.ref([]);
        const venta = Vue.reactive({
            numeroFactura: '',
            idVendedor: '',
            idCliente: '',
            estado: 'Completada'
        });
        const lineas = Vue.ref([]);
        const errorMensaje = Vue.ref('');

        const vendedores = Vue.computed(() => 
            usuarios.value.filter(u => u.tipo === 'vendedor' && u.activo)
        );
        
        const clientes = Vue.computed(() => 
            usuarios.value.filter(u => u.tipo === 'cliente' && u.activo)
        );

        const productosDisponibles = Vue.computed(() =>
            productos.value.filter(p => p.stock > 0)
        );

        const totalVenta = Vue.computed(() =>
            lineas.value.reduce((sum, l) => sum + calcularSubtotal(l), 0)
        );

        const totalArticulos = Vue.computed(() =>
            lineas.value.reduce((sum, l) => sum + (l.cantidad || 0), 0)
        );

        const ventaValida = Vue.computed(() => {
            return lineas.value.length > 0 && 
                   venta.numeroFactura && 
                   venta.idVendedor && 
                   venta.idCliente &&
                   !lineas.value.some(l => l.errorStock);
        });

        const calcularSubtotal = (linea) => {
            return (linea.cantidad || 0) * (linea.precioUnitario || 0) - (linea.descuento || 0);
        };

        const actualizarLinea = (index) => {
            const linea = lineas.value[index];
            const prod = productos.value.find(p => p.codigo === linea.codigoProducto);
            if (prod) {
                linea.precioUnitario = prod.precioVenta;
                linea.stockDisponible = prod.stock;
                linea.nombreProducto = prod.nombre;
            }
            validarStock(index);
        };

        const validarStock = (index) => {
            const linea = lineas.value[index];
            linea.errorStock = linea.cantidad > linea.stockDisponible;
            if (linea.errorStock) {
                errorMensaje.value = `Stock insuficiente para ${linea.nombreProducto || linea.codigoProducto}`;
            } else {
                errorMensaje.value = '';
            }
        };

        const agregarLinea = () => {
            lineas.value.push({
                codigoProducto: '',
                cantidad: 1,
                precioUnitario: 0,
                descuento: 0,
                stockDisponible: 0,
                errorStock: false
            });
        };

        const eliminarLinea = (index) => {
            lineas.value.splice(index, 1);
        };

        const procesarVenta = async () => {
            if (!ventaValida.value) {
                errorMensaje.value = 'Complete todos los campos y corrija los errores';
                return;
            }

            const ventaData = {
                ...venta,
                lineas: lineas.value.map(l => ({
                    codigoProducto: l.codigoProducto,
                    cantidad: l.cantidad,
                    precioUnitario: l.precioUnitario,
                    descuento: l.descuento,
                    subtotal: calcularSubtotal(l)
                })),
                total: totalVenta.value
            };

            try {
                const response = await api.registrarVenta(ventaData);
                if (response.success) {
                    emit('notificar', {
                        mensaje: `Venta ${venta.numeroFactura} registrada exitosamente`,
                        tipo: 'success'
                    });
                    // Limpiar formulario
                    Object.assign(venta, {
                        numeroFactura: '',
                        idVendedor: '',
                        idCliente: ''
                    });
                    lineas.value = [];
                    agregarLinea();
                    // Recargar productos
                    await cargarDatos();
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al registrar venta: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const cargarDatos = async () => {
            try {
                const [prodResponse, userResponse] = await Promise.all([
                    api.listarProductos(),
                    api.listarUsuarios()
                ]);
                if (prodResponse.success) productos.value = prodResponse.data;
                if (userResponse.success) usuarios.value = userResponse.data;
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al cargar datos: ' + error.message,
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

        const getStockClass = (stock) => {
            if (stock === 0) return 'badge-danger';
            if (stock < 10) return 'badge-warning';
            return 'badge-success';
        };

        Vue.onMounted(async () => {
            await cargarDatos();
            agregarLinea();
        });

        return {
            venta,
            lineas,
            vendedores,
            clientes,
            productosDisponibles,
            totalVenta,
            totalArticulos,
            ventaValida,
            errorMensaje,
            calcularSubtotal,
            actualizarLinea,
            validarStock,
            agregarLinea,
            eliminarLinea,
            procesarVenta,
            formatoMoneda,
            getStockClass
        };
    }
};