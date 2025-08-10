package com.camifarma.farmacia.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.camifarma.farmacia.model.Cliente;
import com.camifarma.farmacia.repository.ClienteRepository;

@Service
public class ClienteService {
	@Autowired
	private ClienteRepository clienteRepository;

	public List<Cliente> getAllClientes() {
		return clienteRepository.findAll();
	}

	public Cliente createCliente(Cliente cliente) {
		return clienteRepository.save(cliente);
	}

	public Cliente getClienteById(Long id) {
		return clienteRepository.findById(id).orElse(null);

	}

	public void deleteCliente(Long id) {
		clienteRepository.deleteById(id);
	}
}
