package id.co.oriza.bpa.acc.infrastructure.persistence;

import java.util.Collection;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;
import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;

public class HibernateAccountRepository extends AbstractHibernateSession implements AccountRepository {

	@Override
	public void add(Account anAccount) {
		try{
			this.session().saveOrUpdate(anAccount);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Account is not unique.", e);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Account> allSimilarlyCodeOrNameAccounts(String aCode,
			String aName) {
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Account as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		
		return query.list();
	}

}
