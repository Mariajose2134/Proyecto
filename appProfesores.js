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
   await crearProfesor(codigo, nombre, correo, celular);
  }

  form.reset();
});

listaProfesores.addEventListener("click", async (e) => {
  if (e.target.classList.contains("btn-delete")) {
    const id = e.target.getAttribute("data-id");
    await eliminarProfesor(id);
    cargarProfesores();
  }
});


async function cargarProfesores() {
  let { data: profesores, error } = await supabase.from("Profesores").select("*");

  if (error) {
    console.error("Error al cargar profespres:", error);
    return;
  }
  listaProfesores.innerHTML = "";
  profesores.forEach((profesor) => {
    let li = document.createElement("li");
    //li.textContent = curso.codigo + " - " + curso.nombre;
    li.innerHTML = `${profesor.codigo} - ${profesor.nombre} ${profesor.correo} ${profesor.celular}  <button class="btn-delete" data-id="${profesor.codigo}">Eliminar</button>`;
    listaProfesores.appendChild(li);
  });
}

async function crearProfesor(codigo, nombre, correo, celular) {
  const profesor = { codigo, nombre, correo, celular };
  let { error } = await supabase.from("Profesores").insert([profesor]);
  if (error) {
    console.error(error);
  }
  cargarProfesores();
}

async function eliminarProfesor(codigo) {
  let { error } = await supabase.from("Profesores").delete().eq("codigo", codigo);
  if (error) {
    console.error(error);
  }
}

cargarProfesores();
