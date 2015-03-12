package id.co.oriza.bpa.workstructure.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Structure extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Long parentId;
	private Employee employee;
	private Position position;

	protected Structure() {
		super();
	}

	public Structure(Long parentId, Employee employee, Position position) {
		this();
		this.parentId = parentId;
		this.employee = employee;
		this.position = position;
	}

	public Long parentId() {
		return parentId;
	}

	public Employee employee() {
		return employee;
	}

	public Position position() {
		return position;
	}

	protected void setParentId(Long parentId) {
		this.parentId = parentId;
	}

	protected void setEmployee(Employee anEmployee) {
		this.assertArgumentNotNull(anEmployee, "The employee is required.");
		this.employee = anEmployee;
	}

	protected void setPosition(Position aPosition) {
		this.assertArgumentNotNull(aPosition, "The position is required.");
		this.position = aPosition;
	}
	
	public void changeParentId(Long aParentId) {
		this.setParentId(aParentId);
	}
	
	public void changeEmployee(Employee anEmployee) {
		this.setEmployee(anEmployee);
	}
	
	public void changePosition(Position aPosition) {
		this.setPosition(aPosition);
	}

}
