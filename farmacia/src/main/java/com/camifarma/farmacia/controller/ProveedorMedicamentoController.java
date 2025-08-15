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

import com.camifarma.farmacia.model.ProveedorMedicamento;
import com.camifarma.farmacia.service.ProveedorMedicamentoService;

@RestController
@RequestMapping("/api/provemedi")
public class ProveedorMedicamentoController {
	@Autowired
	private ProveedorMedicamentoService proveedorMedicamentoService;

	@GetMapping
	public List<ProveedorMedicamento> listarProveedores() {
		return proveedorMedicamentoService.getAllProveedoresMedicamentos();
	}

	@PostMapping
	public ProveedorMedicamento createProveedor(@RequestBody ProveedorMedicamento proveedorMedicamento) {
		return proveedorMedicamentoService.createProveedorMedicamentos(proveedorMedicamento);
	}

	@GetMapping("/{id}")
	public ProveedorMedicamento getProveedorById(@PathVariable Long id) {
		return proveedorMedicamentoService.getProveedorMedicamentosById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteProveedor(@PathVariable Long id) {
		proveedorMedicamentoService.deleteProveedorMedicamentos(id);
	}

}
