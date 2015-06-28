package id.co.oriza.bpa.acc.infrastructure.persistence;

import id.co.oriza.bpa.acc.domain.model.Currency;
import id.co.oriza.bpa.acc.domain.model.CurrencyRepository;
import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;

import java.util.Collection;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateCurrencyRepository extends AbstractHibernateSession implements CurrencyRepository {
	
	final Logger logger = LoggerFactory.getLogger(HibernateCurrencyRepository.class);
	
	@SuppressWarnings("unchecked")
	@Override
	public Collection<Currency> allSimilarlyCodedOrNamedCurrencies(String aCode, String aName, int aStart, int aLimit) {
		
		logger.debug("allSimilarlyCodedOrNamedAccountGroups");
		
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Currency as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}
	
	@Override
	public int allSimilarlyCodedOrNamedCurrenciesSize(String aCode, String aName) {
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.acc.domain.model.Currency as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		
		return ((Long)query.uniqueResult()).intValue();
	}
	
	@Override
	public Currency currencyWithCode(String aCode) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Currency as _obj_ "
				+ "where _obj_.code = :aCode ");
		query.setString("aCode", aCode);
		return (Currency) query.uniqueResult();
	}


}
