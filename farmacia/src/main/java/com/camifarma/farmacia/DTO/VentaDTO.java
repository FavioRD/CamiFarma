package com.camifarma.farmacia.DTO;

import java.util.Date;
import java.util.List;

public class VentaDTO {
	private Date fecha;
    private List<ProductoVentaDTO> productos;
    
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public List<ProductoVentaDTO> getProductos() {
		return productos;
	}
	public void setProductos(List<ProductoVentaDTO> productos) {
		this.productos = productos;
	}
    
    
}
