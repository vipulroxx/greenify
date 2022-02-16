package com.plants.greenify.repository;

import org.springframework.data.repository.CrudRepository;

public interface GreenifyRepository extends CrudRepository<Greenify, Integer>{

	Iterable<Greenify> findByAreaIgnoreCase(String area);

}
