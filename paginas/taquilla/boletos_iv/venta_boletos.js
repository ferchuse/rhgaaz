

var printService = new WebSocketPrinter();

var  $select_boletos = "";

$(document).ready(onLoad);


function onLoad(){
	
	listarCorridas();
	$("#form_corridas input[name='num_eco']").on("blur", buscarNumEco);

	
	
	$("#id_taquilla").on("change", eligeHoraSalida);
	$("#form_filtros").on("submit", filtrarRegistros);
	
	$("#btn_test").on("click", imprimirPrueba);
	
	$("#btn_pagar").on("click", quienRecibe);
	
	
	
	$("#lista_asientos").on("change", ".asiento", selectAsiento);
	
	$("#lista_boletos").on("click", ".cancelar", confirmaCancelacion);
	
	$("#lista_boletos").on("click", ".imprimir", function(){
		imprimirESCPOS($(this).data("id_registro"))
		
	});
	
	$("#lista_corridas").on("click", ".cambiar_unidad", editarRegistro);
	$("#lista_corridas").on("click", ".cancelar", confirmaCancelarCorrida);
	
	$("#lista_corridas").on("click", ".imprimir", function(){
		imprimirGuia($(this).data("id_registro"));
	});
	
	$("#lista_corridas").on("change", ".select", sumarCorridas);
	
	$("#lista_corridas").on("change", "#check_todos", selectTodos);
	
	$(".nuevo").on('click',function(){
		console.log("Nuevo")
		$("#form_corridas")[0].reset();
		$(".modal-title").text("Nueva Corrida");
		$("#modal_corridas").modal("show");
		
	});
	
	$('#form_corridas').on('submit', guardarCorrida);
	$('#lista_corridas').on('click', ".btn_venta", abrirTaquilla);
	
	
	$(".tipo_boleto").change(eligeBoleto );
	$(".cantidad").change(calculaImporte );
	
	
	// Mostrar ASientos 
	$.ajax({
		"url" : "control/precios_boletos_json.php",
		"dataType" : "JSON"
		
		
		}).done(function (respuesta){
		$select_boletos+= `<select class="tipo_boleto form-control" name="id_precio[]" required >`;
		$select_boletos+= `<option value="" >Elige...</option>`;
		
		$.each(respuesta.precios_boletos, function(index, item){
			$select_boletos+=`<option data-precio="${item.precio} " value="${item.id_precio}"> 
			${item.nombre_origenes}-${item.nombre_destinos} 
			${item.tipo_precio}-$ ${item.precio} 
			
			</option>`
		});
		
		$select_boletos+= `</select>`;
		
		console.log("select_boletos", $select_boletos)
		
		
	});
	
	desactivaAsientosOcupados();
	
	
	$("#form_boletos").submit(guardarBoletos);
	
	
	
}






function buscarNumEco() {
	console.log("buscarNumEco")
	var num_eco = $(this).val();
	
	$.ajax({
		url: "../../funciones/fila_select.php",
		dataType: "JSON",
		data: {
			tabla: "unidades",
			id_campo: "num_eco",
			id_valor: num_eco
			
		}
		
		}).done(function (respuesta) {
		console.log("respuesta", respuesta);
		if (respuesta.encontrado == 1) {
			$("#form_corridas input[name='asientos']").val(respuesta.data.asientos) 
			
			
		}
		}).fail(function (xht, error, errnum) {
		
		alertify.error("Error", errnum);
		}).always(function () {
		
		
	});
	
	
}



function editarRegistro() {
	console.log("editarRegistro")
	let boton = $(this);
	let icono = boton.find(".fas");
	let id_registro = boton.data("id_registro");
	
	boton.prop("disabled", true);
	icono.toggleClass("fa-exchange-alt fa-spinner fa-spin");
	
	$.ajax({
		url: "../../funciones/fila_select.php",
		
		dataType: "JSON",
		data: {
			tabla: "corridas",
			id_campo: "id_corridas",
			id_valor: id_registro
			
		}
		
		}).done(function (respuesta) {
		console.log("respuesta", respuesta);
		if (respuesta.encontrado == 1) {
			$.each(respuesta.data, function (name, value) {
				$("#form_corridas input[name=" + name+ "]").val(value);
				$("#form_corridas select[name=" + name+ "]").val(value);
			});
			
			$("#modal_corridas").modal("show");
			
		}
		}).fail(function (xht, error, errnum) {
		
		alertify.error("Error", errnum);
		}).always(function () {
		boton.prop("disabled", false);
		icono.toggleClass("fa-exchange-alt fa-spinner fa-spin");
		
	});
	
	
}
function eligeHoraSalida(evt){
	
	console.log("eligeHoraSalida()", evt);
	
	$("#hora_corridas").val($("#id_taquilla option:selected").data("hora_salida"));
	
}


