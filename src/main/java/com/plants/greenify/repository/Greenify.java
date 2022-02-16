package com.plants.greenify.repository;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="plants")
public class Greenify {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	private String scientificname;
	
	private String area;
	
	public int getId() {
		return id;
	}
	
	public String getScientificname() {
		return scientificname;
	}
	
	public String getArea() {
		return area;
	}
	
}
