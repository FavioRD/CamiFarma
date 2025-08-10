package com.camifarma.farmacia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.camifarma.farmacia.model.Empleado;

public interface EmpleadoRepository extends JpaRepository <Empleado, Long> {

	// Aquí puedes agregar métodos personalizados si es necesario

}
