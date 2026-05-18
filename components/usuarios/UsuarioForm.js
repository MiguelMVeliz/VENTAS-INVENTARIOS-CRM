// Componente Formulario de Usuario
const UsuarioForm = {
    props: {
        usuario: {
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
                    <label>ID:</label>
                    <input 
                        v-model="formData.id" 
                        required 
                        :disabled="modoEdicion"
                        placeholder="Ej: U008"
                    />
                </div>
                <div class="form-group">
                    <label>Nombre Completo:</label>
                    <input 
                        v-model="formData.nombre" 
                        required 
                        placeholder="Nombre y apellidos"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Email:</label>
                    <input 
                        v-model="formData.email" 
                        type="email" 
                        required 
                        placeholder="correo@ejemplo.com"
                    />
                </div>
                <div class="form-group">
                    <label>Teléfono:</label>
                    <input 
                        v-model="formData.telefono" 
                        placeholder="555-XXXX"
                    />
                </div>
            </div>

            <div class="form-row">
                <div class="form-group">
                    <label>Tipo de Usuario:</label>
                    <select v-model="formData.tipo" required>
                        <option value="vendedor">Vendedor</option>
                        <option value="cliente">Cliente</option>
                    </select>
                </div>

                <div class="form-group" v-if="formData.tipo === 'vendedor'">
                    <label>Comisión (%):</label>
                    <input 
                        v-model.number="formData.comision" 
                        type="number" 
                        min="0" 
                        max="100" 
                        step="0.1"
                    />
                </div>

                <div class="form-group" v-if="formData.tipo === 'cliente'">
                    <label>Categoría:</label>
                    <select v-model="formData.categoria">
                        <option value="Regular">Regular</option>
                        <option value="VIP">VIP</option>
                    </select>
                </div>
            </div>

            <div class="form-group" v-if="formData.tipo === 'cliente'">
                <label>Dirección:</label>
                <textarea 
                    v-model="formData.direccion" 
                    rows="2"
                    placeholder="Dirección completa"
                ></textarea>
            </div>

            <div class="form-row" style="margin-top: 20px;">
                <button type="submit" class="btn-success">
                    💾 Guardar Usuario
                </button>
                <button type="button" @click="$emit('cancelar')" class="btn-secondary">
                    Cancelar
                </button>
            </div>
        </form>
    `,
    setup(props, { emit }) {
        const formData = Vue.reactive({ ...props.usuario });

        // Sincronizar cuando cambie la prop
        Vue.watch(() => props.usuario, (nuevoValor) => {
            Object.assign(formData, nuevoValor);
        }, { deep: true });

        const validarFormulario = () => {
            if (!formData.id || !formData.nombre || !formData.email) {
                alert('Complete los campos requeridos: ID, Nombre y Email');
                return false;
            }
            if (!formData.email.includes('@')) {
                alert('Ingrese un email válido');
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