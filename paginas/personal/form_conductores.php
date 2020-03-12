<?php
	
	$documentos = [
	[
	"etiqueta" => "Foto CURP",
	"name" => "curp"
	],
	[
	"etiqueta" => "Foto Licencia",
	"name" => "licencia"
	
	],
	[
	"etiqueta" => "Foto INE",
	"name" => "ine",
	
	],
	[
	"etiqueta" => "Foto Tarjetón",
	"name" => "tarjeton"
	],
	
	[
	"etiqueta" => "Foto Acta de Nacimiento",
	"name" => "acta"
	],
	
	[
	"etiqueta" => "Foto Combrobante de Domicilio",
	"name" => "comprobante"
	],
	
	[
	"etiqueta" => "Foto Croquis de Ubicación",
	"name" => "croquis"
	],
	
	[
	"etiqueta" => "Foto Contrato",
	"name" => "contrato"
	],
	
	
	
	
	];
	
	
?>

<form class="was-validated " id="form_edicion" autocomplete="off">
	<!-- The Modal -->
	<div class="modal fade" id="modal_edicion">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				
				<!-- Modal Header -->
				<div class="modal-header">
					<h4 class="modal-title text-center"></h4>
					<button type="button" class="close" data-dismiss="modal">&times;</button>
				</div>
				
				<!-- Modal body -->
				<div class="modal-body">
					<input type="text" hidden class="form-control" id="id_conductores" name="id_conductores">
					
					
					
					<div class="row">
						<div class="col-6">
							<div class="form-group">
								<label for="curp_conductores">CURP</label>
								<input type="text" class="form-control" id="curp_conductores" name="curp_conductores" placeholder="CURP del conductor" required>
							</div> 
							<div class="form-group">
								<label for="nombre_conductores">NOMBRE CONDUCTOR</label>
								<input type="text" class="form-control" id="nombre_conductores" name="nombre_conductores" placeholder="Nombre del conductor" required>
							</div>
						</div> 
						<div class="col-6">
							<div class="form-group">
								<label for="noLicencia_conductores">NUM LICENCIA</label>
								<input type="text" class="form-control" id="noLicencia_conductores" name="noLicencia_conductores" placeholder="Licencia">
							</div>
							<div class="form-group">
								<label for="fechaVigencia_conductores">FECHA DE VIGENCIA</label>
								<input type="date" class="form-control" id="fechaVigencia_conductores" name="fechaVigencia_conductores">
							</div> 
						<div class="form-group">
						<label for="noLicencia_conductores">TIPO LICENCIA</label>
						<input type="text" class="form-control" id="tipo_licencia" name="tipo_licencia" >
							</div>
						</div> 
						
					</div> 
					
					
					<table class="table table-bordered" id="tabla_registros" width="100%" cellspacing="0">
						<thead>
							<tr>
								<th class="text-center">Documento</th>
								<th class="text-center">Vista previa</th>
								<th class="text-center">Revisado</th>
							</tr>
						</thead>
						<tbody >
							<?php
								
								
								
								foreach($documentos as $documento){?>
								
								<tr>
									<td><?= $documento["etiqueta"];?></td>
									<td>
										<div class="form-group">
											<span class="btn btn-success fileinput-button">
												<i class="fas fa-upload"></i> 
												<input class="fileupload" type="file" accept="image/*" name="files[]" data-url="../../plugins/fileupload/server_upload.php" >
											</span>
											
											<div class="progress " >
												<div class="progress-bar progress-bar-striped active" >
												</div>
											</div>	
											
											<img  class="foto_thumb w-50" >
											
											<input class="url" id="foto_<?= $documento["name"];?>" name="foto_<?= $documento["name"];?>" type="hidden"  >
										</div>
										
										
									</td>
									<td>
										<label class="custom_checkbox">
											Revisado
											<input id="check_<?= $documento["name"];?>" name="check_<?= $documento["name"];?>"  type="checkbox" class="revisado">
											<span class="checkmark"></span>
										</label>
									</td>
									
								</tr>
								
								<?php 	
								}
							?>
						</tbody>
						<tfoot>
							
						</tfoot>
					</table>
					
					
					
					<div class="row">
						<div class="col-6">
							<div class="form-group">
								<label for="id_empresas">EMPRESA</label>
								<?php echo generar_select($link, "empresas", "id_empresas", "nombre_empresas"); ?>
							</div> 
						</div> 
						<div class="col-6">
							<div class="form-group">
								<label for="estatus_conductores">Estatus</label>
								<input readonly type="text" class="form-control" id="estatus_conductores" name="estatus_conductores" value="Pendiente de Aprobación">
							</div> 
							
						</div>
					</div>
					<!-- Modal footer -->
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-danger" data-dismiss="modal"><i class="fa fa-times"></i> Cancelar</button>
						<button type="submit" class="btn btn-outline-success"><i class="fa fa-save"></i> Guardar</button>
					</div>
					
				</div>
			</div>
		</div>
	</form>
