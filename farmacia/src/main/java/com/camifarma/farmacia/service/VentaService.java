package com.camifarma.farmacia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.Venta;
import com.camifarma.farmacia.repository.VentaRepository;

@Service
public class VentaService {
	@Autowired
	private VentaRepository ventaRepository;

	public List<Venta> getAllVentas() {
		return ventaRepository.findAll();
	}

	public Venta createVenta(Venta venta) {
		return ventaRepository.save(venta);
	}

	public Venta getVentaById(Long id) {
		return ventaRepository.findById(id).orElse(null);
	}

	public void deleteVenta(Long id) {
		ventaRepository.deleteById(id);
	}
}
