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

import com.camifarma.farmacia.model.Medicamento;
import com.camifarma.farmacia.service.MedicamentoService;

@RestController
@RequestMapping("/api/medicamentos")
public class MedicamentoController {
	@Autowired
	private MedicamentoService medicamentoService;
	@GetMapping
	public List<Medicamento> listarMedicamentos() {
		return medicamentoService.getAllMedicamentos();
	}
	@PostMapping
	public Medicamento createMedicamento(@RequestBody Medicamento medicamento) {
		return medicamentoService.createMedicamento(medicamento);
	}
	@GetMapping("/{id}")
	public Medicamento getMedicamentoById(@PathVariable Long id) {
		return medicamentoService.getMedicamentoById(id);
	}
	@DeleteMapping("/{id}")
	public void deleteMedicamento(@PathVariable Long id) {
		medicamentoService.deleteMedicamento(id);
	}

}
