package id.co.oriza.bpa.security.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import org.hibernate.validator.constraints.NotEmpty;

public class User extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String description;
	
	private ContactInformation contactInformation;

	

}