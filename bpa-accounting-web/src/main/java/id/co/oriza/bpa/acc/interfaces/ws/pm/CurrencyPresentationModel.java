package id.co.oriza.bpa.acc.interfaces.ws.pm;

import id.co.oriza.bpa.acc.domain.model.Currency;

public class CurrencyPresentationModel {
	
	private Currency currency;
	
	public CurrencyPresentationModel(Currency aCurrency){
		super();
		this.currency = aCurrency;
	}
	
	public String getCode(){
		return this.currency.code();
	}
	
	public String getName(){
		return this.currency.name();
	}
	
}
