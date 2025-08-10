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

import com.camifarma.farmacia.model.Venta;
import com.camifarma.farmacia.service.VentaService;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {
	@Autowired
	private VentaService ventaService;

	@GetMapping
	public List<Venta> listarVentas() {
		return ventaService.getAllVentas();
	}

	@PostMapping
	public Venta createVenta(@RequestBody Venta venta) {
		return ventaService.createVenta(venta);
	}

	@GetMapping("/{id}")
	public Venta getVentaById(@PathVariable Long id) {
		return ventaService.getVentaById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteVenta(@PathVariable Long id) {
		ventaService.deleteVenta(id);
	}

}
