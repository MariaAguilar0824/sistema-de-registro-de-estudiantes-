# 🎓 Sistema de Control Académico — Portal Estudiantil

Un sistema web intuitivo y dinámico diseñado para la gestión y registro de estudiantes. Cuenta con autenticación simulada, interfaz moderna con animaciones CSS, validación de formularios en tiempo real, búsqueda y persistencia de datos local mediante `localStorage`.

---

## 🚀 Características Principales

* **Acceso y Autenticación:** Interfaz de inicio de sesión (*Login overlay*) en ventana modal que permite acceder ingresando cualquier usuario y contraseña válidos.
* **Gestión CRUD Completa:**
  * **Crear:** Registro de estudiantes con nombre completo, grado/año académico y sección.
  * **Leer:** Vista organizada en tabla interactiva con estado vacío (*Empty state*).
  * **Actualizar:** Carga de datos existentes al formulario para edición en tiempo real.
  * **Eliminar:** Borrado individual de registros previa confirmación del usuario.
* **Búsqueda Dinámica:** Filtro instantáneo por nombre, grado o sección en la tabla de expedientes.
* **Persistencia de Datos (`localStorage`):** Mantiene la información guardada en el navegador aunque se recargue la página.
* **Cierre de Sesión Seguro:** Al cerrar sesión se purgan los registros almacenados en el navegador para reiniciar el entorno.
* **Diseño Moderno & Responsivo:** Interfaz responsiva con fondo animado mediante ondas CSS y notificaciones informativas (*Toasts*).

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Descripción |
| :--- | :--- |
| **HTML5** | Estructura semántica del portal, formularios y tablas. |
| **CSS3** | Estilos avanzados, variables CSS, diseño grid/flexbox, animaciones de fondo y efectos *glassmorphism*. |
| **JavaScript (ES6+)** | Lógica de autenticación, manipulación del DOM, validación de inputs y gestión de `localStorage`. |

---

## 📂 Estructura del Proyecto

```text
portal-estudiantil/
├── index.html    # Estructura semántica de la aplicación
├── style.css     # Estilos visuales, temas y animaciones CSS
└── script.js     # Lógica de la aplicación y operaciones CRUD
