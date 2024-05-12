function llenado_lista_usuarios() {
    element_lista_usuarios = $("#lista_usuarios tbody");
    element_lista_usuarios.empty();
    usuarios.forEach((usuario) => {
        const temaplate = `<tr>
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.carrera}</td>
        <td class="btn_action_cell">
            <button type="button" class="btn_contratar" data-id="${usuario.id}">Contratar</button>
            <button type="button" class="btn_editar" data-id="${usuario.id}">Editar</button>
            <button type="button" class="btn_eliminar" data-id="${usuario.id}">Eliminar</button>
        </td>
        </tr>`;
        element_lista_usuarios.append(temaplate);
    });
    let cantidad_usuarios = $("#cantidad_usuarios");
    let cantidad = cantidad_arreglo(usuarios);
    cantidad_usuarios.empty();
    cantidad_usuarios.append("Cantidad: "+cantidad);


}





function cantidad_arreglo(arreglo) {
    let cantidad = 0;
    arreglo.forEach((a) => {
        cantidad++;
    });
    return cantidad;
}

function asignarIdsUsuarios() {
    for (let i = 0; i < usuarios.length; i++) {
        usuarios[i].id = i + 1;
    }
}
function asignarIdsEmpleados() {
    for (let i = 0; i < empleados.length; i++) {
        empleados[i].id = i + 1;
    }
}
let btn_registrar = $("#btn_registrar");
btn_registrar.click(() => {
    let nombre = $("#nombre").val();
    let carrera = $("#carrera").val();

    if (nombre === "") {
        alert("Nombre de usuario no válido");
    } else if (carrera === "") {
        alert("Carrera no válida");
    } else {
        const nuevoUsuario = {
            id: usuarios.length + 1,
            nombre: nombre,
            carrera: carrera
        };
        usuarios.push(nuevoUsuario);
        llenado_lista_usuarios();
        asignarIdsUsuarios();

        $("#nombre").val("");
        $("#carrera").val("");
    }
});


// Click como Enter
$("#nombre, #carrera").keypress((event) => {
    if (event.which === 13) {
        event.preventDefault();
        $("#btn_registrar").click();
    }
});

// Llenar lista de empleados
let empleados = [];
$(document).on("click", ".btn_contratar", function () {
    let userId = $(this).data("id");
    let usuarioContratado = usuarios.find(usuario => usuario.id === userId);
    const nuevoEmpleado = {
        id: userId,
        nombre: usuarioContratado.nombre,
        carrera: usuarioContratado.carrera
    };
    empleados.push(nuevoEmpleado);
    usuarios = usuarios.filter(usuario => usuario.id !== userId);
    asignarIdsEmpleados();
    asignarIdsUsuarios();
    llenado_lista_usuarios();
    llenado_lista_empleados();
});

function llenado_lista_empleados() {
    element_lista_empleados = $("#lista_empleados tbody");
    element_lista_empleados.empty();
    empleados.forEach((empleado) => {
        const temaplate = `<tr>
        <td>${empleado.id}</td>
        <td>${empleado.nombre}</td>
        <td>${empleado.carrera}</td>
        <td><button type="button" class="btn_despedir" data-id="${empleado.id}">Despedir</button></td>
        </tr>`;
        element_lista_empleados.append(temaplate);
    });
    let cantidad_empleados = $("#cantidad_empleados");
    let cantidad = cantidad_arreglo(empleados);
    cantidad_empleados.empty();
    cantidad_empleados.append("Cantidad: "+cantidad);
}

//Despedir
$(document).on("click", ".btn_despedir", function () {
    let empleado_id = $(this).data("id");
    //busqueda empleado
    let empleado_despedido = empleados.find(empleado => empleado.id === empleado_id);
    //añadir usuario
    usuarios.push(empleado_despedido);
    //filtro empleado
    empleados = empleados.filter(empleado => empleado.id !== empleado_id);
    asignarIdsUsuarios();
    asignarIdsEmpleados();
    llenado_lista_usuarios();
    llenado_lista_empleados();


});

//eliminar ususario
$(document).on("click", ".btn_eliminar", function () {
    id_usuario = $(this).data("id");
    usuarios = usuarios.filter(usuario => usuario.id !== id_usuario);
    asignarIdsUsuarios();
    llenado_lista_usuarios();
});

//busqueda usuario}
let display = "show";

$("#btn_form_buscar").click(function () {
    if (display == "show") {
        $("#formularioBusqueda").show();
        $("#busqueda").css({
            "border": "1px solid white"
        });
        display = "none";

    } else {
        $("#formularioBusqueda").css({
            "display": "none"
        });
        $("#busqueda").css({
            "border": "none"
        });
        $("#table_ususario_encontrado").empty();
        $("#id_usuario").val("");
        display = "show";
    }
});

$("#btn_buscar").click(() => {
    let id_usuario = $("#id_usuario").val();
    usuario_encontrado = usuarios.find(usuario => usuario.id == id_usuario);
    console.table(usuario_encontrado);
    if (usuario_encontrado == undefined) {
        alert("Usuario no encontrado");
    } else {
        alert("Usuario encontrado!");
    }
    let temaplate = `<table border=1 style="margin:auto; width:60%;" >
   <thead>
       <tr>
           <th>ID</th>
           <th>Nombre</th>
           <th>Carrera</th>
       </tr>
       <tr>
           <td>${usuario_encontrado.id}</td>
           <td>${usuario_encontrado.nombre}</td>
           <td>${usuario_encontrado.carrera}</td>
       </tr>
   </thead>
   <tbody></tbody>
</table>`;
    $("#table_usuario_encontrado").empty();
    $("#table_usuario_encontrado").append(temaplate);
    $("#id_usuario").val("");
});
//Editar
let usuarioEditar;

$(document).on("click", ".btn_editar", function () {
    let userId = $(this).data("id");
    usuarioEditar = usuarios.find(usuario => usuario.id === userId);

    $("#edit_nombre").val(usuarioEditar.nombre);
    $("#edit_carrera").val(usuarioEditar.carrera);
    $("#edit_form_wrapper").show();
});

$("#btn_actualizar").click(() => {
    let nuevoNombre = $("#edit_nombre").val();
    let nuevaCarrera = $("#edit_carrera").val();
    usuarioEditar.nombre = nuevoNombre;
    usuarioEditar.carrera = nuevaCarrera;
    $("#edit_form_wrapper").hide();
    llenado_lista_usuarios();
});


$("#btn_cancelar").click(() => {
    $("#edit_form_wrapper").hide();
});

llenado_lista_usuarios();
llenado_lista_empleados();






