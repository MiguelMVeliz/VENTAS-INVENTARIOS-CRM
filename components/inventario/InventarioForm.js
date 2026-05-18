// Componente Formulario de Inventario
const InventarioForm = {
    props: {
        productos: {
            type: Array,
            required: true
        },
        tipo: {
            type: String,
            default: 'entrada'
        }
    },
    template: `
        <form @submit.prevent="procesarMovimiento">
            <div class="form-group">
                <label>Producto:</label>
                <select v-model="movimiento.codigoProducto" @change="actualizarStock" required>
                    <option value="">Seleccione producto...</option>
                    <option v-for="prod in productos" :key="prod.codigo" :value="prod.codigo">
                        {{ prod.nombre }} (Stock: {{ prod.stock }})
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Cantidad:</label>
                <input 
                    v-model.number="movimiento.cantidad" 
                    type="number" 
                    min="1" 
                    :max="tipo === 'salida' ? stockActual : undefined"
                    required 
                />
                <small v-if="stockActual >= 0" style="color: #666;">
                    Stock actual: {{ stockActual }} unidades
                </small>
                <small v-if="tipo === 'salida' && movimiento.cantidad > stockActual" style="color: red;">
                    ⚠️ No hay suficiente stock
                </small>
            </div>

            <div class="form-group">
                <label>Motivo:</label>
                <select v-model="movimiento.motivo" required>
                    <option value="">Seleccione motivo...</option>
                    <option v-if="tipo === 'entrada'" value="Compra a proveedor">Compra a proveedor</option>
                    <option v-if="tipo === 'entrada'" value="Devolución de cliente">Devolución de cliente</option>
                    <option v-if="tipo === 'entrada'" value="Ajuste de inventario">Ajuste de inventario</option>
                    <option v-if="tipo === 'salida'" value="Venta">Venta</option>
                    <option v-if="tipo === 'salida'" value="Devolución a proveedor">Devolución a proveedor</option>
                    <option v-if="tipo === 'salida'" value="Merma">Merma / Deterioro</option>
                </select>
            </div>

            <div class="form-group">
                <label>Documento Referencia:</label>
                <input 
                    v-model="movimiento.documentoReferencia" 
                    placeholder="N° Factura / Guía"
                />
            </div>

            <div v-if="tipo === 'entrada' && movimiento.cantidad > 0" class="alert alert-info">
                📈 Stock resultante: {{ stockActual + movimiento.cantidad }} unidades
            </div>
            <div v-if="tipo === 'salida' && movimiento.cantidad > 0" class="alert alert-warning">
                📉 Stock resultante: {{ stockActual - movimiento.cantidad }} unidades
            </div>

            <button type="submit" 
                    class="btn-success" 
                    style="width: 100%;"
                    :disabled="!formularioValido">
                {{ tipo === 'entrada' ? '📥 Registrar Entrada' : '📤 Registrar Salida' }}
            </button>
        </form>
    `,
    setup(props, { emit }) {
        const movimiento = Vue.reactive({
            tipo: props.tipo,
            codigoProducto: '',
            cantidad: 1,
            motivo: '',
            documentoReferencia: ''
        });

        const stockActual = Vue.ref(0);

        const formularioValido = Vue.computed(() => {
            if (!movimiento.codigoProducto || !movimiento.cantidad || !movimiento.motivo) {
                return false;
            }
            if (props.tipo === 'salida' && movimiento.cantidad > stockActual.value) {
                return false;
            }
            return true;
        });

        const actualizarStock = () => {
            const producto = props.productos.find(p => p.codigo === movimiento.codigoProducto);
            stockActual.value = producto ? producto.stock : 0;
        };

        const procesarMovimiento = () => {
            if (formularioValido.value) {
                emit('procesar', { ...movimiento });
                // Limpiar formulario
                Object.assign(movimiento, {
                    tipo: props.tipo,
                    codigoProducto: '',
                    cantidad: 1,
                    motivo: '',
                    documentoReferencia: ''
                });
                stockActual.value = 0;
            }
        };

        return {
            movimiento,
            stockActual,
            formularioValido,
            actualizarStock,
            procesarMovimiento
        };
    }
};