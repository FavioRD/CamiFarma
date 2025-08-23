package com.camifarma.farmacia.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.Proveedor;
import com.camifarma.farmacia.repository.ProveedorRepository;

@Service
public class ProveedorService {
	@Autowired
	private ProveedorRepository proveedorRepository;

	public List<Proveedor> getAllProveedores() {
		return proveedorRepository.findAll();
	}

	public Proveedor createProveedor(Proveedor proveedor) {
		return proveedorRepository.save(proveedor);
	}

	public Proveedor getProveedorById(Long id) {
		return proveedorRepository.findById(id).orElse(null);
	}

	public void deleteProveedor(Long id) {
		proveedorRepository.deleteById(id);
	}
	public Proveedor updateProveedor(Long id, Proveedor proveedor) {
		if (proveedorRepository.existsById(id)) {
			proveedor.setId(id);
			return proveedorRepository.save(proveedor);
		}
		return null;
	}
	
	public List<Map<String, Object>> obtenerDetallesProveedor(Long idProveedor) {
        Proveedor proveedor = proveedorRepository.findById(idProveedor)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));

        return proveedor.getProveedorMedicamentos().stream()
                .map(pm -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("medicamento", pm.getMedicamento().getNombre());
                    map.put("precioCompra", pm.getPrecioCompra());
                    return map;
                })
                .toList();
    }
}
