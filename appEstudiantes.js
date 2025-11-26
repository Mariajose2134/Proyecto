import { supabase } from "./supebaseClient.js";

//========================
// DOM
//========================
const form = document.getElementById("estudiante-form");
const inputId = document.getElementById("idEstudiante");
const inputCodigo = document.getElementById("nombre");
const inputNombre = document.getElementById("email");
const inputCreditos = document.getElementById("idCarrera");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");
const statusDiv = document.getElementById("status");
let editando = false;
let listaEstudiantes = document.getElementById("lista");
//========================
//Eventos
//========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();
  const idCarrera = parseInt(inputIdCarrera.value.trim());
  if (editando) {
  } else {
    await crearEstudiante(nombre, email, idCarrera);
  }

  form.reset();
});

listaEstudiantes.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id");
    await eliminarEstudiante(id);
    cargarEstudiantes();
  }
});

//===================================
//CRUD (CREATE-READ-UPDATE-DELETE)
//===================================
async function cargarEstudiantes() {
  let { data: estudiantes, error } = await supabase
    .from("Estudiante")
    .select("*");

  if (error) {
    console.error("Error al cargar estudiante:", error);
    return;
  }
  listaEstudiantes.innerHTML = "";
  estudiantes.forEach((estudiante) => {
    let li = document.createElement("li");
    //li.textContent = curso.codigo + " - " + curso.nombre;
    li.innerHTML = `${estudiante.nombre} - ${estudiante.email} [${estudiante.idCarrera} ID Carrera] <button class="btn-delete" data-id="${estudiante.idEstudiante}">Eliminar</button>`;
    listaEstudiantes.appendChild(li);
  });
}
async function crearEstudiante(nombre, email, idCarrera) {
  const estudiante = { nombre, email, idCarrera };
  let { error } = await supabase.from("Estudiantes").insert([estudiante]);
  if (error) {
    console.error(error);
  }
  cargarEstudiantes();
}

async function eliminarEstudiante(idEstudiante) {
  let { error } = await supabase
    .from("Estudiantes")
    .delete()
    .eq("idEstudiante", idEstudiante);
  if (error) {
    console.error(error);
  }
}

cargarEstudiantes();