function selectAsiento(evt){
	
	console.log("selectAsiento()", evt);
	
	if($(this).prop("checked"))
	{
		$("#form_boletos :submit").prop("disabled", false)
		// $("#num_asiento").val(evt.target.id)
		agregarBoleto(evt.target.id);
		
		// $("#modal_boleto").modal("show")
	}
	else
	{
		quitarBoleto(evt.target.id);
	}
	
}

function desactivaAsientosOcupados(){
	console.log(" desactivaAsientosOcupados()")
	
	$.ajax({
		url: "control/asientos_ocupados.php" ,
		dataType: "JSON" ,
		data:{
			id_corridas : $("#id_corridas").val()
		}
		}).done(function (respuesta){
		
		$.each(respuesta.asientos_ocupados, function(index, num_asiento){
			$("#"+ num_asiento).prop("disabled", true);
		})
		}).always(function(){
		
		// boton.prop("disabled", false);
		// icono.toggleClass("fa-print fa-spinner fa-spin");
		
	});
}

function guardarBoletos(event){
	event.preventDefault();
	let form = $(this);
	let boton = form.find(':submit');
	let icono = boton.find('.fa');
	let datos = form.serialize();
	
	datos+="&id_usuarios="+ $("#id_usuarios").val();
	
	boton.prop('disabled',true);
	icono.toggleClass('fa-save fa-spinner fa-pulse ');
	$.ajax({
		url: 'control/guardar_boletos.php',
		method: 'POST',
		dataType: 'JSON',
		data: datos
		}).done(function(respuesta){
		if(respuesta.result == 'success'){
			
			alertify.success('Se ha guardado correctamente');
			desactivaAsientosOcupados();
			$("#nueva_venta").click();
			
			listaBoletos();
			imprimirTicket(respuesta.boletos);
		}
		else{
			alertify.error(respuesta.mensaje);
		}
		}).always(function(){
		boton.prop('disabled',false);
		icono.toggleClass('fa-save fa-spinner fa-pulse ');
	});
}


function quitarBoleto(num_asiento){
	console.log("quitarBoleto", num_asiento);
	
	$("input[value='"+num_asiento+"']").closest("tr").remove();
	sumarImportes();
	
	if($("#resumen_boletos tr" ).length == 0){
		$("#form_boletos :submit").prop("disabled", true)
		
	}
}

function apartaBoletos(){
	console.log("apartaBoletos");
	
	$("input[type=checkbox]:checked").prop("disabled", true);
}


function agregarBoleto(num_asiento){
	
	console.log("num_asiento", num_asiento);
	console.log("select_boletos", $select_boletos);
	
	var boleto_html = 
	`<tr>
	<td class="w-10"><input class="form-control num_asiento" type="number" readonly name="num_asiento[]"  
	value='${num_asiento}'>
	</td>
	<td>
	${$select_boletos}
	</td>
	<td class="w-25">
	<input name="nombre_pasajero[]" required class="form-control nombre_pasajero" >
	</td>
	<td class="w-25">
	<input name="curp[]" required class="form-control curp" >
	</td>
	<td><input name="precio[]" class="precio form-control" readonly></td>
	<td>
	<button class="btn btn-danger quitar_boleto" type="button">
	<i class="fas fa-times"></i>
	</button>
	</td>
	
	</tr>`;
	$("#resumen_boletos").append(boleto_html);
	
	$(".quitar_boleto").click(function( evt){
		num_asiento = $(this).closest("tr").find(".num_asiento").val();
		$("#"+num_asiento).prop("checked", false);
		quitarBoleto(num_asiento);
	});
	$(".nombre_pasajero").keyup(function( evt){
		$(".nombre_pasajero").val($(this).val())
	});
	
	$(".tipo_boleto").change(function( evt){
		console.log("cambiar_tipo_boleto", evt)
		
		$(this).closest("tr").find(".precio").val($(this).find(":selected").data("precio"));
		
		sumarImportes();
	});
	
	sumarImportes();
}

