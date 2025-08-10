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

import com.camifarma.farmacia.model.Producto;
import com.camifarma.farmacia.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
	@Autowired
	private ProductoService productoService;
	
	@GetMapping
	public List<Producto> listarProductos() {
		return productoService.getAllProductos();
	}
	@PostMapping
	public Producto createProducto(@RequestBody Producto producto) {
		return productoService.createProducto(producto);
	}
	@GetMapping("/{id}")
	public Producto getProductoById(@PathVariable Long id) {
		return productoService.getProductoById(id);
	}
	@DeleteMapping("/{id}")
	public void deleteProducto(@PathVariable Long id) {
		productoService.deleteProducto(id);
	}

}
