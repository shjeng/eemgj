package com.eemgu.usedproducts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class UsedproductsApplication {

	public static void main(String[] args) {
		SpringApplication.run(UsedproductsApplication.class, args);
	}

}
