package com.camifarma.farmacia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.camifarma.farmacia.model.Proveedor;

public interface ProveedorRepository extends JpaRepository <Proveedor, Long> {

	// Aquí puedes agregar métodos personalizados si es necesario

}
