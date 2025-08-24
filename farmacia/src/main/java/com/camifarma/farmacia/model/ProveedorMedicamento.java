package com.camifarma.farmacia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "proveedorMedicamento")
public class ProveedorMedicamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "id_medicamento", referencedColumnName = "id", nullable = false)
    private Medicamento medicamento;

    @ManyToOne
    @JoinColumn(name = "id_proveedor", referencedColumnName = "id", nullable = false)
    @JsonIgnoreProperties("proveedorMedicamento")
    private Proveedor proveedor;

    
    @Column(name = "precio_compra", nullable = false)
    private Double precioCompra;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public Medicamento getMedicamento() {
		return medicamento;
	}


	public void setMedicamento(Medicamento medicamento) {
		this.medicamento = medicamento;
	}


	public Proveedor getProveedor() {
		return proveedor;
	}


	public void setProveedor(Proveedor proveedor) {
		this.proveedor = proveedor;
	}


	public Double getPrecioCompra() {
		return precioCompra;
	}


	public void setPrecioCompra(Double precioCompra) {
		this.precioCompra = precioCompra;
	}
    
    
   
}