function sumarImportes(){
	console.log("sumarImportes()")
	var importe_total = 0;
	$(".precio").each(function (index, item ){
		
		importe_total+= Number($(item).val());
	});
	
	$("#importe_total").val(importe_total)
	
}

function selectTodos(evt){
	console.log("selectTodos()")
	$("#lista_corridas .select").prop("checked", $(this).prop("checked"));
	sumarCorridas();
}

function filtrarRegistros(evt){
	console.log("filtrarRegistros()")
	evt.preventDefault();
	
	listarCorridas();
	
}

function quienRecibe(evt){
	console.log("quienRecibe()")
	
	
	alertify.prompt()
	.setting({
		'reverseButtons': true,
		'labels' :{ok:"Aceptar", cancel:'Cancelar'},
		'title': "Quien Recibe" ,
		'message': "¿Quien Recibe el Pago?" ,
		'onok': guardarPago
	}).show();
	
	
	
}


function confirmaCancelarCorrida(event){
	console.log("confirmaCancelacion()");
	let boton = $(this);
	let icono = boton.find(".fas");
	var id_registro = $(this).data("id_registro");
	var fila = boton.closest('tr');
	
	alertify.prompt()
	.setting({
		'reverseButtons': true,
		'labels' :{ok:"SI", cancel:'NO'},
		'title': "Cancelar Guia" ,
		'message': "Motivo de Cancelación" ,
		'onok':cancelarCorrida,
		'oncancel': function(){
			boton.prop('disabled', false);
			
		}
	}).show();
	
	
	function cancelarCorrida(evt, motivo){
		if(motivo == ''){
			console.log("Escribe un motivo");
			alertify.error("Escribe un motivo");
			return false;
			
		}
		
		boton.prop("disabled", true);
		icono.toggleClass("fa-times fa-spinner fa-spin");
		
		
		return $.ajax({
			url: "boletos_iv/cancelar_corrida.php",
			method:"POST",
			dataType:"JSON",
			data:{
				id_registro : id_registro,
				nombre_usuarios : $("#sesion_nombre_usuarios").text(),
				motivo : motivo
			}
			}).done(function (respuesta){
			if(respuesta.result == "success"){
				alertify.success("Cancelado");
				listarCorridas();
			}
			else{
				alertify.error(respuesta.result);
				
			}
			
			}).always(function(){
			boton.prop("disabled", false);
			icono.toggleClass("fa-times fa-spinner fa-spin");
			
		});
	}
}

function confirmaCancelacion(event){
	console.log("confirmaCancelacion()");
	let boton = $(this);
	let icono = boton.find(".fas");
	var id_registro = $(this).data("id_registro");
	var fila = boton.closest('tr');
	
	alertify.prompt()
	.setting({
		'reverseButtons': true,
		'labels' :{ok:"SI", cancel:'NO'},
		'title': "Cancelar Boleto" ,
		'message': "Motivo de Cancelación" ,
		'onok':cancelarBoleto,
		'oncancel': function(){
			boton.prop('disabled', false);
			
		}
	}).show();
	
	
	function cancelarBoleto(evt, motivo){
		if(motivo == ''){
			console.log("Escribe un motivo");
			alertify.error("Escribe un motivo");
			return false;
			
		}
		
		boton.prop("disabled", true);
		icono.toggleClass("fa-times fa-spinner fa-spin");
		
		
		return $.ajax({
			url: "boletos_iv/cancelar_boleto.php",
			method:"POST",
			dataType:"JSON",
			data:{
				id_registro : id_registro,
				nombre_usuarios : $("#sesion_nombre_usuarios").text(),
				motivo : motivo
			}
			}).done(function (respuesta){
			if(respuesta.result == "success"){
				alertify.success("Cancelado");
				listaBoletos();
			}
			else{
				alertify.error(respuesta.result);
				
			}
			
			}).always(function(){
			boton.prop("disabled", false);
			icono.toggleClass("fa-times fa-spinner fa-spin");
			
		});
	}
}


function eligeBoleto(evt){
	console.log("eligeBoleto()")
	let $fila = $(this).closest(".row");
	let precio = $(this).find(":selected").data("precio");
	
	$fila.find(".precio").val(precio);
	
	calculaImporte(evt);
}

