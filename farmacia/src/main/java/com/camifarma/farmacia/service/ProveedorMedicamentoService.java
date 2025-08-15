package com.camifarma.farmacia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.ProveedorMedicamento;
import com.camifarma.farmacia.repository.ProveedorMedicamentoRepository;

@Service
public class ProveedorMedicamentoService {
	@Autowired
	private ProveedorMedicamentoRepository proveedorMedicamentoRepository;

	public List<ProveedorMedicamento> getAllProveedoresMedicamentos() {
		return proveedorMedicamentoRepository.findAll();
	}

	public ProveedorMedicamento createProveedorMedicamentos(ProveedorMedicamento proveedorMedicamento) {
		return proveedorMedicamentoRepository.save(proveedorMedicamento);
	}

	public ProveedorMedicamento getProveedorMedicamentosById(Long id) {
		return proveedorMedicamentoRepository.findById(id).orElse(null);
	}

	public void deleteProveedorMedicamentos(Long id) {
		proveedorMedicamentoRepository.deleteById(id);
	}

}
