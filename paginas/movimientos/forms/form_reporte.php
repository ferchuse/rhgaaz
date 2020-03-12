<form class="was-validated " id="form_reporte" autocomplete="off">
	<!-- The Modal -->
	<div class="modal fade" id="modal_reporte">
		<div class="modal-dialog ">
			<div class="modal-content">
				
				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title text-center">Nuevo Reporte</h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				
				<!-- Modal body -->
				<div class="modal-body">
					
					<div class="form-group">
						<label for="nombre_conductores">Folio Orden: </label>
						<input class="form-control" id="reportes_id_ordenes" name="reportes_id_ordenes" readonly>
					</div>
					<div class="form-group">
						<label for="nombre_conductores">Fecha y Hora: </label>
						<input type="datetime-local" value="<?= date("Y-m-d\TH:i")?>" class="form-control" id="fecha_reportes" name="fecha_reportes" required>
					</div>
					<div class="form-group">
						<label for="nombre_conductores">Incidencia: </label>
						<?= generar_select($link, "cat_incidencias", "id_cat_incidencia", "incidencia", false, false, true);?>
					</div>
					<div class="form-group">
						<label for="num_eco">Descripción de los Hechos:</label>
						<textarea class="form-control" id="hechos" name="hechos"></textarea>
					</div>
					
					<div class="form-group">
						<label for="reporta">Nombre de quien reporta:</label>
						<input class="form-control" id="reporta" name="reporta" required>
					</div>
					
					
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