function calculaImporte(evnt){
	console.log("calculaImporte()", $(evnt.target));
	let $fila = $(evnt.target).closest(".row");
	let cantidad = Number($fila.find(".cantidad").val());
	let precio = Number($fila.find(".precio").val());
	let importe = cantidad * precio; 
	
	$fila.find(".importe").val(importe); 
	
}

function sumarCorridas(){
	console.log("sumarCorridas()");
	let total_pago = 0
	
	$(".select:checked").each(function(i, item){
		total_pago+= $(this).data("importe_corridas");
	})
	
	$("#total_pago").val(total_pago);
	
	$("#span_num_selected").text(total_pago);
	// $("#span_num_selected").text($(".select:checked").length);
	
	if($(".select:checked").length > 0 ){
		
		$("#btn_pagar").prop("disabled", false)
	}
	else{
		$("#btn_pagar").prop("disabled", true)
	}
	
}


function renderAsientos(){
	
	let html_asientos =  ``; 
	let $asientos = $("#asientos").val(); 
	
	let $filas_asientos = Math.ceil($asientos /4);
	
	$num_asiento = 1;
	
	for($i = 1; $i <= $filas_asientos; $i++){
		html_asientos+=`
		<li class="fila_asientos">
		<ol class="seats" type="1">`;
		
		
		for($j = 1; $j<= 4; $j++){ 
			html_asientos+=`
			<li class="seat">
			<input class='asiento' type="checkbox" id="${$num_asiento}" />
			<label for="${$num_asiento}" >
			${$num_asiento} 
			</label>
			</li>`;
			
			$num_asiento++;
			if($num_asiento > $asientos){break;}
		}
		html_asientos+=`
		</ol>
		</li>`;
		
	}
	
	$("#lista_asientos").html(html_asientos);
	
	
	desactivaAsientosOcupados();
}


function finalizarCorrida(){
	console.log("finalizarCorrida()");
	$("#imprimir_guia").prop("disabled", true);
	
	$.ajax({
		"url": "boletos_iv/finalizar_corrida.php",
		"method": "post",
		"data": {
			"id_corridas": $("#id_corridas").val(),
			"boletos_vendidos": $("#boletos_vendidos").val(),
			"total_guia": $("#total_guia").val()
		}
		}).done(function(){
		
		listarCorridas();
		//ir a tab corridas
		
		$("#pill_corridas").tab("show");
		
		imprimirGuia($("#id_corridas").val())
		
		}).fail(function(){
		
		
		}).always(function(){
		$("#imprimir_guia").prop("disabled", false);
		
	});
}

function imprimirGuia(id_corridas){
	console.log("imprimirGuia()", id_corridas);
	
	$.ajax({
		"url": "boletos_iv/imprimir_guias_escpos.php",
		"data": {
			"id_corridas": id_corridas
		}
		}).done(function(respuesta){
		printService.submit({
			'type': 'LABEL',
			'raw_content': respuesta
		});
		
	});
	
	
}



function abrirTaquilla(event){
	console.log("abrirTaquilla()");
	
	$("#id_corridas").val($(this).data("id_corridas"));
	$("#num_eco").val($(this).data("num_eco"));
	$("#asientos").val($(this).data("asientos"));
	
	$("#pill_venta").tab("show");
	listaBoletos();
	renderAsientos();
}
function guardarCorrida(event){
	console.log("guardarCorrida()");
	event.preventDefault();
	let form = $(this);
	let boton = form.find(':submit');
	let icono = boton.find('.fa');
	let datos = form.serialize();
	
	datos+="&id_usuarios="+ $("#id_usuarios").val();
	
	boton.prop('disabled',true);
	icono.toggleClass('fa-save fa-spinner fa-pulse ');
	$.ajax({
		url: 'boletos_iv/guardar_corridas.php',
		method: 'POST',
		dataType: 'JSON',
		data: datos
		}).done(function(respuesta){
		if(respuesta.estatus == 'success'){
			
			alertify.success('Se ha guardado correctamente');
			$('#modal_corridas').modal('hide');
			
			listarCorridas();
		}
		else{
			alertify.error('Ocurrio un error');
		}
		}).always(function(){
		boton.prop('disabled',false);
		icono.toggleClass('fa-save fa-spinner fa-pulse');
	});
}



