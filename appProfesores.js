import { supabase } from "./supebaseClient.js";

//========================
// DOM
//========================
const form = document.getElementById("profesor-form");
const inputCodigo = document.getElementById("codigo");
const inputNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputCelular = document.getElementById("celular");

const btnSave = document.getElementById("btn-save");
const btnCancel = document.getElementById("btn-cancel");
const statusDiv = document.getElementById("status");
let editando = false;
let listaProfesores = document.getElementById("lista");
//========================
//Eventos
//========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const codigo = inputCodigo.value.trim();
  const nombre = inputNombre.value.trim();   
  const correo = inputCorreo.value.trim();
  const celular = inputCelular.value.trim();
  
  if (editando) {
  } else {
    await crearProfesor(codigo,nombre, correo, celular);
  }

  form.reset();
});

listaEstudiantes.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id");
    await eliminarProfesores(id);
    cargarProfesores();
  }
});

//===================================
//CRUD (CREATE-READ-UPDATE-DELETE)
//===================================
async function cargarProfesores() {
  let { data: Profesores, error } = await supabase.from("Profesor").select("*");

  if (error) {
    console.error("Error al cargar profesor:", error);
    return;
  }
  listaCursos.innerHTML = "";
  Profesores.forEach((Profesor) => {
    let li = document.createElement("li");
    //li.textContent = curso.codigo + " - " + curso.nombre;
    li.innerHTML = `${estudiante.nombre} - ${estudiante.email} [${estudiante.idCarrera} ID Carrera] <button class="btn-delete" data-id="${estudiante.idEstudiante}">Eliminar</button>`;
    listaCursos.appendChild(li);
  });
}
async function crearProfesor(codigo,nombre, correo, celular) {
  const profesor = {codigo, nombre, correo, celular };
  let { error } = await supabase.from("Profesores").insert([profesor]);
  if (error) {
    console.error(error);
  }
  cargarProfesores();
}

async function eliminarProfesores(idProfesor) {
  let { error } = await supabase.from("Profesores").delete().eq("idProfesor", idProfesor);
  if (error) {
    console.error(error);
  }
}

cargarProfesores();
