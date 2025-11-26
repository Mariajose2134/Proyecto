import { supabase } from "./supebaseClient.js";

//========================
// DOM
//========================
const form = document.getElementById("estudiante-form");
const inputId = document.getElementById("idEstudiante");
const inputCodigo = document.getElementById("email");
const inputNombre = document.getElementById("nombre");
const inputCreditos = document.getElementById("idCarrera");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");
const statusDiv = document.getElementById("status");
let editando = false;
let listaCursos = document.getElementById("lista");
//========================
//Eventos
//========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = inputCodigo.value.trim();
  const nombre = inputNombre.value.trim();
  const idCarrera = parseInt(inputCreditos.value.trim());
  if (editando) {
  } else {
    await crearCurso(email, nombre, idCarrera);
  }

  form.reset();
});

listaCursos.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id");
    await eliminarCursos(id);
    cargarCursos();
  }
});

//===================================
//CRUD (CREATE-READ-UPDATE-DELETE)
//===================================
async function cargarCursos() {
  let { data: cursos, error } = await supabase.from("Cursos").select("*");

  if (error) {
    console.error("Error al cargar cursos:", error);
    return;
  }
  listaCursos.innerHTML = "";
  cursos.forEach((curso) => {
    let li = document.createElement("li");
    //li.textContent = curso.codigo + " - " + curso.nombre;
    li.innerHTML = `${curso.codigo} - ${curso.nombre} [${curso.creditos} Creditos] <button class="btn-delete" data-id="${curso.idCurso}">Eliminar</button>`;
    listaCursos.appendChild(li);
  });
}
async function crearCurso(codigo, nombre, creditos) {
  const curso = { codigo, nombre, creditos };
  let { error } = await supabase.from("Cursos").insert([curso]);
  if (error) {
    console.error(error);
  }
  cargarCursos();
}

async function eliminarCursos(idCurso) {
  let { error } = await supabase.from("Cursos").delete().eq("idCurso", idCurso);
  if (error) {
    console.error(error);
  }
}

cargarCursos();
