package com.camifarma.farmacia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.DetalleVenta;
import com.camifarma.farmacia.repository.DetalleVentaRepository;

@Service
public class DetalleVentaService {
	@Autowired
	private DetalleVentaRepository detalleVentaRepository;

	public List<DetalleVenta> getAllDetalles() {
		return detalleVentaRepository.findAll();
	}

	public DetalleVenta createDetalles(DetalleVenta detalleVenta) {
		return detalleVentaRepository.save(detalleVenta);
	}

	public DetalleVenta getDetallesById(Long id) {
		return detalleVentaRepository.findById(id).orElse(null);
	}

	public void deleteDetalles(Long id) {
		detalleVentaRepository.deleteById(id);
	}

}
