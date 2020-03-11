<?php 
	session_start();
	if(count($_SESSION) == 0){
		die("<div class='alert alert-danger'>Tu Sesión ha caducado, recarga la página.</div>");
	}
	include('../../../conexi.php');
	include('../../../funciones/generar_select.php');
	include('../../../funciones/console_log.php');
	$link = Conectarse();
	$filas = array();
	$respuesta = array();
	
	
	
	$consulta = "SELECT * FROM boletos 
	LEFT JOIN precios_boletos USING(id_precio)
	
	WHERE id_corridas = {$_GET["id_corridas"]}
	ORDER BY id_boletos DESC
	";
  
	
	$result = mysqli_query($link,$consulta);
	if($result){
		
		if( mysqli_num_rows($result) == 0){
			die("<div class='alert alert-danger'>No hay registros</div>");
			
		}
		
	?>  
	<pre hidden>
		<?php echo $consulta;?>
	</pre>
	<button class="btn btn-info float-right" id="imprimir_guia">
		<i class="fas fa-print"></i> Imprimir Guia y Finalizar 
	</button>
	<table class="table table-bordered table-condensed">
		<thead>
			<tr>
				<th hidden ></th>
				<th>Folio Boleto</th>
				<th>Num Asiento</th>
				<th>Nombre Pasajero</th>
				<th>Tipo de Boleto</th>
				<th>Precio</th>
				<th hidden>Origen </th>
				<th hidden>Destino</th>
			</tr>
		</thead>
		<tbody>
			<?php 
				
				while($fila = mysqli_fetch_assoc($result)){
					// console_log($fila);
					$filas = $fila ;
					
				?>
				<tr>
					<td hidden >
						<?php if($fila["estatus_boletos"] != 'Cancelado'){?>
							
							<button target="_blank" class="btn btn-info imprimir " title="Imprimir" data-id_registro='<?php echo $filas["id_boletos"]?>'>
								<i class="fas fa-print"></i>
							</button>	
							<a target="_blank" class="btn btn-info " title="Imprimir" href="impresion/imprimir_boletos.php?boletos[]=<?php echo $filas["id_boletos"]?>" data-id_registro='<?php echo $filas["id_corridas"]?>'>
								<i class="fas fa-print"></i>
							</a>	
							
							<?php
								
							}
						?>
					</td>
					<td><?php echo $filas["id_boletos"]?></td>
					<td><?php echo $filas["num_asiento"]?></td>
					<td><?php echo $filas["nombre_pasajero"];?></td>
					<td><?php echo $filas["tipo_precio"];?></td>
					<td>$<?php echo number_format($filas["precio_boletos"])?></td>
					<td hidden><?php echo $filas["nombre_origenes"]?></td>
					<td hidden><?php echo $filas["nombre_destinos"]?></td>
					<td hidden><?php
						echo $filas["estatus_corridas"]."<br>";
						if($filas["estatus_corridas"] == "Cancelado"){
							echo $fila["datos_cancelacion"];
							
						}
					?></td>
				</tr>
				
				<?php
					$boletos_vendidos++;;
					$total_guia+= $filas["precio_boletos"];
					
				}
			?>
			
			<tr hidden>
				<td colspan="4"> TOTALES</td>
				<td><?php echo number_format($total_saldo_unidades);?></td>
				<td><?php echo number_format($total_ingresos);?></td>
				<td><?php echo number_format($total_cargos);?></td>
				<td><?php echo number_format($ingresos)?></td>
				
			</tr>
		</tbody>
	</table>
	<div class="col-3">
		<div class="form-group">
			<label>Boletos Vendidos</label>
			<input type="" class="form-control" readonly  id="boletos_vendidos" value="<?php echo mysqli_num_rows($result)?>">
		</div>
		<Div class="form-group">
			<label>Total Guia</label>
			<input type="" class="form-control" readonly   id="total_guia" value="<?php echo $total_guia?>">	
		</div>
	</div>
	<?php
		
	}
	
	else {
		echo "Error en ".$consulta.mysqli_Error($link);
		
	}
	
	
	?>		