
$('.fileupload').fileupload({
	dataType: 'json',
	done: function (e, data) {
		
		$form_group = $(this).closest(".form-group");
		
		$.each(data.result.files, function (index, file) {
			$form_group.find(".url").val(file.url);
			// $form_group.find(".url").val("/rhgaaz/fileupload/files/"+file.name);
			
			$form_group.find("img").attr("src", file.thumbnailUrl);
			
		});
	},
	progressall: function (e, data) {
		$form_group = $(this).closest(".form-group");
		
		var progress = parseInt(data.loaded / data.total * 100, 10);
		$form_group.find(".progress-bar").css("width" , progress +"%");
		$form_group.find(".progress-bar").html(progress +"%");
	}
});



function buscarCURP(){
	
	
	$('#curp_conductores').addClass("cargando");
	var curp_conductores = $(this).val();
	
	
	$.ajax({
		url: '../../funciones/fila_select.php',
		method: 'GET',
		data: {
			tabla: "conductores",
			id_campo: "curp_conductores",
			id_valor: curp_conductores
			
		}
		}).done(function(respuesta){
		
		if(respuesta.count_rows > 0){
			if($("#action").val() == "editar")
			alertify.warning("El CURP ya existe")
			$.each(respuesta.data, function(name , value){
				$("#form_edicion").find("#"+ name).val(value);
				
			});
		}
		
		}).always(function(){
		$('#curp_conductores').removeClass("cargando");
		
	});
}
function checkDocumentos(){
	
	if($('#form_edicion .revisado:checked').length == $('#form_edicion .revisado').length){
		$("#estatus_conductores").val("Activo");
	}
	else{
		$("#estatus_conductores").val("Pendiente");
	}
}

$(document).ready(function(){
	
	
	listarRegistros();
	
	$('#curp_conductores').blur( buscarCURP);
	$('#form_edicion .revisado').change( checkDocumentos);
	
	$('.nuevo').on('click',function(){
		$('#form_edicion')[0].reset();
		$('.modal-title').text('Nuevo Conductor');
		$('#modal_edicion').modal({ backdrop: 'static'}).modal('show').on('shown.bs.modal', function () {
			$('#form_edicion input:eq(1)').trigger("focus");
		});
	});
	
	//==========GUARDAR NUEVA EMPRESA============
	$('#form_edicion').on('submit',function(event){
		event.preventDefault();
		let form = $(this);
		let boton = form.find(':submit');
		let icono = boton.find('.fa');
		let datos = form.serializeArray();
		
		boton.prop('disabled',true);
		icono.toggleClass('fa-save fa-spinner fa-pulse ');
		
		$.ajax({
			url: '../../funciones/guardar.php',
			method: 'POST',
			dataType: 'JSON',
			data:{
				tabla: 'conductores',
				datos: datos
			}
			}).done(function(respuesta){
			if(respuesta.estatus == 'success'){
				alertify.success('Se ha agregado correctamente');
				$('#modal_edicion').modal('hide');
				listarRegistros();
				}else{
				alertify.error('Ocurrio un error');
			}
			}).always(function(){
			boton.prop('disabled',false);
			icono.toggleClass('fa-save fa-spinner fa-pulse fa-fw');
		});
	})
	
	//=========BUSCAR EMPRESA=========
	$("#numero_conductor").keyup(function filtro_buscar(){
		var indice = $(this).data("indice");
		var valor_filtro = $(this).val();
		var num_rows = buscar(valor_filtro,'tabla_conductores',indice);
		if(num_rows == 0){
			$('#mensaje').html("<div class='alert alert-dark text-center' role='alert'><strong>No se ha encontrado.</strong></div>");
			}else{
			$('#mensaje').html('');
		}
	});
	//=========BUSCAR EMPRESA=========
	$("#nombre_conductor").keyup(function filtro_buscar(){
		var indice = $(this).data("indice");
		var valor_filtro = $(this).val();
		var num_rows = buscar(valor_filtro,'tabla_conductores',indice);
		if(num_rows == 0){
			$('#mensaje').html("<div class='alert alert-dark text-center' role='alert'><strong>No se ha encontrado.</strong></div>");
			}else{
			$('#mensaje').html('');
		}
	});
	
	
	
	
});