function listaBoletos(){
	console.log("listaBoletos");
	$.ajax({
		"url" : "control/lista_boletos.php",
		"data" :{"id_corridas": $("#id_corridas").val()}
		
		}).done(function (respuesta){
		$("#lista_boletos").html(respuesta);
		
		$("#imprimir_guia").on("click", finalizarCorrida);
		$(".imprimir").click(function(){
			
			imprimirTicket([$(this).data("id_registro")]);
			
		});
	});
	
}

function listarCorridas(){
	console.log("listarCorridas()")
	
	let boton = $("#form_filtros").find(":submit");
	let icono = boton.find(".fas");
	
	boton.prop("disabled", true);
	icono.toggleClass("fa-search fa-spinner fa-spin");
	
	$.ajax({
		url: 'boletos_iv/lista_corridas.php',
		data: $("#form_filtros").serialize()
		}).done(function(respuesta){
		$("#lista_corridas").html(respuesta)
		
		}).always(function(){
		
		boton.prop("disabled", false);
		icono.toggleClass("fa-search fa-spinner fa-spin");
	});
}


$("#nueva_venta").click( nueva_venta);

function nueva_venta(){
	$("#resumen_boletos").html("");
	$("#importe_total").val(0);
	$(":checked").prop("checked", false);
	// $("#form_boletos")[0].reset();
	
}


function guardarPago(evt, recibe){
	console.log("guardarPago()", recibe)
	
	let boton = $(this);
	let icono = boton.find('.fas');
	
	
	boton.prop('disabled',true);
	icono.toggleClass('fa-dollar fa-spinner fa-pulse ');
	
	
	
	$.ajax({
		url: 'boletos_iv/guardar_pago.php',
		method: 'POST',
		dataType: 'JSON',
		data: $("#form_pagar_corridas").serialize() + "&recibe=" + recibe
		}).done(function(respuesta){
		if(respuesta.estatus_insert == 'success'){
			
			alertify.success('Se ha guardado correctamente');
			
			imprimirPago(respuesta.id_pagos);
			
			listarCorridas();
		}
		else{
			alertify.error(respuesta.mensaje);
		}
		}).always(function(){
		boton.prop('disabled',false);
		icono.toggleClass('fa-save fa-spinner fa-pulse ');
	});
}



function imprimirTicket(boletos){
	console.log("imprimirTicket()");
	var id_registro = $(this).data("id_registro");
	// var url = $(this).data("url");
	var boton = $(this); 
	var icono = boton.find("fas");
	
	boton.prop("disabled", true);
	icono.toggleClass("fa-print fa-spinner fa-spin");
	
	$.ajax({
		url: "impresion/imprimir_boletos_catemaco.php" ,
		data:{
			boletos : boletos
		}
		}).done(function (respuesta){
		
		$("#ticket").html(respuesta); 
		printService.submit({
			'type': 'LABEL',
			'raw_content': respuesta
		});
		}).always(function(){
		
		boton.prop("disabled", false);
		icono.toggleClass("fa-print fa-spinner fa-spin");
		
	});
}




function imprimirPrueba(){
	console.log("imprimirPago()");
	
	// var url = $(this).data("url");
	var boton = $(this); 
	var icono = boton.find("fas");
	
	boton.prop("disabled", true);
	icono.toggleClass("fa-print fa-spinner fa-spin");
	
	$.ajax({
		url: "boletos_iv/imprimir_prueba.php" ,
		
		}).done(function (respuesta){
		
		// $("#ticket").html(respuesta); 
		
		
		printService.submit({
			'type': 'LABEL',
			'raw_content': respuesta
		});
		}).always(function(){
		
		boton.prop("disabled", false);
		icono.toggleClass("fa-print fa-spinner fa-spin");
		
	});
}

function imprimirPago(id_pagos){
	console.log("imprimirPago()");
	var id_registro = $(this).data("id_registro");
	// var url = $(this).data("url");
	var boton = $(this); 
	var icono = boton.find("fas");
	
	boton.prop("disabled", true);
	icono.toggleClass("fa-print fa-spinner fa-spin");
	
	$.ajax({
		url: "boletos_iv/imprimir_pago.php" ,
		data:{
			id_pagos : id_pagos
		}
		}).done(function (respuesta){
		
		// $("#ticket").html(respuesta); 
		
		
		printService.submit({
			'type': 'LABEL',
			'raw_content': respuesta
		});
		}).always(function(){
		
		boton.prop("disabled", false);
		icono.toggleClass("fa-print fa-spinner fa-spin");
		
	});
}




