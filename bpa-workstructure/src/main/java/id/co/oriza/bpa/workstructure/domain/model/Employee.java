package id.co.oriza.bpa.workstructure.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Employee extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String employeeId;
	private String name;
	private String email;
	private String photoFileName;
	
	protected Employee() {
		super();
	}

	public Employee(String anEmployeeId, String aName, String anEmail, String aPhotoFileName) {
		this();
		this.setEmployeeId(anEmployeeId);
		this.setName(aName);
		this.setEmail(anEmail);
		this.setPhotoFileName(aPhotoFileName);
	}

	public String employeeId() {
		return employeeId;
	}

	public String name() {
		return name;
	}

	protected void setEmployeeId(String anEmployeeId) {
		this.assertArgumentNotNull(anEmployeeId, "The employeeId is required.");
		this.employeeId = anEmployeeId;
	}

	protected void setName(String aName) {
		this.assertArgumentNotNull(name, "The name is required.");
		this.name = aName;
	}
	
	public void changeName(String aName) {
		this.setName(aName);
	}
	
	public void changeEmail(String anEmail) {
		this.setEmail(anEmail);
	}
	
	public void changePhotoFileName(String aPhotoFileName) {
		this.setPhotoFileName(aPhotoFileName);
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((employeeId == null) ? 0 : employeeId.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Employee other = (Employee) obj;
		if (employeeId == null) {
			if (other.employeeId != null)
				return false;
		} else if (!employeeId.equals(other.employeeId))
			return false;
		return true;
	}

	public String email() {
		return email;
	}

	protected void setEmail(String anEmail) {
		this.assertArgumentNotNull(anEmail, "The email is required.");
		this.email = anEmail;
	}

	public String photoFileName() {
		return photoFileName;
	}

	protected void setPhotoFileName(String photoFileName) {
		this.photoFileName = photoFileName;
	}

}
