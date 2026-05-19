// Componente Formulario de Producto
const ProductoForm = {
    props: {
        producto: {
            type: Object,
            required: true
        },
        modoEdicion: {
            type: Boolean,
            default: false
        }
    },
    template: `
        <form @submit.prevent="enviarFormulario">
            <div class="form-row">
                <div class="form-group">
                    <label>Código:</label>
                    <input 
                        v-model="formData.codigo" 
                         
                        :disabled="modoEdicion"
                        placeholder="Ej: P009"
                    />
                </div>
                <div class="form-group">
                    <label>Nombre:</label>
                    <input 
                        v-model="formData.nombre" 
                        required 
                        placeholder="Nombre del producto"
                    />
                </div>
            </div>

            <div class="form-group">
                <label>Descripción:</label>
                <textarea 
                    v-model="formData.descripcion" 
                    rows="3"
                    placeholder="Descripción detallada del producto"
                ></textarea>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Precio Costo:</label>
                    <input 
                        v-model.number="formData.precioCosto" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        required 
                    />
                </div>
                <div class="form-group">
                    <label>Precio Venta:</label>
                    <input 
                        v-model.number="formData.precioVenta" 
                        type="number" 
                        step="0.01" 
                        min="0" 
                        required 
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Categoría:</label>
                    <input 
                        v-model="formData.categoria" 
                        placeholder="Ej: Electrónicos"
                    />
                </div>
                <div class="form-group">
                    <label>Stock Inicial:</label>
                    <input 
                        v-model.number="formData.stock" 
                        type="number" 
                        min="0" 
                        :disabled="modoEdicion"
                    />
                </div>
            </div>

            <div class="form-group">
                <label>Proveedor:</label>
                <input 
                    v-model="formData.proveedor" 
                    placeholder="Nombre del proveedor"
                />
            </div>

            <div class="form-row" style="margin-top: 20px;">
                <button type="submit" class="btn-success">
                    💾 Guardar Producto
                </button>
                <button type="button" @click="$emit('cancelar')" class="btn-secondary">
                    Cancelar
                </button>
            </div>
        </form>
    `,
    setup(props, { emit }) {
        const formData = Vue.reactive({ ...props.producto });

        Vue.watch(() => props.producto, (nuevoValor) => {
            Object.assign(formData, nuevoValor);
        }, { deep: true });

        const validarFormulario = () => {
            if ( !formData.nombre) {
                alert('Complete los campos requeridos: Código y Nombre');
                return false;
            }
            if (formData.precioCosto < 0 || formData.precioVenta < 0) {
                alert('Los precios no pueden ser negativos');
                return false;
            }
            if (formData.precioVenta < formData.precioCosto) {
                alert('El precio de venta debe ser mayor al costo');
                return false;
            }
            return true;
        };

        const enviarFormulario = () => {
            if (validarFormulario()) {
                emit('guardar', { ...formData });
            }
        };

        return {
            formData,
            enviarFormulario
        };
    }
};