function listarRegistros(){
	let subconsulta = 'LEFT JOIN empresas USING(id_empresas)';
	
	return $.ajax({
		url: '../../funciones/listar.php',
		method: 'POST',
		dataType: 'JSON',
		data: {
			tabla: 'conductores',
			subconsulta: subconsulta
		}
    }).done(function(respuesta){
		if(respuesta.estatus == 'success'){
			let conductores = '';
			if(respuesta.num_rows > 0){
				$.each(respuesta.mensaje,function(index,element){
					conductores += `
					<tr>
					<td hidden class="text-center ">${element.id_conductores}</td>
					<td class="text-center">${element.nombre_conductores}</td>
					<td class="text-center">${element.curp_conductores}</td>
					<td class="text-center">${element.fechaVigencia_conductores}</td>
					<td class="text-center">${element.estatus_conductores}</td>
					<td class="text-center">${element.nombre_empresas}</td>
					<td class="text-center">
					<button class="btn btn-outline-danger eliminar" data-id_conductores='${element.id_conductores}'><i class="fas fa-trash-alt"></i></button>
					<button class="btn btn-outline-warning editar" data-id_conductores='${element.id_conductores}'><i class="fas fa-pencil-alt"></i></button>
					</td>
					</tr>
					`;
				});
				}else{
				conductores = `
				<tr>
				<td colspan="8"><h3 class="text-center">No hay Conductores</h3></td>
				</tr>
				`;
			}
			$('#containerLista').html(conductores);
			
			
			// $('#tabla_conductores').dataTable();
			
			
			
			dame_permiso();
			//=========ELIMINAR=========
			$('.eliminar').click(function(){
				let boton = $(this);
				let id_conductores = boton.data('id_conductores');
				var fila = boton.closest('tr');
				
				alertify.confirm('Confirmacion', '¿Deseas eliminarlo?', eliminar , function(){
				});
				
				function eliminar(){
					$.ajax({
						url: 'control/eliminar.php',
						method: 'POST',
						dataType: 'JSON',
						data: {
							tabla: 'conductores',
							id_campo: 'id_conductores',
							campo: id_conductores
						}
						}).done(function(respuesta){
						if(respuesta.estatus == 'success'){
							alertify.success('Se ha eliminado correctamente');
							fila.fadeOut(1000);
							}else{
							alertify.error('Ocurrio un error');
						}
					});
				}
				
			});
			
			/*=======LISTAR EMPRESAS=========*/
			$('.editar').click(function(){
				var boton = $(this);
				var icono = boton.find('.fas');
				var id_conductores = boton.data('id_conductores');
				boton.prop('disabled',true);
				icono.toggleClass('fas fa-pencil-alt fa fa-spinner fa-pulse fa-fw');
				
				$.ajax({
					url: '../../funciones/listar.php',
					method: 'POST',
					dataType: 'JSON',
					data: {
						tabla: 'conductores',
						id_campo: 'id_conductores',
						campo: id_conductores
					}
					}).done(function(respuesta){
					if(respuesta.estatus == 'success'){
						$.each(respuesta.mensaje[0],function(key,value){
							$('#'+key).val(value);
							
							var $fotos = ["foto_curp", "foto_licencia", "foto_ine", "foto_tarjeton", "foto_acta" , "foto_comprobante", "foto_croquis", "foto_contrato"];
							
							if($fotos.indexOf(key) > -1){
								console.log("es foto");								
								$('#'+key).closest(".form-group").find("img").attr("src", value);
								
							}
							
							
						});
						$('.modal-title').text('Editar Conductor');
						$('#modal_edicion').modal('show');
						}else{
						console.log(respuesta.mensaje);
					}
					}).always(function(){
					boton.prop('disabled',false);
					icono.toggleClass('fas fa-pencil-alt fa fa-spinner fa-pulse fa-fw');
				});
			});
			
			
			}else{
			//console.log(respuesta.mensaje);
		}
	});
}

