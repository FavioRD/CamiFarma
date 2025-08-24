package com.camifarma.farmacia.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camifarma.farmacia.DTO.VentaDTO;
import com.camifarma.farmacia.model.Venta;
import com.camifarma.farmacia.service.VentaService;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    @Autowired
    private VentaService ventaService;
    
    @GetMapping("/lista")
    public List<Venta> listarVentas() {
		return ventaService.listarVentas();
	}
    

    @PostMapping("/registrar")
    public Double registrarVenta(@RequestBody VentaDTO ventaDTO) throws Exception {
        return ventaService.registrarVenta(ventaDTO);
    
    }
}
