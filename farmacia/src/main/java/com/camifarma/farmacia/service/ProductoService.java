package com.camifarma.farmacia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.Producto;
import com.camifarma.farmacia.repository.ProductoRepository;

@Service
public class ProductoService {
	@Autowired
	private ProductoRepository productoRepository;

	public List<Producto> getAllProductos() {
		return productoRepository.findAll();
	}

	public Producto createProducto(Producto producto) {
		return productoRepository.save(producto);
	}

	public Producto getProductoById(Long id) {
		return productoRepository.findById(id).orElse(null);
	}

	public void deleteProducto(Long id) {
		productoRepository.deleteById(id);
	}

}
