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

import com.camifarma.farmacia.model.DetalleVenta;
import com.camifarma.farmacia.service.DetalleVentaService;

@RestController
@RequestMapping("/api/detalleventas")
public class DetalleVentaController {
	@Autowired
	private DetalleVentaService detalleVentaService;
	
	@GetMapping
	public List<DetalleVenta> listarDetalleVentas() {
		return detalleVentaService.getAllDetalles();
	}
	@PostMapping
	public DetalleVenta createDetalleVenta(@RequestBody DetalleVenta detalleVenta) {
		return detalleVentaService.createDetalles(detalleVenta);
	}
	@GetMapping("/{id}")
	public DetalleVenta getDetalleVentaById(@PathVariable Long id) {
		return detalleVentaService.getDetallesById(id);
	}
	@DeleteMapping("/{id}")
	public void deleteDetalleVenta(@PathVariable Long id) {
		detalleVentaService.deleteDetalles(id);
	}

}
