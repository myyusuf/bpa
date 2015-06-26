package id.co.oriza.bpa.acc.infrastructure.persistence;

import id.co.oriza.bpa.acc.domain.model.Currency;
import id.co.oriza.bpa.acc.domain.model.CurrencyRepository;
import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateCurrencyRepository extends AbstractHibernateSession implements CurrencyRepository {
	
	final Logger logger = LoggerFactory.getLogger(HibernateCurrencyRepository.class);
	
	@Override
	public Currency currencyWithCode(String aCode) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Currency as _obj_ "
				+ "where _obj_.code = :aCode ");
		query.setString("aCode", aCode);
		return (Currency) query.uniqueResult();
	}


}
