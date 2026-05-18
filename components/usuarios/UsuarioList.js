// Componente Lista de Usuarios
const UsuarioList = {
    template: `
        <div>
            <h2>👥 Gestión de Usuarios</h2>
            
            <!-- Barra de Herramientas -->
            <div class="flex-between mb-20">
                <div style="display: flex; gap: 10px;">
                    <input 
                        v-model="filtros.busqueda" 
                        placeholder="🔍 Buscar usuario..." 
                        style="width: 300px;"
                        @input="aplicarFiltros"
                    />
                    <select v-model="filtros.tipo" @change="aplicarFiltros" style="width: 200px;">
                        <option value="">Todos los tipos</option>
                        <option value="vendedor">Vendedores</option>
                        <option value="cliente">Clientes</option>
                    </select>
                    <select v-model="filtros.estado" @change="aplicarFiltros" style="width: 200px;">
                        <option value="">Todos los estados</option>
                        <option value="activo">Activos</option>
                        <option value="inactivo">Inactivos</option>
                    </select>
                </div>
                <button @click="abrirFormulario()" class="btn-success">
                    ➕ Nuevo Usuario
                </button>
            </div>

            <!-- Tabla de Usuarios -->
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="usuario in usuarios" :key="usuario.id" 
                        :class="{ 'inactive-row': !usuario.activo }">
                        <td><strong>{{ usuario.id }}</strong></td>
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.email }}</td>
                        <td>{{ usuario.telefono }}</td>
                        <td>
                            <span :class="'badge ' + (usuario.tipo === 'vendedor' ? 'badge-warning' : 'badge-info')">
                                {{ usuario.tipo }}
                            </span>
                        </td>
                        <td>
                            <span :class="'badge ' + (usuario.activo ? 'badge-success' : 'badge-danger')">
                                {{ usuario.activo ? 'Activo' : 'Inactivo' }}
                            </span>
                        </td>
                        <td>
                            <button @click="abrirFormulario(usuario)" class="btn-secondary" title="Editar">
                                ✏️
                            </button>
                            <button @click="toggleEstado(usuario)" 
                                    :class="usuario.activo ? 'btn-warning' : 'btn-success'"
                                    :title="usuario.activo ? 'Desactivar' : 'Activar'">
                                {{ usuario.activo ? '🔒' : '🔓' }}
                            </button>
                            <button @click="eliminarUsuario(usuario.id)" class="btn-danger" title="Eliminar">
                                🗑️
                            </button>
                        </td>
                    </tr>
                    <tr v-if="usuarios.length === 0">
                        <td colspan="7" class="text-center">
                            No se encontraron usuarios
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Modal del Formulario -->
            <div v-if="mostrarModal" class="modal-overlay" @click.self="cerrarModal">
                <div class="modal">
                    <h3>{{ modoEdicion ? '✏️ Editar Usuario' : '➕ Nuevo Usuario' }}</h3>
                    <usuario-form
                        :usuario="usuarioSeleccionado"
                        :modo-edicion="modoEdicion"
                        @guardar="guardarUsuario"
                        @cancelar="cerrarModal"
                    ></usuario-form>
                </div>
            </div>
        </div>
    `,
    components: {
        'usuario-form': UsuarioForm
    },
    setup(props, { emit }) {
        const usuarios = Vue.ref([]);
        const mostrarModal = Vue.ref(false);
        const modoEdicion = Vue.ref(false);
        const usuarioSeleccionado = Vue.ref(null);
        const filtros = Vue.reactive({
            busqueda: '',
            tipo: '',
            estado: ''
        });

        const cargarUsuarios = async () => {
            try {
                const response = await api.listarUsuarios();
                if (response.success) {
                    usuarios.value = response.data;
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al cargar usuarios: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const aplicarFiltros = async () => {
            try {
                const response = await api.listarUsuarios(filtros);
                if (response.success) {
                    usuarios.value = response.data;
                }
            } catch (error) {
                console.error('Error al filtrar:', error);
            }
        };

        const abrirFormulario = (usuario = null) => {
            usuarioSeleccionado.value = usuario ? { ...usuario } : {
                id: '',
                nombre: '',
                email: '',
                telefono: '',
                tipo: 'cliente',
                activo: true
            };
            modoEdicion.value = !!usuario;
            mostrarModal.value = true;
        };

        const cerrarModal = () => {
            mostrarModal.value = false;
            usuarioSeleccionado.value = null;
        };

        const guardarUsuario = async (usuario) => {
            try {
                const response = await api.guardarUsuario(usuario);
                if (response.success) {
                    emit('notificar', {
                        mensaje: response.message || CONFIG.MESSAGES.SUCCESS_SAVE,
                        tipo: 'success'
                    });
                    await cargarUsuarios();
                    cerrarModal();
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al guardar: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const toggleEstado = async (usuario) => {
            try {
                const updatedUser = { ...usuario, activo: !usuario.activo };
                const response = await api.guardarUsuario(updatedUser);
                if (response.success) {
                    emit('notificar', {
                        mensaje: `Usuario ${updatedUser.activo ? 'activado' : 'desactivado'}`,
                        tipo: updatedUser.activo ? 'success' : 'warning'
                    });
                    await cargarUsuarios();
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al cambiar estado: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        const eliminarUsuario = async (id) => {
            if (!confirm(CONFIG.MESSAGES.CONFIRM_DELETE)) return;
            
            try {
                const response = await api.eliminarUsuario(id);
                if (response.success) {
                    emit('notificar', {
                        mensaje: response.message || CONFIG.MESSAGES.SUCCESS_DELETE,
                        tipo: 'success'
                    });
                    await cargarUsuarios();
                }
            } catch (error) {
                emit('notificar', {
                    mensaje: 'Error al eliminar: ' + error.message,
                    tipo: 'error'
                });
            }
        };

        Vue.onMounted(cargarUsuarios);

        return {
            usuarios,
            mostrarModal,
            modoEdicion,
            usuarioSeleccionado,
            filtros,
            abrirFormulario,
            cerrarModal,
            guardarUsuario,
            toggleEstado,
            eliminarUsuario,
            aplicarFiltros
        };
    }
};