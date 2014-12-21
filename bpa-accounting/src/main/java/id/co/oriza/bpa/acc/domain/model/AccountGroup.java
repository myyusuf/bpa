package id.co.oriza.bpa.acc.domain.model;

import id.co.oriza.bpa.base.domain.model.ConcurrencySafeEntity;

public class AccountGroup extends ConcurrencySafeEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String code;
	private String name;
	private String description;
	private BalanceType defaultBalance;

}
