import { supabase } from "./supebaseClient.js";

//========================
// DOM
//========================
const form = document.getElementById("estudiante-form");
const inputId = document.getElementById("idEstudiante");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputIdCarrera = document.getElementById("idCarrera");
const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");
const statusDiv = document.getElementById("status");
let editando = false;
let listaEstudiante = document.getElementById("lista");
//========================
//Eventos
//========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = inputNombre.value.trim();
  const correo = inputCorreo.value.trim();
  const idCarrera = parseInt(inputIdCarrera.value.trim());
  if (editando) {
  } else {
    await crearEstudiante(nombre, correo, idCarrera);
  }

  form.reset();
});

listaEstudiante.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id");
    await eliminarEstudiante(id);
    cargarEstudiante();
  }
});

//===================================
//CRUD (CREATE-READ-UPDATE-DELETE)
//===================================
async function cargarEstudiantes() {
  let { data: estudiantes, error } = await supabase
    .from("Estudiantes")
    .select("*");

  if (error) {
    console.error("Error al cargar estudiante:", error);
    return;
  }
  listaEstudiante.innerHTML = "";
  estudiante.forEach((estudiante) => {
    let li = document.createElement("li");
    li.innerHTML = `${estudiante.nombre} - ${estudiante.correo} [${estudiante.idCarrera} ID Carrera] <button class="btn-delete" data-id="${estudiante.idEstudiante}">Eliminar</button>`;
    listaEstudiante.appendChild(li);
  });
}
async function crearEstudiante(nombre, correo, idCarrera) {
  const estudiante = { nombre, correo, idCarrera };
  let { error } = await supabase.from("Estudiante").insert([estudiante]);
  if (error) {
    console.error("Error al crear estudiante:", error);
  }
  cargarEstudiante();
}

async function eliminarEstudiante(idEstudiante) {
  let { error } = await supabase
    .from("Estudiante")
    .delete()
    .eq("idEstudiante", idEstudiante);
  if (error) {
    console.error("Error al eliminar estudiante:", error);
  }
}

cargarEstudiante();
