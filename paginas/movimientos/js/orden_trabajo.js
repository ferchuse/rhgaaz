$(document).ready(onLoad);


function onLoad(){
	
	listarRegistros();
	
	$(".nuevo").on('click',function(){
		console.log("Nuevo")
		$("#form_edicion")[0].reset();
		$(".modal-title").text("Nueva Orden de Trabajo");
		$("#modal_edicion").modal("show");
		
	});
	
	$("#form_filtros").on("submit", filtrarRegistros);
		$('#form_edicion').on('submit', guardarRegistro);
	
}
function filtrarRegistros(evt){
	console.log("filtrarRegistros()")
	evt.preventDefault();
	
	listarRegistros();
	
}


function listarRegistros(){
	console.log("listarRegistros()")
	
	let boton = $("#form_filtros").find(":submit");
	let icono = boton.find(".fas");
	
	boton.prop("disabled", true);
	icono.toggleClass("fa-search fa-spinner fa-spin");
	
	$.ajax({
		url: 'consultas/listar_ordenes.php',
		data: $("#form_filtros").serialize()
		}).done(function(respuesta){
		$("#lista_registros").html(respuesta)
		
		}).always(function(){
		
		boton.prop("disabled", false);
		icono.toggleClass("fa-search fa-spinner fa-spin");
	});
}


function guardarRegistro(event){
	console.log("guardarRegistro()");
	event.preventDefault();
	let form = $(this);
	let boton = form.find(':submit');
	let icono = boton.find('.fa');
	let datos = form.serialize();
	
	
	boton.prop('disabled',true);
	icono.toggleClass('fa-save fa-spinner fa-pulse ');
	
	$.ajax({
		url: 'consultas/guardar_orden.php',
		method: 'POST',
		dataType: 'JSON',
		data: datos
		}).done(function(respuesta){
		if(respuesta.estatus == 'success'){
			
			alertify.success('Se ha guardado correctamente');
			$('#modal_edicion').modal('hide');
			
			listarRegistros();
		}
		else{
			alertify.error('Ocurrio un error');
		}
		}).always(function(){
		boton.prop('disabled',false);
		icono.toggleClass('fa-save fa-spinner fa-pulse');
	});
}
