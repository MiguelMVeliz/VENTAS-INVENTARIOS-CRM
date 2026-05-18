<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema Ventas + CRM + Inventario</title>
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/vue-router@4/dist/vue-router.global.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f0f2f5; padding: 20px; }
    nav { 
      background: linear-gradient(135deg, #1a1a2e, #16213e); 
      padding: 15px 20px; 
      border-radius: 10px; 
      margin-bottom: 25px;
      display: flex;
      gap: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    nav a { 
      color: #e0e0e0; 
      text-decoration: none; 
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 6px;
      transition: all 0.3s;
    }
    nav a:hover, nav a.router-link-active { 
      background: #e94560; 
      color: white;
      transform: translateY(-2px);
    }
    .container { 
      background: white; 
      padding: 25px; 
      border-radius: 12px; 
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      min-height: 500px;
    }
    h2 { 
      color: #1a1a2e; 
      margin-bottom: 20px;
      border-bottom: 3px solid #e94560;
      padding-bottom: 10px;
      display: inline-block;
    }
    h3 { color: #16213e; margin: 15px 0; }
    table { 
      width: 100%; 
      border-collapse: collapse; 
      margin: 15px 0;
      border-radius: 8px;
      overflow: hidden;
    }
    th, td { 
      border: 1px solid #e0e0e0; 
      padding: 12px; 
      text-align: left; 
    }
    th { 
      background: #1a1a2e; 
      color: white; 
      font-weight: 600;
    }
    tr:nth-child(even) { background: #f8f9fa; }
    tr:hover { background: #fff3cd; }
    button { 
      background: #e94560; 
      color: white; 
      border: none; 
      padding: 10px 20px; 
      border-radius: 6px; 
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s;
      margin: 3px;
    }
    button:hover { 
      background: #c23152; 
      transform: translateY(-2px);
      box-shadow: 0 4px 10px rgba(233,69,96,0.3);
    }
    button.secondary { background: #0f3460; }
    button.secondary:hover { background: #1a1a2e; }
    button.success { background: #00b894; }
    button.success:hover { background: #00a381; }
    button.danger { background: #d63031; }
    button.danger:hover { background: #b71c1c; }
    button.warning { background: #fdcb6e; color: #333; }
    button.warning:hover { background: #f0b909; }
    input, select, textarea { 
      width: 100%; 
      padding: 10px; 
      margin: 8px 0 15px; 
      border: 2px solid #e0e0e0; 
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.3s;
    }
    input:focus, select:focus, textarea:focus {
      border-color: #e94560;
      outline: none;
    }
    label { 
      font-weight: 600; 
      display: block; 
      margin-top: 10px;
      color: #1a1a2e;
    }
    .form-inline {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }
    .card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }
    .card:hover { transform: translateY(-5px); }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin: 20px 0;
    }
    .stat-card {
      padding: 25px;
      border-radius: 12px;
      color: white;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
    .stat-card h3 { font-size: 1.5em; margin: 10px 0; }
    .stat-card .number { font-size: 3em; font-weight: bold; }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 0.85em;
      font-weight: 600;
    }
    .badge-success { background: #d4edda; color: #155724; }
    .badge-warning { background: #fff3cd; color: #856404; }
    .badge-danger { background: #f8d7da; color: #721c24; }
    .alert {
      padding: 15px;
      border-radius: 8px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .alert-success { background: #d4edda; color: #155724; border-left: 5px solid #28a745; }
    .alert-error { background: #f8d7da; color: #721c24; border-left: 5px solid #dc3545; }
    .alert-info { background: #d1ecf1; color: #0c5460; border-left: 5px solid #17a2b8; }
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal {
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    }
    .producto-mini {
      display: inline-block;
      padding: 5px 10px;
      margin: 3px;
      background: #f0f2f5;
      border-radius: 15px;
      font-size: 0.9em;
    }
    @media (max-width: 768px) {
      nav { flex-wrap: wrap; }
      .form-inline { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

<div id="app">
  <nav>
    <router-link to="/">📊 Dashboard</router-link>
    <router-link to="/usuarios">👥 Usuarios</router-link>
    <router-link to="/productos">📦 Productos</router-link>
    <router-link to="/ventas">💰 Ventas</router-link>
    <router-link to="/inventario">🏭 Inventario</router-link>
  </nav>
  <div class="container">
    <router-view @notificar="mostrarNotificacion"></router-view>
  </div>
  
  <!-- Notificaciones -->
  <div v-if="notificacion.mostrar" 
       :class="'alert alert-' + notificacion.tipo"
       style="position: fixed; top: 20px; right: 20px; z-index: 2000; min-width: 300px;">
    {{ notificacion.mensaje }}
    <button @click="notificacion.mostrar = false" style="margin-left: auto; background: transparent; color: inherit;">✕</button>
  </div>
</div>

<script>
const { createApp, ref, reactive, computed, onMounted, provide } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// ==================== DATOS FICTICIOS INICIALES ====================
const DATOS_INICIALES = {
  usuarios: [
    { id: "U001", nombre: "María García López", email: "maria.garcia@email.com", telefono: "555-0101", tipo: "vendedor", comision: 5, activo: true },
    { id: "U002", nombre: "Carlos Rodríguez Martínez", email: "carlos.rodriguez@email.com", telefono: "555-0102", tipo: "vendedor", comision: 7, activo: true },
    { id: "U003", nombre: "Ana Martínez Ruiz", email: "ana.martinez@email.com", telefono: "555-0103", tipo: "cliente", direccion: "Calle Principal 123", categoria: "VIP", activo: true },
    { id: "U004", nombre: "Pedro Sánchez Torres", email: "pedro.sanchez@email.com", telefono: "555-0104", tipo: "cliente", direccion: "Av. Central 456", categoria: "Regular", activo: true },
    { id: "U005", nombre: "Laura Fernández Díaz", email: "laura.fernandez@email.com", telefono: "555-0105", tipo: "cliente", direccion: "Calle Norte 789", categoria: "VIP", activo: true },
    { id: "U006", nombre: "Jorge Ramírez Vega", email: "jorge.ramirez@email.com", telefono: "555-0106", tipo: "vendedor", comision: 5, activo: true },
    { id: "U007", nombre: "Sofía Morales Cruz", email: "sofia.morales@email.com", telefono: "555-0107", tipo: "cliente", direccion: "Calle Sur 321", categoria: "Regular", activo: false },
  ],
  productos: [
    { codigo: "P001", nombre: "Laptop Pro X1", descripcion: "Laptop empresarial 15.6\" i7 16GB RAM", precioCosto: 800.00, precioVenta: 1200.00, stock: 25, categoria: "Electrónicos", proveedor: "TechSupply Inc." },
    { codigo: "P002", nombre: "Monitor UltraSharp 27\"", descripcion: "Monitor 4K UHD 27 pulgadas", precioCosto: 350.00, precioVenta: 550.00, stock: 40, categoria: "Electrónicos", proveedor: "DisplayMasters" },
    { codigo: "P003", nombre: "Teclado Mecánico RGB", descripcion: "Teclado gaming switches Cherry MX", precioCosto: 60.00, precioVenta: 99.99, stock: 100, categoria: "Periféricos", proveedor: "GamingGear Co." },
    { codigo: "P004", nombre: "Mouse Inalámbrico Pro", descripcion: "Mouse ergonómico recargable", precioCosto: 30.00, precioVenta: 49.99, stock: 150, categoria: "Periféricos", proveedor: "GamingGear Co." },
    { codigo: "P005", nombre: "Webcam HD 1080p", descripcion: "Cámara web con micrófono integrado", precioCosto: 45.00, precioVenta: 79.99, stock: 75, categoria: "Accesorios", proveedor: "TechSupply Inc." },
    { codigo: "P006", nombre: "Audífonos Bluetooth", descripcion: "Audífonos over-ear noise cancelling", precioCosto: 70.00, precioVenta: 129.99, stock: 60, categoria: "Audio", proveedor: "SoundMasters" },
    { codigo: "P007", nombre: "Tablet Pro 10\"", descripcion: "Tablet Android 128GB WiFi", precioCosto: 250.00, precioVenta: 399.99, stock: 30, categoria: "Electrónicos", proveedor: "TechSupply Inc." },
    { codigo: "P008", nombre: "Impresora Laser Jet", descripcion: "Impresora láser monocromática", precioCosto: 180.00, precioVenta: 299.99, stock: 20, categoria: "Impresión", proveedor: "PrintSolutions" },
  ],
  ventas: [
    {
      numeroFactura: "FAC-2024-001",
      fecha: "2024-01-15 10:30:00",
      idVendedor: "U001",
      idCliente: "U003",
      estado: "Completada",
      lineas: [
        { codigoProducto: "P001", cantidad: 1, precioUnitario: 1200.00, descuento: 100.00, subtotal: 1100.00 },
        { codigoProducto: "P003", cantidad: 2, precioUnitario: 99.99, descuento: 0, subtotal: 199.98 }
      ],
      total: 1299.98
    },
    {
      numeroFactura: "FAC-2024-002",
      fecha: "2024-01-16 14:20:00",
      idVendedor: "U002",
      idCliente: "U004",
      estado: "Completada",
      lineas: [
        { codigoProducto: "P002", cantidad: 2, precioUnitario: 550.00, descuento: 50.00, subtotal: 1050.00 }
      ],
      total: 1050.00
    },
    {
      numeroFactura: "FAC-2024-003",
      fecha: "2024-01-17 09:15:00",
      idVendedor: "U001",
      idCliente: "U005",
      estado: "Pendiente",
      lineas: [
        { codigoProducto: "P006", cantidad: 1, precioUnitario: 129.99, descuento: 0, subtotal: 129.99 },
        { codigoProducto: "P004", cantidad: 3, precioUnitario: 49.99, descuento: 10.00, subtotal: 139.97 },
        { codigoProducto: "P005", cantidad: 1, precioUnitario: 79.99, descuento: 0, subtotal: 79.99 }
      ],
      total: 349.95
    }
  ],
  movimientos: [
    { id: 1, fecha: "2024-01-10 08:00:00", codProducto: "P001", cantidad: 20, motivo: "Compra inicial", documentoReferencia: "FAC-PROV-001" },
    { id: 2, fecha: "2024-01-10 08:00:00", codProducto: "P002", cantidad: 30, motivo: "Compra inicial", documentoReferencia: "FAC-PROV-002" },
    { id: 3, fecha: "2024-01-12 11:00:00", codProducto: "P003", cantidad: 100, motivo: "Reabastecimiento", documentoReferencia: "FAC-PROV-003" },
    { id: 4, fecha: "2024-01-18 15:00:00", codProducto: "P006", cantidad: 50, motivo: "Nuevo producto", documentoReferencia: "FAC-PROV-004" },
  ]
};

// Inicializar localStorage si está vacío
if (!localStorage.getItem('usuarios')) {
  localStorage.setItem('usuarios', JSON.stringify(DATOS_INICIALES.usuarios));
}
if (!localStorage.getItem('productos')) {
  localStorage.setItem('productos', JSON.stringify(DATOS_INICIALES.productos));
}
if (!localStorage.getItem('ventas')) {
  localStorage.setItem('ventas', JSON.stringify(DATOS_INICIALES.ventas));
}
if (!localStorage.getItem('movimientos')) {
  localStorage.setItem('movimientos', JSON.stringify(DATOS_INICIALES.movimientos));
}

// ==================== API (localStorage) ====================
const api = {
  getUsuarios() {
    return Promise.resolve({ data: JSON.parse(localStorage.getItem('usuarios') || '[]') });
  },
  saveUsuario(usuario) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const index = usuarios.findIndex(u => u.id === usuario.id);
    if (index >= 0) usuarios[index] = usuario;
    else usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    return Promise.resolve({ data: usuario, success: true, message: 'Usuario guardado exitosamente' });
  },
  deleteUsuario(id) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    localStorage.setItem('usuarios', JSON.stringify(usuarios.filter(u => u.id !== id)));
    return Promise.resolve({ success: true, message: 'Usuario eliminado' });
  },
  getProductos() {
    return Promise.resolve({ data: JSON.parse(localStorage.getItem('productos') || '[]') });
  },
  saveProducto(producto) {
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    const index = productos.findIndex(p => p.codigo === producto.codigo);
    if (index >= 0) productos[index] = { ...productos[index], ...producto };
    else productos.push({ ...producto, stock: producto.stock || 0 });
    localStorage.setItem('productos', JSON.stringify(productos));
    return Promise.resolve({ data: producto, success: true, message: 'Producto guardado' });
  },
  deleteProducto(codigo) {
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    localStorage.setItem('productos', JSON.stringify(productos.filter(p => p.codigo !== codigo)));
    return Promise.resolve({ success: true, message: 'Producto eliminado' });
  },
  getVentas() {
    return Promise.resolve({ data: JSON.parse(localStorage.getItem('ventas') || '[]') });
  },
  saveVenta(venta) {
    const ventas = JSON.parse(localStorage.getItem('ventas') || '[]');
    const nuevaVenta = {
      ...venta,
      fecha: new Date().toLocaleString('es-ES', { 
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }),
      total: venta.lineas.reduce((sum, l) => sum + l.cantidad * l.precioUnitario - (l.descuento || 0), 0),
      estado: venta.estado || 'Completada'
    };
    
    // Descontar stock
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    nuevaVenta.lineas.forEach(linea => {
      const prod = productos.find(p => p.codigo === linea.codigoProducto);
      if (prod) {
        prod.stock = Math.max(0, (prod.stock || 0) - linea.cantidad);
      }
    });
    localStorage.setItem('productos', JSON.stringify(productos));
    
    ventas.unshift(nuevaVenta);
    localStorage.setItem('ventas', JSON.stringify(ventas));
    return Promise.resolve({ data: nuevaVenta, success: true, message: 'Venta registrada con éxito' });
  },
  getMovimientos() {
    return Promise.resolve({ data: JSON.parse(localStorage.getItem('movimientos') || '[]') });
  },
  saveMovimiento(mov) {
    const movimientos = JSON.parse(localStorage.getItem('movimientos') || '[]');
    const nuevoMov = {
      ...mov,
      id: Date.now(),
      fecha: new Date().toLocaleString('es-ES', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
      })
    };
    movimientos.unshift(nuevoMov);
    localStorage.setItem('movimientos', JSON.stringify(movimientos));

    // Aumentar stock
    const productos = JSON.parse(localStorage.getItem('productos') || '[]');
    const producto = productos.find(p => p.codigo === mov.codProducto);
    if (producto) {
      producto.stock = (producto.stock || 0) + mov.cantidad;
      localStorage.setItem('productos', JSON.stringify(productos));
    }

    return Promise.resolve({ data: nuevoMov, success: true, message: `Entrada registrada. Stock actualizado (+${mov.cantidad})` });
  }
};

// ==================== COMPONENTES ====================

// Dashboard Mejorado
const Dashboard = {
  template: `
    <div>
      <h2>📊 Panel de Control</h2>
      <div class="stats-grid">
        <div class="stat-card" style="background: linear-gradient(135deg, #667eea, #764ba2);">
          <div>👥 Usuarios Activos</div>
          <div class="number">{{ stats.usuariosActivos }}</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #f093fb, #f5576c);">
          <div>📦 Productos</div>
          <div class="number">{{ stats.totalProductos }}</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #4facfe, #00f2fe);">
          <div>💰 Ventas del Mes</div>
          <div class="number">\${{ stats.ventasMes }}</div>
        </div>
        <div class="stat-card" style="background: linear-gradient(135deg, #43e97b, #38f9d7);">
          <div>📈 Stock Total</div>
          <div class="number">{{ stats.stockTotal }}</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 30px;">
        <div class="card">
          <h3>🏆 Top Vendedores</h3>
          <table>
            <tr v-for="(v, i) in topVendedores" :key="i">
              <td>#{{ i + 1 }}</td>
              <td>{{ v.nombre }}</td>
              <td>{{ v.ventas }} ventas</td>
              <td>\${{ v.total.toFixed(2) }}</td>
            </tr>
          </table>
        </div>
        <div class="card">
          <h3>📦 Productos Más Vendidos</h3>
          <table>
            <tr v-for="(p, i) in topProductos" :key="i">
              <td>#{{ i + 1 }}</td>
              <td>{{ p.nombre }}</td>
              <td>{{ p.cantidad }} uds.</td>
              <td><span :class="p.stock < 10 ? 'badge badge-danger' : 'badge badge-success'">Stock: {{ p.stock }}</span></td>
            </tr>
          </table>
        </div>
      </div>

      <div class="card" style="margin-top: 20px;">
        <h3>🔔 Últimas Actividades</h3>
        <div v-for="act in actividades" :key="act.id" 
             :class="'alert alert-' + act.tipo" style="margin: 5px 0;">
          <strong>{{ act.fecha }}</strong> - {{ act.descripcion }}
        </div>
      </div>
    </div>
  `,
  setup() {
    const stats = reactive({ usuariosActivos: 0, totalProductos: 0, ventasMes: 0, stockTotal: 0 });
    const topVendedores = ref([]);
    const topProductos = ref([]);
    const actividades = ref([]);

    onMounted(async () => {
      const [usuarios, productos, ventas, movimientos] = await Promise.all([
        api.getUsuarios(), api.getProductos(), api.getVentas(), api.getMovimientos()
      ]);

      stats.usuariosActivos = usuarios.data.filter(u => u.activo).length;
      stats.totalProductos = productos.data.length;
      stats.ventasMes = ventas.data
        .filter(v => v.estado === 'Completada')
        .reduce((sum, v) => sum + v.total, 0)
        .toFixed(2);
      stats.stockTotal = productos.data.reduce((sum, p) => sum + (p.stock || 0), 0);

      // Top vendedores
      const vendedoresVentas = {};
      ventas.data.filter(v => v.estado === 'Completada').forEach(v => {
        if (!vendedoresVentas[v.idVendedor]) vendedoresVentas[v.idVendedor] = { ventas: 0, total: 0 };
        vendedoresVentas[v.idVendedor].ventas++;
        vendedoresVentas[v.idVendedor].total += v.total;
      });
      topVendedores.value = Object.entries(vendedoresVentas)
        .map(([id, data]) => {
          const user = usuarios.data.find(u => u.id === id);
          return { nombre: user ? user.nombre : id, ...data };
        })
        .sort((a, b) => b.total - a.total)
        .slice(0, 3);

      // Top productos
      const productosVendidos = {};
      ventas.data.filter(v => v.estado === 'Completada').forEach(v => {
        v.lineas.forEach(l => {
          if (!productosVendidos[l.codigoProducto]) productosVendidos[l.codigoProducto] = 0;
          productosVendidos[l.codigoProducto] += l.cantidad;
        });
      });
      topProductos.value = Object.entries(productosVendidos)
        .map(([codigo, cantidad]) => {
          const prod = productos.data.find(p => p.codigo === codigo);
          return { 
            nombre: prod ? prod.nombre : codigo, 
            cantidad, 
            stock: prod ? prod.stock : 0 
          };
        })
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, 5);

      // Actividades recientes
      actividades.value = [
        ...ventas.data.slice(0, 3).map(v => ({
          id: 'v' + v.numeroFactura,
          fecha: v.fecha,
          descripcion: `Venta ${v.numeroFactura} - Total: $${v.total.toFixed(2)}`,
          tipo: v.estado === 'Completada' ? 'success' : 'warning'
        })),
        ...movimientos.data.slice(0, 3).map(m => ({
          id: 'm' + m.id,
          fecha: m.fecha,
          descripcion: `Entrada de ${m.cantidad} uds. de ${m.codProducto} - ${m.motivo}`,
          tipo: 'info'
        }))
      ].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 6);
    });

    return { stats, topVendedores, topProductos, actividades };
  }
};

// Usuarios con búsqueda y filtros
const UsuarioList = {
  template: `
    <div>
      <h2>👥 Gestión de Usuarios</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <input v-model="busqueda" placeholder="🔍 Buscar usuario..." style="width: 300px;" />
        <select v-model="filtroTipo" style="width: 200px;">
          <option value="">Todos los tipos</option>
          <option value="vendedor">Vendedores</option>
          <option value="cliente">Clientes</option>
        </select>
        <button @click="mostrarFormulario(null)" class="success">+ Nuevo Usuario</button>
      </div>

      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Tipo</th><th>Estado</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          <tr v-for="u in usuariosFiltrados" :key="u.id" :style="!u.activo ? 'opacity: 0.6;' : ''">
            <td><strong>{{ u.id }}</strong></td>
            <td>{{ u.nombre }}</td>
            <td>{{ u.email }}</td>
            <td>
              <span :class="'badge ' + (u.tipo === 'vendedor' ? 'badge-warning' : 'badge-success')">
                {{ u.tipo }}
              </span>
            </td>
            <td>
              <span :class="'badge ' + (u.activo ? 'badge-success' : 'badge-danger')">
                {{ u.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td>
              <button @click="mostrarFormulario(u)">✏️</button>
              <button @click="toggleEstado(u)" :class="u.activo ? 'warning' : 'success'">
                {{ u.activo ? '🔒' : '🔓' }}
              </button>
              <button @click="eliminar(u.id)" class="danger">🗑️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal Formulario -->
      <div v-if="formVisible" class="modal-overlay" @click.self="formVisible = false">
        <div class="modal">
          <h3>{{ editando ? '✏️ Editar' : '➕ Nuevo' }} Usuario</h3>
          <form @submit.prevent="guardar">
            <div class="form-inline">
              <div>
                <label>ID:</label>
                <input v-model="form.id" required :disabled="editando" placeholder="Ej: U008" />
              </div>
              <div>
                <label>Nombre:</label>
                <input v-model="form.nombre" required placeholder="Nombre completo" />
              </div>
            </div>
            <div class="form-inline">
              <div>
                <label>Email:</label>
                <input v-model="form.email" type="email" required placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label>Teléfono:</label>
                <input v-model="form.telefono" placeholder="555-XXXX" />
              </div>
            </div>
            <div class="form-inline">
              <div>
                <label>Tipo:</label>
                <select v-model="form.tipo" required>
                  <option value="vendedor">Vendedor</option>
                  <option value="cliente">Cliente</option>
                </select>
              </div>
              <div v-if="form.tipo === 'vendedor'">
                <label>Comisión (%):</label>
                <input v-model.number="form.comision" type="number" min="0" max="100" />
              </div>
              <div v-if="form.tipo === 'cliente'">
                <label>Categoría:</label>
                <select v-model="form.categoria">
                  <option value="Regular">Regular</option>
                  <option value="VIP">VIP</option>
                </select>
              </div>
            </div>
            <div v-if="form.tipo === 'cliente'">
              <label>Dirección:</label>
              <input v-model="form.direccion" placeholder="Dirección completa" />
            </div>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
              <button type="submit" class="success">💾 Guardar</button>
              <button type="button" @click="formVisible = false" class="secondary">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  setup(props, { emit }) {
    const usuarios = ref([]);
    const busqueda = ref('');
    const filtroTipo = ref('');
    const formVisible = ref(false);
    const editando = ref(false);
    const form = reactive({ id: '', nombre: '', email: '', telefono: '', tipo: 'cliente', comision: 5, categoria: 'Regular', direccion: '', activo: true });

    const usuariosFiltrados = computed(() => {
      return usuarios.value.filter(u => {
        const matchBusqueda = !busqueda.value || 
          u.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          u.id.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          u.email.toLowerCase().includes(busqueda.value.toLowerCase());
        const matchTipo = !filtroTipo.value || u.tipo === filtroTipo.value;
        return matchBusqueda && matchTipo;
      });
    });

    const cargar = async () => {
      const res = await api.getUsuarios();
      usuarios.value = res.data;
    };

    const mostrarFormulario = (usuario) => {
      if (usuario) {
        Object.assign(form, usuario);
        editando.value = true;
      } else {
        Object.assign(form, { id: '', nombre: '', email: '', telefono: '', tipo: 'cliente', comision: 5, categoria: 'Regular', direccion: '', activo: true });
        editando.value = false;
      }
      formVisible.value = true;
    };

    const guardar = async () => {
      await api.saveUsuario({ ...form });
      await cargar();
      formVisible.value = false;
      emit('notificar', { mensaje: 'Usuario guardado exitosamente', tipo: 'success' });
    };

    const toggleEstado = async (usuario) => {
      usuario.activo = !usuario.activo;
      await api.saveUsuario(usuario);
      await cargar();
      emit('notificar', { 
        mensaje: `Usuario ${usuario.activo ? 'activado' : 'desactivado'}`, 
        tipo: usuario.activo ? 'success' : 'warning' 
      });
    };

    const eliminar = async (id) => {
      if (confirm('¿Está seguro de eliminar este usuario?')) {
        await api.deleteUsuario(id);
        await cargar();
        emit('notificar', { mensaje: 'Usuario eliminado', tipo: 'error' });
      }
    };

    onMounted(cargar);
    return { usuarios, busqueda, filtroTipo, usuariosFiltrados, formVisible, editando, form, mostrarFormulario, guardar, toggleEstado, eliminar };
  }
};

// Productos con búsqueda
const ProductoList = {
  template: `
    <div>
      <h2>📦 Catálogo de Productos</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <input v-model="busqueda" placeholder="🔍 Buscar producto..." style="width: 300px;" />
        <select v-model="filtroCategoria" style="width: 200px;">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
        </select>
        <button @click="mostrarFormulario(null)" class="success">+ Nuevo Producto</button>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
        <div v-for="p in productosFiltrados" :key="p.codigo" class="card" style="cursor: pointer;">
          <h3>{{ p.nombre }}</h3>
          <p style="color: #666;">{{ p.codigo }} - {{ p.categoria }}</p>
          <p>{{ p.descripcion }}</p>
          <div style="display: flex; justify-content: space-between; margin: 10px 0;">
            <div>
              <small>Costo:</small><br>
              <strong>\${{ p.precioCosto.toFixed(2) }}</strong>
            </div>
            <div>
              <small>Venta:</small><br>
              <strong style="color: #e94560;">\${{ p.precioVenta.toFixed(2) }}</strong>
            </div>
            <div>
              <small>Stock:</small><br>
              <span :class="'badge ' + (p.stock > 20 ? 'badge-success' : p.stock > 5 ? 'badge-warning' : 'badge-danger')">
                {{ p.stock }} uds.
              </span>
            </div>
          </div>
          <div style="display: flex; gap: 5px; margin-top: 10px;">
            <button @click="mostrarFormulario(p)" class="secondary" style="flex: 1;">✏️ Editar</button>
            <button @click="eliminar(p.codigo)" class="danger" style="flex: 1;">🗑️ Eliminar</button>
          </div>
        </div>
      </div>

      <!-- Modal -->
      <div v-if="formVisible" class="modal-overlay" @click.self="formVisible = false">
        <div class="modal">
          <h3>{{ editando ? '✏️ Editar' : '➕ Nuevo' }} Producto</h3>
          <form @submit.prevent="guardar">
            <div class="form-inline">
              <div>
                <label>Código:</label>
                <input v-model="form.codigo" required :disabled="editando" />
              </div>
              <div>
                <label>Nombre:</label>
                <input v-model="form.nombre" required />
              </div>
            </div>
            <label>Descripción:</label>
            <textarea v-model="form.descripcion" rows="2"></textarea>
            <div class="form-inline">
              <div>
                <label>Precio Costo:</label>
                <input v-model.number="form.precioCosto" type="number" step="0.01" min="0" required />
              </div>
              <div>
                <label>Precio Venta:</label>
                <input v-model.number="form.precioVenta" type="number" step="0.01" min="0" required />
              </div>
            </div>
            <div class="form-inline">
              <div>
                <label>Categoría:</label>
                <select v-model="form.categoria">
                  <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div>
                <label>Proveedor:</label>
                <input v-model="form.proveedor" />
              </div>
            </div>
            <div style="margin-top: 20px; display: flex; gap: 10px;">
              <button type="submit" class="success">💾 Guardar</button>
              <button type="button" @click="formVisible = false" class="secondary">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  setup(props, { emit }) {
    const productos = ref([]);
    const busqueda = ref('');
    const filtroCategoria = ref('');
    const formVisible = ref(false);
    const editando = ref(false);
    const form = reactive({ codigo: '', nombre: '', descripcion: '', precioCosto: 0, precioVenta: 0, categoria: '', proveedor: '', stock: 0 });
    
    const categorias = computed(() => [...new Set(productos.value.map(p => p.categoria))]);
    
    const productosFiltrados = computed(() => {
      return productos.value.filter(p => {
        const matchBusqueda = !busqueda.value || 
          p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
          p.codigo.toLowerCase().includes(busqueda.value.toLowerCase());
        const matchCategoria = !filtroCategoria.value || p.categoria === filtroCategoria.value;
        return matchBusqueda && matchCategoria;
      });
    });

    const cargar = async () => {
      const res = await api.getProductos();
      productos.value = res.data;
    };

    const mostrarFormulario = (producto) => {
      if (producto) {
        Object.assign(form, producto);
        editando.value = true;
      } else {
        Object.assign(form, { codigo: '', nombre: '', descripcion: '', precioCosto: 0, precioVenta: 0, categoria: '', proveedor: '', stock: 0 });
        editando.value = false;
      }
      formVisible.value = true;
    };

    const guardar = async () => {
      await api.saveProducto({ ...form });
      await cargar();
      formVisible.value = false;
      emit('notificar', { mensaje: 'Producto guardado exitosamente', tipo: 'success' });
    };

    const eliminar = async (codigo) => {
      if (confirm('¿Eliminar este producto?')) {
        await api.deleteProducto(codigo);
        await cargar();
        emit('notificar', { mensaje: 'Producto eliminado', tipo: 'error' });
      }
    };

    onMounted(cargar);
    return { productos, busqueda, filtroCategoria, categorias, productosFiltrados, formVisible, editando, form, mostrarFormulario, guardar, eliminar };
  }
};

// Registro de Venta Mejorado
const VentaForm = {
  template: `
    <div>
      <h2>💰 Nueva Venta</h2>
      <form @submit.prevent="registrarVenta">
        <div class="form-inline">
          <div>
            <label>N° Factura:</label>
            <input v-model="venta.numeroFactura" required :placeholder="'FAC-' + new Date().getFullYear() + '-XXX'" />
          </div>
          <div>
            <label>Vendedor:</label>
            <select v-model="venta.idVendedor" required>
              <option value="">Seleccione vendedor...</option>
              <option v-for="u in vendedores" :key="u.id" :value="u.id">
                {{ u.nombre }} (Comisión: {{ u.comision }}%)
              </option>
            </select>
          </div>
          <div>
            <label>Cliente:</label>
            <select v-model="venta.idCliente" required>
              <option value="">Seleccione cliente...</option>
              <option v-for="u in clientes" :key="u.id" :value="u.id">
                {{ u.nombre }} {{ u.categoria === 'VIP' ? '⭐' : '' }}
              </option>
            </select>
          </div>
        </div>

        <h3>🛒 Líneas de Venta</h3>
        <table>
          <thead>
            <tr><th>Producto</th><th>Stock</th><th>Cant.</th><th>Precio</th><th>Desc.</th><th>Subtotal</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="(linea, i) in lineas" :key="i" :style="linea.stockInsuficiente ? 'background: #ffe0e0;' : ''">
              <td>
                <select v-model="linea.codigoProducto" @change="actualizarLinea(i)" required>
                  <option value="">Seleccione...</option>
                  <option v-for="p in productosDisponibles" :key="p.codigo" :value="p.codigo">
                    {{ p.nombre }} - \${{ p.precioVenta }}
                  </option>
                </select>
              </td>
              <td>
                <span :class="'badge ' + (linea.stockDisponible > 10 ? 'badge-success' : 'badge-warning')">
                  {{ linea.stockDisponible }}
                </span>
              </td>
              <td>
                <input v-model.number="linea.cantidad" type="number" min="1" 
                       :max="linea.stockDisponible" required 
                       @change="validarStock(i)" />
              </td>
              <td>\${{ linea.precioUnitario.toFixed(2) }}</td>
              <td>
                <input v-model.number="linea.descuento" type="number" step="0.01" min="0" 
                       style="width: 80px;" />
              </td>
              <td><strong>\${{ calcularSubtotal(linea).toFixed(2) }}</strong></td>
              <td>
                <button type="button" @click="eliminarLinea(i)" class="danger">✕</button>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div v-if="lineas.length > 0" style="margin-top: 10px;">
          <button type="button" @click="agregarLinea" class="secondary">+ Agregar Producto</button>
          <span v-if="hayErroresStock" style="color: red; margin-left: 20px;">
            ⚠️ Hay productos con stock insuficiente
          </span>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-top: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3>Resumen</h3>
              <p>Productos: {{ lineas.length }}</p>
              <p>Artículos: {{ totalArticulos }}</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #e94560; font-size: 2em;">\${{ total.toFixed(2) }}</h2>
              <button type="submit" :disabled="hayErroresStock" 
                      :class="hayErroresStock ? 'secondary' : 'success'"
                      style="font-size: 1.2em; padding: 15px 40px;">
                💰 Cobrar Venta
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  `,
  setup(props, { emit }) {
    const productos = ref([]);
    const usuarios = ref([]);
    const venta = reactive({ numeroFactura: '', idVendedor: '', idCliente: '', estado: 'Completada' });
    const lineas = ref([]);

    const vendedores = computed(() => usuarios.value.filter(u => u.tipo === 'vendedor' && u.activo));
    const clientes = computed(() => usuarios.value.filter(u => u.tipo === 'cliente' && u.activo));
    
    const productosDisponibles = computed(() => 
      productos.value.filter(p => p.stock > 0)
    );

    const total = computed(() => 
      lineas.value.reduce((sum, l) => sum + calcularSubtotal(l), 0)
    );

    const totalArticulos = computed(() => 
      lineas.value.reduce((sum, l) => sum + (l.cantidad || 0), 0)
    );

    const hayErroresStock = computed(() => 
      lineas.value.some(l => l.stockInsuficiente)
    );

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
      linea.stockInsuficiente = linea.cantidad > linea.stockDisponible;
    };

    const agregarLinea = () => {
      lineas.value.push({ 
        codigoProducto: '', 
        cantidad: 1, 
        precioUnitario: 0, 
        descuento: 0, 
        stockDisponible: 0,
        stockInsuficiente: false,
        nombreProducto: ''
      });
    };

    const eliminarLinea = (index) => lineas.value.splice(index, 1);

    const registrarVenta = async () => {
      if (lineas.value.length === 0) {
        emit('notificar', { mensaje: 'Agregue al menos un producto', tipo: 'error' });
        return;
      }
      if (hayErroresStock.value) {
        emit('notificar', { mensaje: 'Corrija los productos con stock insuficiente', tipo: 'error' });
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
        }))
      };

      await api.saveVenta(ventaData);
      emit('notificar', { 
        mensaje: `Venta ${venta.numeroFactura} registrada por \$ ${total.value.toFixed(2)}`, 
        tipo: 'success' 
      });
      
      Object.assign(venta, { numeroFactura: '', idVendedor: '', idCliente: '' });
      lineas.value = [];
      agregarLinea();
    };

    onMounted(async () => {
      const [p, u] = await Promise.all([api.getProductos(), api.getUsuarios()]);
      productos.value = p.data;
      usuarios.value = u.data;
      agregarLinea();
    });

    return { 
      productos, usuarios, venta, lineas, vendedores, clientes, 
      productosDisponibles, total, totalArticulos, hayErroresStock,
      calcularSubtotal, actualizarLinea, validarStock, agregarLinea, 
      eliminarLinea, registrarVenta 
    };
  }
};

// Lista de Ventas con filtros
const VentaList = {
  template: `
    <div>
      <h2>📋 Historial de Ventas</h2>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <button @click="$router.push('/ventas/nueva')" class="success">💰 Nueva Venta</button>
        <select v-model="filtroEstado" style="width: 200px;">
          <option value="">Todos los estados</option>
          <option value="Completada">Completadas</option>
          <option value="Pendiente">Pendientes</option>
          <option value="Cancelada">Canceladas</option>
        </select>
      </div>

      <table>
        <thead>
          <tr><th>Factura</th><th>Fecha</th><th>Vendedor</th><th>Cliente</th><th>Productos</th><th>Total</th><th>Estado</th><th>Detalle</th></tr>
        </thead>
        <tbody>
          <tr v-for="v in ventasFiltradas" :key="v.numeroFactura">
            <td><strong>{{ v.numeroFactura }}</strong></td>
            <td>{{ v.fecha }}</td>
            <td>{{ getNombreUsuario(v.idVendedor) }}</td>
            <td>{{ getNombreUsuario(v.idCliente) }}</td>
            <td>
              <span class="producto-mini" v-for="l in v.lineas" :key="l.codigoProducto">
                {{ l.codigoProducto }} ({{ l.cantidad }})
              </span>
            </td>
            <td><strong style="color: #e94560;">\${{ v.total.toFixed(2) }}</strong></td>
            <td>
              <span :class="'badge ' + (v.estado === 'Completada' ? 'badge-success' : v.estado === 'Pendiente' ? 'badge-warning' : 'badge-danger')">
                {{ v.estado }}
              </span>
            </td>
            <td>
              <button @click="verDetalle(v)" class="secondary">👁️</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal Detalle -->
      <div v-if="ventaDetalle" class="modal-overlay" @click.self="ventaDetalle = null">
        <div class="modal">
          <h3>📄 Detalle de Venta {{ ventaDetalle.numeroFactura }}</h3>
          <p><strong>Fecha:</strong> {{ ventaDetalle.fecha }}</p>
          <p><strong>Vendedor:</strong> {{ getNombreUsuario(ventaDetalle.idVendedor) }}</p>
          <p><strong>Cliente:</strong> {{ getNombreUsuario(ventaDetalle.idCliente) }}</p>
          <p><strong>Estado:</strong> {{ ventaDetalle.estado }}</p>
          
          <h4>Productos:</h4>
          <table>
            <tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Desc.</th><th>Subtotal</th></tr>
            <tr v-for="l in ventaDetalle.lineas" :key="l.codigoProducto">
              <td>{{ l.codigoProducto }}</td>
              <td>{{ l.cantidad }}</td>
              <td>\${{ l.precioUnitario.toFixed(2) }}</td>
              <td>\${{ (l.descuento || 0).toFixed(2) }}</td>
              <td>\${{ l.subtotal.toFixed(2) }}</td>
            </tr>
          </table>
          <h3 style="text-align: right; color: #e94560;">Total: \${{ ventaDetalle.total.toFixed(2) }}</h3>
          <button @click="ventaDetalle = null" class="secondary">Cerrar</button>
        </div>
      </div>
    </div>
  `,
  setup() {
    const ventas = ref([]);
    const usuarios = ref([]);
    const filtroEstado = ref('');
    const ventaDetalle = ref(null);

    const ventasFiltradas = computed(() => {
      return ventas.value.filter(v => !filtroEstado.value || v.estado === filtroEstado.value);
    });

    const getNombreUsuario = (id) => {
      const user = usuarios.value.find(u => u.id === id);
      return user ? user.nombre : id;
    };

    const verDetalle = (venta) => {
      ventaDetalle.value = venta;
    };

    onMounted(async () => {
      const [v, u] = await Promise.all([api.getVentas(), api.getUsuarios()]);
      ventas.value = v.data;
      usuarios.value = u.data;
    });

    return { ventas, ventasFiltradas, filtroEstado, ventaDetalle, getNombreUsuario, verDetalle };
  }
};

// Inventario Mejorado
const InventarioEntrada = {
  template: `
    <div>
      <h2>🏭 Gestión de Inventario</h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div class="card">
          <h3>📥 Registrar Entrada</h3>
          <form @submit.prevent="registrar">
            <label>Producto:</label>
            <select v-model="mov.codProducto" required>
              <option value="">Seleccione producto...</option>
              <option v-for="p in productos" :key="p.codigo" :value="p.codigo">
                {{ p.nombre }} (Stock actual: {{ p.stock }})
              </option>
            </select>
            <label>Cantidad:</label>
            <input v-model.number="mov.cantidad" type="number" min="1" required />
            <label>Motivo:</label>
            <select v-model="mov.motivo" required>
              <option value="">Seleccione motivo...</option>
              <option value="Compra a proveedor">Compra a proveedor</option>
              <option value="Devolución de cliente">Devolución de cliente</option>
              <option value="Ajuste de inventario">Ajuste de inventario</option>
              <option value="Transferencia">Transferencia entre almacenes</option>
            </select>
            <label>Documento Referencia:</label>
            <input v-model="mov.documentoReferencia" placeholder="N° Factura / Guía" />
            <button type="submit" class="success" style="width: 100%; margin-top: 20px;">
              📥 Registrar Entrada
            </button>
          </form>
        </div>

        <div class="card">
          <h3>⚠️ Productos con Stock Bajo</h3>
          <div v-for="p in productosBajos" :key="p.codigo" 
               style="padding: 10px; margin: 5px 0; background: #fff3cd; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <strong>{{ p.nombre }}</strong>
              <br>
              <small>{{ p.codigo }}</small>
            </div>
            <span class="badge badge-danger">Stock: {{ p.stock }}</span>
          </div>
          <p v-if="productosBajos.length === 0" style="color: #28a745;">✅ Todos los productos tienen stock suficiente</p>
        </div>
      </div>

      <div class="card" style="margin-top: 20px;">
        <h3>📋 Últimos Movimientos</h3>
        <table>
          <thead>
            <tr><th>Fecha</th><th>Producto</th><th>Cantidad</th><th>Motivo</th><th>Documento</th><th>Stock Resultante</th></tr>
          </thead>
          <tbody>
            <tr v-for="m in movimientos" :key="m.id">
              <td>{{ m.fecha }}</td>
              <td>{{ getNombreProducto(m.codProducto) }}</td>
              <td>
                <span class="badge badge-success">+{{ m.cantidad }}</span>
              </td>
              <td>{{ m.motivo }}</td>
              <td>{{ m.documentoReferencia || '-' }}</td>
              <td>{{ getStockProducto(m.codProducto) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  setup(props, { emit }) {
    const productos = ref([]);
    const movimientos = ref([]);
    const mov = reactive({ codProducto: '', cantidad: 1, motivo: 'Compra a proveedor', documentoReferencia: '' });

    const productosBajos = computed(() => 
      productos.value.filter(p => p.stock < 10)
    );

    const cargar = async () => {
      const [p, m] = await Promise.all([api.getProductos(), api.getMovimientos()]);
      productos.value = p.data;
      movimientos.value = m.data;
    };

    const getNombreProducto = (codigo) => {
      const prod = productos.value.find(p => p.codigo === codigo);
      return prod ? prod.nombre : codigo;
    };

    const getStockProducto = (codigo) => {
      const prod = productos.value.find(p => p.codigo === codigo);
      return prod ? prod.stock : '?';
    };

    const registrar = async () => {
      const result = await api.saveMovimiento({ ...mov });
      Object.assign(mov, { codProducto: '', cantidad: 1, motivo: 'Compra a proveedor', documentoReferencia: '' });
      await cargar();
      emit('notificar', { mensaje: result.message, tipo: 'success' });
    };

    onMounted(cargar);
    return { productos, movimientos, mov, productosBajos, getNombreProducto, getStockProducto, registrar };
  }
};

// ==================== ROUTER ====================
const routes = [
  { path: '/', component: Dashboard },
  { path: '/usuarios', component: UsuarioList },
  { path: '/productos', component: ProductoList },
  { path: '/ventas', component: VentaList },
  { path: '/ventas/nueva', component: VentaForm },
  { path: '/inventario', component: InventarioEntrada },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// ==================== APP PRINCIPAL ====================
const app = createApp({
  setup() {
    const notificacion = reactive({ mostrar: false, mensaje: '', tipo: 'success' });
    
    const mostrarNotificacion = (data) => {
      notificacion.mostrar = true;
      notificacion.mensaje = data.mensaje;
      notificacion.tipo = data.tipo;
      setTimeout(() => { notificacion.mostrar = false; }, 3000);
    };

    provide('mostrarNotificacion', mostrarNotificacion);
    return { notificacion, mostrarNotificacion };
  }
});

app.use(router);
app.mount('#app');
</script>

</body>
</html>