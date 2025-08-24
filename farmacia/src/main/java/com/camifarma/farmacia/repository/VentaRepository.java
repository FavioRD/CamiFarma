package com.camifarma.farmacia.repository;

import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.camifarma.farmacia.model.Venta;

public interface VentaRepository extends CrudRepository<Venta, Long> {
	@Procedure(procedureName = "registrar_venta")
    Double registrarVenta(@Param("productos_json") String productosJson);

}
