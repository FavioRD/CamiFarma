package com.camifarma.farmacia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.Empleado;
import com.camifarma.farmacia.repository.EmpleadoRepository;

@Service
public class EmpleadoService {
	@Autowired
	private EmpleadoRepository empleadoRepository;

	public List<Empleado> getAllEmpleados() {
		return empleadoRepository.findAll();
	}

	public Empleado createEmpleado(Empleado empleado) {
		return empleadoRepository.save(empleado);
	}

	public Empleado getEmpleadoById(Long id) {
		return empleadoRepository.findById(id).orElse(null);
	}

	public void deleteEmpleado(Long id) {
		empleadoRepository.deleteById(id);
	}

}
