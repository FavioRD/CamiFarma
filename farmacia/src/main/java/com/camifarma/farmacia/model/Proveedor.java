package com.camifarma.farmacia.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "proveedores")
public class Proveedor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nombre;

	@Column(nullable = false)
	private String numero;

	@Column(nullable = false)
	private String email;
	
	@OneToMany(mappedBy = "proveedor" ,cascade = CascadeType.ALL)
	@JsonIgnoreProperties("proveedor")
    private List<ProveedorMedicamento> proveedorMedicamentos;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	public List<ProveedorMedicamento> getProveedorMedicamentos() {
		return proveedorMedicamentos;
	}

}
