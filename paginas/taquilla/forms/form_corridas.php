<form class="was-validated " id="form_edicion" autocomplete="off" data-tabla="precios_boletos">
	<!-- The Modal -->
	<div class="modal fade" id="modal_edicion">
		<div class="modal-dialog modal-dialog-centered modal-lg">
			<div class="modal-content">
				
				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title text-center"></h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				
				<!-- Modal body --> 
				<div class="modal-body">
					<div class="form-row">
						<div class="form-group col-6">
							<label for="fecha_abonogeneral">Taquilla:</label>
							
							<?php echo generar_select($link, "taquillas", "id_taquilla", "nombre_taquilla", false, false, true, $_SESSION["id_recaudaciones"])?>
						</div>
						
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="fecha_abonogeneral">Fecha de Salida:</label>
							<input type="date" class="form-control" value="<?php echo date("Y-m-d");?>" id="fecha_corridas" name="fecha_corridas" required>
						</div>
						<div class="form-group col-md-6">
							<label for="fecha_abonogeneral">Hora de Salida:</label>
								<input type="time" class="form-control" value="<?php echo date("H:i:s");?>" id="hora_corridas" name="hora_corridas" required>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="fecha_abonogeneral">Origen:</label>
							<?php echo generar_select($link, "origenes", "id_origenes", "nombre_origenes", false, false, true)?>
						</div>
						<div class="form-group col-md-6">
							<label for="fecha_abonogeneral">Destino:</label>
							<?php echo generar_select($link, "origenes", "id_origenes", "nombre_origenes", false, false, true, 0 , 0 , "id_destinos")?>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="fecha_abonogeneral">Num Eco:</label>
							<input type="number" class="form-control"  id="num_eco" name="num_eco" required>
						</div>
					</div>
					
					<hr>
					
				
					
				</div>
				<!-- Modal footer -->
				<div class="modal-footer">
					<button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-times"></i> Cancelar</button>
					<button type="submit" class="btn btn-success"><i class="fa fa-save"></i> Guardar</button>
				</div>
				
			</div>
		</div>
	</div>
</form>												