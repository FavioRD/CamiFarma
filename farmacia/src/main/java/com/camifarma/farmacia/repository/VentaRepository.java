package com.camifarma.farmacia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.camifarma.farmacia.model.Venta;

public interface VentaRepository extends JpaRepository<Venta, Long> {

	// Aquí puedes agregar métodos personalizados si es necesario

}
