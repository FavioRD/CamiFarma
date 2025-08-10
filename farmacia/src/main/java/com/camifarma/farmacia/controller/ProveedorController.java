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

import com.camifarma.farmacia.model.Proveedor;
import com.camifarma.farmacia.service.ProveedorService;

@RestController
@RequestMapping("/api/proveedores")
public class ProveedorController {
	@Autowired
	private ProveedorService proveedorService;

	@GetMapping
	public List<Proveedor> listarProveedores() {
		return proveedorService.getAllProveedores();
	}

	@PostMapping
	public Proveedor createProveedor(@RequestBody Proveedor proveedor) {
		return proveedorService.createProveedor(proveedor);
	}

	@GetMapping("/{id}")
	public Proveedor getProveedorById(@PathVariable Long id) {
		return proveedorService.getProveedorById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteProveedor(@PathVariable Long id) {
		proveedorService.deleteProveedor(id);
	}

}
