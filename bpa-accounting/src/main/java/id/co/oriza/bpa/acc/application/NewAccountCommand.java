package id.co.oriza.bpa.acc.application;

public class NewAccountCommand {

	private String code;
	private String name;
	private String description;
	private String accountGroupCode;
	private String parentAccountCode;

	public NewAccountCommand(String code, String name, String description,
			String accountGroupCode, String parentAccountCode) {
		super();
		this.code = code;
		this.name = name;
		this.description = description;
		this.accountGroupCode = accountGroupCode;
		this.parentAccountCode = parentAccountCode;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAccountGroupCode() {
		return accountGroupCode;
	}

	public void setAccountGroupCode(String accountGroupCode) {
		this.accountGroupCode = accountGroupCode;
	}

	public String getParentAccountCode() {
		return parentAccountCode;
	}

	public void setParentAccountCode(String parentAccountCode) {
		this.parentAccountCode = parentAccountCode;
	}

}
