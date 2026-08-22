// Referencias del DOM - Autenticación
const loginOverlay = document.getElementById('login-overlay');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const appContainer = document.getElementById('app-container');
const btnLogout = document.getElementById('btn-logout');
const userDisplay = document.getElementById('user-display');

// Referencias del DOM - CRUD
const form = document.getElementById('student-form');
const nameInput = document.getElementById('name');
const gradeInput = document.getElementById('grade');
const sectionInput = document.getElementById('section');
const studentIndexInput = document.getElementById('student-index');
const searchInput = document.getElementById('search-input');
const tbody = document.getElementById('students-tbody');
const totalCount = document.getElementById('total-count');
const emptyState = document.getElementById('empty-state');
const emptyText = document.getElementById('empty-text');
const btnSave = document.getElementById('btn-save');
const btnCancel = document.getElementById('btn-cancel');
const formTitle = document.getElementById('form-title');
const toast = document.getElementById('toast');

// Array local de estudiantes
let students = [];

// --- INICIO DE SESIÓN ACCESIBLE ---
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const user = usernameInput.value.trim();
  const pass = passwordInput.value.trim();

  // Permite el ingreso con cualquier usuario y cualquier contraseña no vacíos
  if (user !== '' && pass !== '') {
    loginError.classList.add('hidden');
    loginOverlay.classList.add('hidden');
    appContainer.classList.remove('hidden');
    userDisplay.textContent = user;
    
    // Cargar datos previos si existen en localStorage
    students = JSON.parse(localStorage.getItem('students_v3')) || [];
    renderTable();
    showToast(`👋 ¡Bienvenido/a, ${user}!`);
  } else {
    loginError.textContent = 'Por favor completa ambos campos para ingresar.';
    loginError.classList.remove('hidden');
  }
});

// --- CERRAR SESIÓN Y BORRAR DATOS ---
btnLogout.addEventListener('click', () => {
  if (confirm('⚠️ Al cerrar sesión se BORRARÁN TODOS los estudiantes registrados. ¿Deseas continuar?')) {
    localStorage.removeItem('students_v3');
    students = [];
    renderTable();
    resetForm();

    appContainer.classList.add('hidden');
    loginOverlay.classList.remove('hidden');
    loginForm.reset();
    showToast('🔒 Sesión cerrada y datos eliminados.');
  }
});

// --- VALIDACIÓN DE CAMPOS ---
function validateForm() {
  let valid = true;

  if (nameInput.value.trim().length < 2) {
    setError(nameInput);
    valid = false;
  } else { 
    clearError(nameInput); 
  }

  if (gradeInput.value === '') {
    setError(gradeInput);
    valid = false;
  } else { 
    clearError(gradeInput); 
  }

  if (sectionInput.value.trim() === '') {
    setError(sectionInput);
    valid = false;
  } else { 
    clearError(sectionInput); 
  }

  return valid;
}

function setError(input) {
  input.classList.add('invalid');
  input.closest('.form-group').classList.add('has-error');
}

function clearError(input) {
  input.classList.remove('invalid');
  input.closest('.form-group').classList.remove('has-error');
}

[nameInput, gradeInput, sectionInput].forEach(inp => {
  inp.addEventListener('input', () => clearError(inp));
});

// --- OPERACIONES CRUD ---

// Guardar / Editar
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateForm()) {
    showToast('⚠️ Completa los campos obligatorios.');
    return;
  }

  const studentData = {
    name: nameInput.value.trim(),
    grade: gradeInput.value,
    section: sectionInput.value.trim().toUpperCase()
  };

  const editIndex = studentIndexInput.value;

  if (editIndex === '') {
    students.push(studentData);
    showToast('✨ Estudiante registrado');
  } else {
    students[editIndex] = studentData;
    showToast('✏️ Registro actualizado');
  }

  saveToStorage();
  renderTable();
  resetForm();
});

// Renderizar Tabla / Búsqueda
function renderTable() {
  const query = searchInput.value.toLowerCase().trim();
  tbody.innerHTML = '';

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(query) ||
    s.grade.toLowerCase().includes(query) ||
    s.section.toLowerCase().includes(query)
  );

  totalCount.textContent = students.length;

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    emptyText.textContent = query !== '' 
      ? 'No se encontraron coincidencias.' 
      : 'No hay estudiantes registrados.';
    return;
  }

  emptyState.classList.add('hidden');

  filtered.forEach((student) => {
    const originalIndex = students.indexOf(student);
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td><strong>${student.name}</strong></td>
      <td><span class="badge">${student.grade}</span></td>
      <td>${student.section}</td>
      <td>
        <button type="button" class="btn-action btn-edit" onclick="prepareEdit(${originalIndex})">Editar</button>
        <button type="button" class="btn-action btn-delete" onclick="deleteStudent(${originalIndex})">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Cargar para editar
window.prepareEdit = function(index) {
  const s = students[index];
  nameInput.value = s.name;
  gradeInput.value = s.grade;
  sectionInput.value = s.section;
  studentIndexInput.value = index;

  formTitle.textContent = '✏️ Editar Estudiante';
  btnSave.querySelector('.btn-text').textContent = 'Actualizar Datos';
  btnCancel.classList.remove('hidden');
};

// Eliminar
window.deleteStudent = function(index) {
  if (confirm(`¿Eliminar a "${students[index].name}"?`)) {
    students.splice(index, 1);
    saveToStorage();
    renderTable();
    showToast('🗑️ Registro eliminado');

    if (studentIndexInput.value === String(index)) resetForm();
  }
};

searchInput.addEventListener('input', renderTable);
btnCancel.addEventListener('click', resetForm);

function resetForm() {
  form.reset();
  studentIndexInput.value = '';
  formTitle.textContent = '✨ Registrar Estudiante';
  btnSave.querySelector('.btn-text').textContent = 'Guardar Registro';
  btnCancel.classList.add('hidden');
  document.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));
  document.querySelectorAll('.invalid').forEach(i => i.classList.remove('invalid'));
}

function saveToStorage() {
  localStorage.setItem('students_v3', JSON.stringify(students));
}

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3000);
}