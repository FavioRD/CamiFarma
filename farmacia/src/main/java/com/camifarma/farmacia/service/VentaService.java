package com.camifarma.farmacia.service;


import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.DTO.ProductoVentaDTO;
import com.camifarma.farmacia.DTO.VentaDTO;
import com.camifarma.farmacia.model.DetalleVenta;
import com.camifarma.farmacia.model.Medicamento;
import com.camifarma.farmacia.model.Venta;
import com.camifarma.farmacia.repository.DetalleVentaRepository;
import com.camifarma.farmacia.repository.MedicamentoRepository;
import com.camifarma.farmacia.repository.VentaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.transaction.Transactional;

@Service
public class VentaService {

	   @Autowired
	    private VentaRepository ventaRepository;

	    @Autowired
	    private DetalleVentaRepository detalleVentaRepository;

	    @Autowired
	    private MedicamentoRepository medicamentoRepository;

	    @Transactional
	    public Venta registrarVenta(VentaDTO ventaDTO) {
	        Venta venta = new Venta();
	        venta.setFecha(ventaDTO.getFecha() != null ? ventaDTO.getFecha() : new Date());

	        double total = 0.0;
	        venta.setTotal(0.0);
	        // Primero guardamos la venta sin total (para obtener ID)
	        venta = ventaRepository.save(venta);

	        
	        for (ProductoVentaDTO productoDTO : ventaDTO.getProductos()) {
	            Medicamento medicamento = medicamentoRepository.findById(productoDTO.getIdProducto())
	                    .orElseThrow(() -> new RuntimeException("Medicamento no encontrado con ID: " + productoDTO.getIdProducto()));

	            double precio = medicamento.getPrecioVenta(); // supongo que Medicamento tiene campo precio
	            int cantidad = productoDTO.getCantidad();
	            double subtotal = precio * cantidad;

	            DetalleVenta detalle = new DetalleVenta();
	            detalle.setVenta(venta);
	            detalle.setMedicamento(medicamento);
	            detalle.setCantidad(cantidad);
	            detalle.setPrecioVenta(precio);
	            detalle.setSubtotal(subtotal);

	            detalleVentaRepository.save(detalle);

	            total += subtotal;
	        }

	        // Actualizamos el total y guardamos de nuevo
	        venta.setTotal(total);
	        return ventaRepository.save(venta);
	    }

	    public List<Venta> listarVentas() {
	        return (List<Venta>) ventaRepository.findAll();
	    }
}
