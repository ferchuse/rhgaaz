<?php
	$vasientos=explode(",",$_GET['asientos']);
	$vfolios=explode(",",$_GET['folios']);
	$vfoliost=explode(",",$_GET['foliost']);
	$vprecios=explode(",",$_GET['precios']);
	$vtipobols=explode(",",$_GET['tipobols']);
	for($i=0;$i<count($vfolios);$i++){
		$texto =chr(10).chr(13);
		$texto.="    ENLACES DE TRANSPORTE TERRESTRE".chr(10).chr(13);
		$texto.="       7 DE ENERO, S.A. DE C.V.".chr(10).chr(13).chr(10).chr(13);
		$texto.="     TERMINAL EN MEXICO D.F. METRO".chr(10).chr(13); 
		$texto.="             INDIOS VERDES".chr(10).chr(13);
		$texto.="   ANDEN 'A' TEL:5750-0858   5750-0847".chr(10).chr(13);
		$texto.="TERMINAL EN CATEMACO VERACRUZ  LERDO No. 4".chr(10).chr(13);
		$texto.="     OFICINA SAN ANDRES, TUXTLA VER.".chr(10).chr(13);//NUEVO DE AQUI
		$texto.=" DIRECCION: BOULEVARD 5 DE FEBRERO # 1270 ".chr(10).chr(13);//NUEVO DE AQUI
		$texto.="        COL. CAMPECHE SAN ANDRES".chr(10).chr(13);//NUEVO DE AQUI
		$texto.="                TUXTLA VER.".chr(10).chr(13);//NUEVO DE AQUI
		$texto.="                C.P. 95720".chr(10).chr(13);//NUEVO DE AQUI
		$texto.="         TELEFONO 294 9 42 1976".chr(10).chr(13);//NUEVO DE AQUI
		$texto.="NOTA: ESTE BOLETO ES BUENO PARA LA FECHA Y".chr(10).chr(13);
		$texto.=" HORA EN QUE SE  EXPIDE  Y LE DA DERECHO".chr(10).chr(13);
		$texto.="          AL SEGURO DE VIAJERO".chr(10).chr(13);
		$texto.="               EXIJALO.".chr(10).chr(13);
		$texto.="  TIPO DE BOLETO: ".$vtipobols[$i].chr(10).chr(13).chr(10).chr(13);
		$texto.="  RUTA: ".$_GET['ruta'].chr(10).chr(13);
		$texto.="  FOLIO: ".$vfolios[$i].chr(10).chr(13);
		$texto.="  FOLIO TICKET: ".$vfoliost[$i].chr(10).chr(13);
		$texto.="  FECHA: ".$_GET['fecha'].chr(10).chr(13);
		$texto.="  PRECIO: ".$vprecios[$i].chr(10).chr(13);
		$texto.="  FECHA SALIDA: ".$_GET['salida'].chr(10).chr(13);
		$texto.="  ASIENTO: ".$vasientos[$i].chr(10).chr(13);
		$texto.="  UNIDAD: ".$_GET['unidad'].chr(10).chr(13);
		$texto.="  TIPO CRED: ".$_GET['tipocred'].chr(10).chr(13);
		$texto.="  CREDENCIAL: ".$_GET['credencial'].chr(10).chr(13);
		$texto.="  PASAJERO: ".$_GET['nompasajero'].chr(10).chr(13);
		$texto.="                      PASAJERO".chr(10).chr(13);
		$texto.=chr(10).chr(10).chr(13).chr(29).chr(86).chr(66).chr(0);
		if($file=fopen("nota.txt","w+")){
		fwrite($file,$texto);
		fclose($file);
		// chmod("abonos/F_".$folio.".txt", 0777);
		}
		system("copy BRUAS.TMB lpt1");
		system("copy nota.txt lpt1: >null:");
		$texto =chr(10).chr(13);
		$texto.="    ENLACES DE TRANSPORTE TERRESTRE".chr(10).chr(13);
		$texto.="       7 DE ENERO, S.A. DE C.V.".chr(10).chr(13).chr(10).chr(13);
		$texto.="TIPO DE  BOLETO: ".$vtipobols[$i].chr(10).chr(13);
		$texto.="PRECIO: ".$vprecios[$i].chr(10).chr(13);
		$texto.="FECHA SALIDA: ".$_GET['salida'].chr(10).chr(13);
		$texto.="ASIENTO: ".$vasientos[$i].chr(10).chr(13);
		$texto.="RUTA: ".$_GET['ruta'].chr(10).chr(13);
		$texto.="UNIDAD: ".$_GET['unidad'].chr(10).chr(13);
		$texto.=chr(29)."h".chr(80).chr(29)."H".chr(2).chr(29)."k".chr(2)."1".sprintf("%011s",(intval($vfolios[$i]))).chr(0);
		$texto.=chr(10).chr(13)."              OPERADOR".chr(10).chr(13);
		$texto.=chr(10).chr(10).chr(13).chr(29).chr(86).chr(66).chr(0);
		if($file=fopen("nota.txt","w+")){
		fwrite($file,$texto);
		fclose($file);
		// chmod("abonos/F_".$folio.".txt", 0777);
		}
		system("copy nota.txt lpt1: >null:");
		}
		?>		