package com.camifarma.farmacia.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.DTO.VentaDTO;
import com.camifarma.farmacia.model.Venta;
import com.camifarma.farmacia.repository.VentaRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class VentaService {

    @Autowired
    private VentaRepository ventaRepository;
    
    public List<Venta> listarVentas() {
        return (List<Venta>) ventaRepository.findAll();
    }
    public Double registrarVenta(VentaDTO ventaDTO) throws Exception {
        // Convertir lista de productos a JSON
        ObjectMapper mapper = new ObjectMapper();
        String productosJson = mapper.writeValueAsString(ventaDTO.getProductos());

        // Llamar al SP y obtener el total
        return ventaRepository.registrarVenta(productosJson);
    }	
}
