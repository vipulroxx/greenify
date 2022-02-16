package com.plants.greenify.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.plants.greenify.repository.Greenify;
import com.plants.greenify.repository.GreenifyRepository;

@RestController
@RequestMapping("/plants")
public class GreenifyController {

	@Autowired
	GreenifyRepository greenifyRepository;
	
	@GetMapping("/all")
	public Iterable<Greenify> getPlants() {
		return greenifyRepository.findAll();
	}
	
	@GetMapping("/{id}")
	public Greenify getPlant(@PathVariable int id) {
		return greenifyRepository.findById(id).orElseThrow(RuntimeException::new);
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public Iterable<Greenify> getArea(@RequestParam(value="area") String area) {
		return greenifyRepository.findByAreaIgnoreCase(area);
	}
}