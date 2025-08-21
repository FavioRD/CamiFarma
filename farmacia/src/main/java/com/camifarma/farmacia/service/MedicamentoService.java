package com.camifarma.farmacia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.Medicamento;
import com.camifarma.farmacia.repository.MedicamentoRepository;

@Service
public class MedicamentoService {
	@Autowired
	private MedicamentoRepository medicamentoRepository;

	public List<Medicamento> getAllMedicamentos() {
		return medicamentoRepository.findAll();
	}

	public Medicamento createMedicamento(Medicamento medicamento) {
		return medicamentoRepository.save(medicamento);
	}

	public Medicamento getMedicamentoById(Long id) {
		return medicamentoRepository.findById(id).orElse(null);
	}

	public void deleteMedicamento(Long id) {
		medicamentoRepository.deleteById(id);
	}
	public Medicamento updateMedicamento(Long id, Medicamento medicamento) {
		if (medicamentoRepository.existsById(id)) {
			medicamento.setId(id);
			return medicamentoRepository.save(medicamento);
		}
		return null;
	}

}
