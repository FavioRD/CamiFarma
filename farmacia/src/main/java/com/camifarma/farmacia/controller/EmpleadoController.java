package com.camifarma.farmacia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camifarma.farmacia.model.Empleado;
import com.camifarma.farmacia.service.EmpleadoService;

@RestController
@RequestMapping("/api/empleados")
public class EmpleadoController {
	@Autowired
	private EmpleadoService empleadoService;

	@GetMapping
	public List<Empleado> listarEmpleados() {
		return empleadoService.getAllEmpleados();
	}

	@PostMapping
	public Empleado createEmpleado(@RequestBody Empleado empleado) {
		return empleadoService.createEmpleado(empleado);
	}

	@GetMapping("/{id}")
	public Empleado getEmpleadoById(@PathVariable Long id) {
		return empleadoService.getEmpleadoById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteEmpleado(@PathVariable Long id) {
		empleadoService.deleteEmpleado(id);
	}

}
