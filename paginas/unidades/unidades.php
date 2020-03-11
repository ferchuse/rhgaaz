<?php 
	include("../login/login_check.php");
	include("../../conexi.php");
	include("../../funciones/generar_select.php");
	
	$link = Conectarse();
	
	
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Catálogo de Unidades</title>
		<?php include('../../styles.php')?>
	</head>
	<body id="page-top">
    <?php include("../../navbar.php")?>
    <div id="wrapper">
			<?php include("../../menu.php")?>	
			<div id="content-wrapper">		
				<div class="container-fluid">		
          <!-- Breadcrumbs-->
					<ol class="breadcrumb">
						<li class="breadcrumb-item">
							<a href="#">Catálogos</a>
						</li>
						<li class="breadcrumb-item active">Unidades</li>
					</ol>
					
					<div class="row mb-2">
						<div class="col-12">
							<form id="form_filtro" autocomplete="off">
								<div class="row mb-2">
									<div class="col-12">
										<div class="col-12 mb-3">
											<button class="btn btn-primary btn-sm" >
												<i class="fas fa-search"></i> Buscar
											</button>
											<button type="button" class="btn btn-success nuevo btn-sm" >
												<i class="fas fa-plus"></i> Nuevo
											</button>
											
										</div>
										
									</div>
								</div>
								
								
								<div class="row mb-2"> 
									<div class="col-1">
										<label for="">No. Economico:</label>
									</div>	
									<div class="col-3">			
										<input class="form-control" type="text" name="num_eco"  >
									</div> 
									<div class="col-1">
										<label for="">Derrotero:</label>
									</div>	
									<div class="col-3">			
										<?php echo generar_select($link, "derroteros", "id_derroteros", "nombre_derroteros", true);?>
									</div> 
									<div class="col-1">
										<label >Propietario:</label>
									</div>	
									<div class="col-3">			
										<?php
											echo generar_select($link, "propietarios", "id_propietarios", "nombre_propietarios", true);
										?>
									</div>
								</div>
								<div class="row mb-2">
									<div class="col-1">
										<label >Empresa:</label>
									</div>	
									<div class="col-3">			
										<?php
											echo generar_select($link, "empresas", "id_empresas", "nombre_empresas", true);
										?>
									</div>
									
									<div class="col-1">
										<label >Estatus:</label>
									</div>	
									<div class="col-3">			
										<select class="form-control" name="estatus_unidades">
											<option value="">Todos</option>
											<option>Alta</option>
											<option>Baja</option>
											<option>Inactivo</option>
										</select>
									</div>
								</div>	
								
							</div>
							
						</form>
						<hr>
					</div>
				</div>
				<hr>
				
				
				
				<div class="card mb-3">
					<div class="card-header">
						<i class="fas fa-table"></i>
						Lista de Unidades
					</div>
					<div class="card-body">
						<div class="table-responsive" id="lista_registros">
							<h3 >Cargando...</h3>
						</div>
					</div>
					<div class="card-footer small text-muted"></div>
				</div>
			</div>
			<!-- /.container-fluid -->
			
			<!-- Sticky Footer -->
			<footer class="sticky-footer">
				<div class="container my-auto">
					<div class="copyright text-center my-auto">
						<span>Copyright © Glifo Media 2020</span>
					</div>
				</div>
			</footer>
			
		</div>
		<!-- /.content-wrapper -->
	</div>
	<!-- /#wrapper -->
	
	<!-- Scroll to Top Button-->
	<a class="scroll-to-top rounded" href="#page-top">
		<i class="fas fa-angle-up"></i>
	</a>		
		<?php include("../../scripts.php")?>
	
	<link href="../../plugins/fileupload/fileupload.css" rel='stylesheet' type='text/css'>
	<script src="../../plugins/fileupload/jquery.ui.widget.js"></script>
	<script src="../../plugins/fileupload/jquery.fileupload.js"></script>
	
	<?php include("form_unidades.php")?>
	<?php include("modal_historial.php")?>

	<script src="unidades.js?v=<?= date("d-m-Y-H-i-s")?>"></script>
</body>
</html>
