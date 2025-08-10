package com.camifarma.farmacia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.camifarma.farmacia.model.Medicamento;

public interface MedicamentoRepository extends JpaRepository <Medicamento, Long> {

	// Aquí puedes agregar métodos personalizados si es necesario

}
