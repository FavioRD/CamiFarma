package com.camifarma.farmacia.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.camifarma.farmacia.model.Cliente;
import com.camifarma.farmacia.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
	@Autowired
	private ClienteService clienteService;

	@GetMapping()
	public List<Cliente> listarClientes() {
		return clienteService.getAllClientes();
	}

	@PostMapping()
	public Cliente createCliente(@RequestBody Cliente cliente) {
		return clienteService.createCliente(cliente);
	}

	@GetMapping("/{id}")
	public Cliente getClienteById(@PathVariable Long id) {
		return clienteService.getClienteById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteCliente(@PathVariable Long id) {
		clienteService.deleteCliente(id);
	}

}
