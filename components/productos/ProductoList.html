// Componente Lista de Productos
const ProductoList = {
    template: `
        <div>
            <h2>📦 Catálogo de Productos</h2>
            
            <!-- Barra de Herramientas -->
            <div class="flex-between mb-20">
                <div style="display: flex; gap: 10px;">
                    <input 
                        v-model="filtros.busqueda" 
                        placeholder="🔍 Buscar producto..." 
                        style="width: 300px;"
                        @input="aplicarFiltros"
                    />
                    <select v-model="filtros.categoria" @change="aplicarFiltros" style="width: 200px;">
                        <option value="">Todas las categorías</option>
                        <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
                    </select>
                </div>
                <button @click="abrirFormulario()" class="btn-success">
                    ➕ Nuevo Producto
                </button>
            </div>

            <!-- Grid de Productos -->
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
                <div v-for="producto in productos" :key="producto.codigo" class="card">
                    <h3>{{ producto.nombre }}</h3>
                    <p style="color: #666; margin: 5px 0;">
                        {{ producto.codigo }} | {{ producto.categoria }}
                    </p>
                    <p style="margin: 10px 0;">{{ producto.descripcion }}</p>
                    
                    <div class="flex-between" style="margin: 15px 0;">
                        <div>
                            <small>Costo:</small><br>
                            <strong>{{ formatoMoneda(producto.precioCosto) }}</strong>
                        </div>
                        <div>
                            <small>Venta:</small><br>
                            <strong style="color: #e94560;">{{ formatoMoneda(producto.precioVenta) }}</strong>
                        </div>
                        <div>
                            <small>Stock:</small><br>
                            <span :class="'badge ' + getStockBadgeClass(producto.stock)">
                                {{ producto.stock }} uds.
                            </span>
                        </div>
                    </div>

                    <div style="display: flex; gap: 5px;">
                        <button @click="abrirFormulario(producto)" class="btn-secondary" style="flex: 1;">
                            ✏️ Editar
                        </button>
                        <button @click="eliminarProducto(producto.codigo)" class="btn-danger" style="flex: 1;">
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div v-if="mostrarModal" class="modal-overlay" @click.self="cerrarModal">
                <div class="modal">
                    <h3>{{ modoEdicion ? '✏️ Editar Producto' : '➕ Nuevo Producto' }}</h3>
                    <producto-form
                        :producto="productoSeleccionado"
                        :modo-edicion="modoEdicion"
                        @guardar="guardarProducto"
                        @cancelar="cerrarModal"
                    ></producto-form>
                </div>
            </div>
        </div>
    `,
    components: {
        'producto-form': ProductoForm
    },
    setup(props, { emit }) {
        const productos = Vue.ref([]);
        const categorias = Vue.ref([]);
        const mostrarModal = Vue.ref(false);
        const modoEdicion = Vue.ref(false);
        const productoSeleccionado = Vue.ref(null);
        const filtros = Vue.reactive({
            busqueda: '',
            categoria: ''
        });

        const cargarProductos = async () => {
            try {
                const response = await api.listarProductos();
                if (response.success) {
                    productos.value = response.data;
                    // Extraer categorías únicas
                    categorias.value = [...new Set(response.data.map(p => p.categoria))];
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al cargar productos: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const aplicarFiltros = async () => {
            try {
                const response = await api.listarProductos(filtros);
                if (response.success) {
                    productos.value = response.data;
                }
            } catch (error) {
                console.error('Error al filtrar:', error);
            }
        };

        const abrirFormulario = (producto = null) => {
            productoSeleccionado.value = producto ? { ...producto } : {
                codigo: '',
                nombre: '',
                descripcion: '',
                precioCosto: 0,
                precioVenta: 0,
                categoria: '',
                stock: 0
            };
            modoEdicion.value = !!producto;
            mostrarModal.value = true;
        };

        const cerrarModal = () => {
            mostrarModal.value = false;
            productoSeleccionado.value = null;
        };

        const guardarProducto = async (producto) => {
            try {
                const response = await api.guardarProducto(producto);
                if (response.success) {
                    emit('notificar', {
                        mensaje: response.message || CONFIG.MESSAGES.SUCCESS_SAVE,
                        tipo: 'success'
                    });
                    await cargarProductos();
                    cerrarModal();
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al guardar: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const eliminarProducto = async (codigo) => {
            if (!confirm(CONFIG.MESSAGES.CONFIRM_DELETE)) return;
            
            try {
                const response = await api.eliminarProducto(codigo);
                if (response.success) {
                    emit('notificar', {
                        mensaje: response.message || CONFIG.MESSAGES.SUCCESS_DELETE,
                        tipo: 'success'
                    });
                    await cargarProductos();
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al eliminar: ' + error.message,
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

        const getStockBadgeClass = (stock) => {
            if (stock === 0) return 'badge-danger';
            if (stock < 10) return 'badge-warning';
            return 'badge-success';
        };

        Vue.onMounted(cargarProductos);

        return {
            productos,
            categorias,
            mostrarModal,
            modoEdicion,
            productoSeleccionado,
            filtros,
            abrirFormulario,
            cerrarModal,
            guardarProducto,
            eliminarProducto,
            aplicarFiltros,
            formatoMoneda,
            getStockBadgeClass
        };
    }
};