<?php
	include("../../paginas/login/login_check.php");
	include('../../conexi.php');
	include('../../funciones/generar_select.php');
	
	$link = Conectarse();
	$nombre_pagina = "Venta de Boletos";
	//include('control/select_general.php');
	//include('../../funciones/generar_select.php');
	
	//$dt_fecha_inicial = new DateTime("first day of this month");
	$dt_fecha_final = new DateTime("last day of this month");
	
	//$date_inicial = $dt_fecha_inicial->format("Y-m-d");
	$date_final = $dt_fecha_final->format("Y-m-d");
	
?>
<!DOCTYPE html>
<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<meta name="description" content="">
		<meta name="author" content="">
		<title>Venta de Boletos </title>
		<?php include('../../styles.php')?>
			<link href="../../css/corrida.less" type="text/css"  rel="stylesheet/less" >
	</head>
	<body id="page-top">
		<?php include("../../navbar.php")?>
		<div id="wrapper" class="">
			<?php include("../../menu.php")?>	
			<div id="content-wrapper">		
				<div class="container-fluid">		
					<!-- Breadcrumbs-->
					<ol class="breadcrumb d-print-none">
						<li class="breadcrumb-item">
							<a href="#">Taquilla</a>
						</li>
						<li class="breadcrumb-item active"><?php echo $nombre_pagina;?></li>
					</ol>
					
					<div class="card card-primary">
						<div class="card-body">
							
							<ul class="nav nav-pills nav-justified mb-4 d-print-none">
								<li class="nav-item">
									<a class="nav-link active" id="pill_corridas" data-toggle="pill" href="#tab_corridas">Corridas</a>
								</li>
								<li class="nav-item disabled">
									<a class="nav-link " id="pill_venta" data-toggle="pill" href="#tab_boletos">Venta de Boletos</a>
								</li>
								
							</ul>
							
							<div class="tab-content">
								
								
								<div class="tab-pane   active" id="tab_corridas">	
									<div class="row ">
										<div class="col-12">
											<button type="button" class="btn btn-success mb-2 nuevo  d-print-none">
												<i class="fas fa-plus"></i> Nueva
											</button>
											<form id="form_filtros" class="form-inline">
												<div class="form-group">
													<label>
														Empresa:
													</label>
													<?php echo generar_select($link, "empresas", "id_empresas", "nombre_empresas", true	);	?>
												</div>
												<div class="form-group mx-sm-3 mb-2">
													<label for="num_eco" >Num Eco:</label>
													<input type="number" class="form-control input-sm" name="num_eco" >
												</div>
												<div class="form-group mx-sm-3 mb-2">
													<label for="" class="col-sm col-form-label">Desde:</label>
													<input type="date" class="form-control" value="<?php echo date("Y-m-d");?>" name="fecha_inicial" id="fecha_inicial">
												</div>
												<div class="form-group mx-sm-3 mb-2">
													<label for="" class="col-sm col-form-label">Hasta:</label>
													<input type="date" class="form-control" value="<?php echo $date_final;?>" name="fecha_final" id="fecha_final">
													
												</div>
												<br>
												<label>
													Usuario:
												</label>
												<?php echo generar_select($link, "usuarios", "id_usuarios", "nombre_usuarios", true, false, false, $_COOKIE["id_usuarios"])?>
												<button type="submit"  title="Buscar" class="btn btn-primary  d-print-none">
													<i class="fas fa-search"></i>
												</button>
											</form>
										</div>
									</div>
									<div class="card ">
										<div class="card-header">
											<h3 >Lista de Corridas
												<?php if(dame_permiso("venta_boletos.php", $link) == "Supervisor"){?>
													<button disabled type="button" class="btn btn-primary float-right d-print-none" id="btn_pagar">
														<i class="fas fa-dollar-sign"></i> Pagar 
														<span id="span_num_selected">0</span>
													</button>
													<?php
													}	
												?>
													<button  type="button" onclick="window.print()" class="btn btn-info float-right d-print-none">
														<i class="fas fa-print"></i> Imprimir 
													</button>
											</h3>
										</div>
										<div class="card-body" id="lista_corridas">
											
										</div>
									</div>
								</div>
								
								<div class="tab-pane  " id="tab_boletos">
									<hr>
									<div class="row">
										<div class="col-sm-4">
											<h6>SELECCIONA ASIENTOS</h6>
											<div class="plane">
												<ol class="cabin fuselage" id="lista_asientos">
													
												</ol>
											</div>
											
										</div>
										<div class="col-sm-8">
											<form id="form_boletos" autocomplete="off">
												<div class="form-row">
													<div class="form-group col-2"> 
														<label>Corrida #	</label>
														<input name="id_corridas" id="id_corridas" class="form-control" readonly >
													</div>
													<div class="form-group col-2"> 
														<label>Num Eco	</label>
														<input name="num_eco" id="num_eco" class="form-control" readonly >
													</div>
													<div class="col-2">
															<label>Asientos: </label>
														<input name="asientos" id="asientos" class="form-control" readonly >
													</div>
												</div>
												<table class="table table-bordered">
													<thead>
														<tr>
															<th>Num Asiento</th>
															<th>Tipo de Boleto</th>
															<th>Nombre </th>
															<th>CURP </th>
															<th>Precio</th>
														</tr>
													</thead>
													<tbody id="resumen_boletos">
														
													</tbody>
												</table>
												<div class="row">
													<div class="col-12 ">
														<div class="form-group float-right" >
															<label class="h3">TOTAL: </label>
															<input id="importe_total" type="number" readonly class="form-control h3" value="0">
														</div>
													</div>
												</div>
												<div class="row">
													<div class="col-12">
														<button class="btn btn-lg btn-success float-right" disabled>
															<i class="fas fa-check"></i> Vender
														</button>
														<button class="btn mx-2 btn-lg btn-danger float-right" id="nueva_venta" type="button">
															<i class="fas fa-redo"></i> Reset
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
									<div class="card card-secondary mt-4 ">
										<div class="card-header">
											Boletos Vendidos
										</div>
										<div class="card-body" id="lista_boletos">
											<h3 class="text-center">Cargando <i class="fas fa-spinner fa-pulse"></i></h3>
										</div>
									</div>
								</div>
								
								
								
							</div><!-- /.tab-content-->
						</div><!-- /.card-body-->
					</div><!-- /.card -->
				</div><!-- /.container-fluid -->
				
				
				<!-- Sticky Footer -->
				<footer class="sticky-footer">
					<div class="container my-auto ">
						<div class="copyright text-center my-auto">
							<span class="d-print-none">Copyright © Glifo Media 2020</span>
						</div>
					</div>
				</footer>
			</div> 
			<!-- /.content-wrapper -->
		</div>
		<!-- /#wrapper -->
		<form id="form_pagar_corridas">
			<input type="hidden" id="total_pago" name="total_pago">
		</form>
		<!-- Scroll to Top Button-->
		<a class="scroll-to-top rounded d-print-none" href="#page-top">
			<i class="fas fa-angle-up"></i>
		</a>
		
		<div class="d-print-block p-2" style="max-width:100mm;" hidden id="ticket" >
		</div>
		<?php include("../../scripts.php")?>
		<script src="../../plugins/pos_print/websocket-printer.js" > </script>
		<?php include("boletos_iv/form_corridas.php");?>
		<script src="//cdnjs.cloudflare.com/ajax/libs/less.js/3.9.0/less.min.js" ></script>
		<script src="boletos_iv/venta_boletos.js?v=<?= date("Y-m-d-H-i-s")?>"></script>
		
	</body>
</html>																														