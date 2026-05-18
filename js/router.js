// Configuración de Rutas
const routes = [
    { 
        path: '/', 
        name: 'dashboard',
        component: Dashboard 
    },
    { 
        path: '/usuarios', 
        name: 'usuarios',
        component: UsuarioList 
    },
    { 
        path: '/productos', 
        name: 'productos',
        component: ProductoList 
    },
    { 
        path: '/ventas', 
        name: 'ventas',
        component: VentaList 
    },
    { 
        path: '/ventas/nueva', 
        name: 'venta-nueva',
        component: VentaForm 
    },
    { 
        path: '/inventario', 
        name: 'inventario',
        component: InventarioList 
    }
];

// Crear el router
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
});

window.router = router;