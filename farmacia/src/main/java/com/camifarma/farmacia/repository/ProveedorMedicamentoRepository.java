package com.camifarma.farmacia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.camifarma.farmacia.model.ProveedorMedicamento;

public interface ProveedorMedicamentoRepository extends JpaRepository <ProveedorMedicamento, Long> {

	// Aquí puedes agregar métodos personalizados si es necesario

}
