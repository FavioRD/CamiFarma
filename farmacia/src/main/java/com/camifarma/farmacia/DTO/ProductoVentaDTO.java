package com.camifarma.farmacia.DTO;

public class ProductoVentaDTO {
	private Long id;
	private Integer cantidad;

	public Long getProductoId() {
		return id;
	}

	public void setProductoId(Long productoId) {
		this.id = productoId;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}
}
