package com.camifarma.farmacia.DTO;

public class ProductoVentaDTO {
    private Long idProducto;
    private Integer cantidad;

    // Getters y setters
    public Long getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(Long id) {
        this.idProducto = id;
    }
    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
}