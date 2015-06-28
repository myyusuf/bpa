package id.co.oriza.bpa.acc.domain.model;

import java.util.Collection;


public interface CurrencyRepository {
	
	public Currency currencyWithCode(String aCode);

	Collection<Currency> allSimilarlyCodedOrNamedCurrencies(String aCode,
			String aName, int aStart, int aLimit);

	int allSimilarlyCodedOrNamedCurrenciesSize(String aCode, String aName);

}
