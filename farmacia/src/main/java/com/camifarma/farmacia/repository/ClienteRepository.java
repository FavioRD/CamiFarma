package com.camifarma.farmacia.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.camifarma.farmacia.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {


}
