package id.co.oriza.bpa.workstructure.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class Structure extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String structureId;
	private String parentId;
	private Employee employee;
	private Position position;

	protected Structure() {
		super();
	}

	public Structure(String structureId, String aParentId, Employee anEmployee, Position aPosition) {
		this();
//		this.setStructureId(UUID.randomUUID().toString().toUpperCase());
		this.setStructureId(structureId);
		this.setParentId(parentId);
		this.setEmployee(anEmployee);
		this.setPosition(aPosition);
	}

	public String parentId() {
		return parentId;
	}

	public Employee employee() {
		return employee;
	}

	public Position position() {
		return position;
	}

	protected void setParentId(String parentId) {
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
	
	public void changeParentId(String aParentId) {
		this.setParentId(aParentId);
	}
	
	public void changeEmployee(Employee anEmployee) {
		this.setEmployee(anEmployee);
	}
	
	public void changePosition(Position aPosition) {
		this.setPosition(aPosition);
	}

	public String structureId() {
		return structureId;
	}

	protected void setStructureId(String structureId) {
		this.structureId = structureId;
	}

}
