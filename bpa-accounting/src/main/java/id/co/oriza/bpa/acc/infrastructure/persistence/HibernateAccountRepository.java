package id.co.oriza.bpa.acc.infrastructure.persistence;

import id.co.oriza.bpa.acc.domain.model.Account;
import id.co.oriza.bpa.acc.domain.model.AccountId;
import id.co.oriza.bpa.acc.domain.model.AccountRepository;
import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;

import java.util.Collection;
import java.util.UUID;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;

public class HibernateAccountRepository extends AbstractHibernateSession implements AccountRepository {
	
	@Override
    public AccountId nextIdentity() {
        return new AccountId(UUID.randomUUID().toString().toUpperCase());
    } 

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
	public Collection<Account> allSimilarlyCodedOrNamedAccounts(String aCode,
			String aName, int aStart, int aLimit) {
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Account as _obj_ "
				+ "left join fetch _obj_.group as _group_ "
				+ "left join fetch _obj_.parent as _parent_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}

	@Override
	public Account accountWithCode(String aCode) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.Account as _obj_ "
				+ "where _obj_.code = :aCode ");
		query.setString("aCode", aCode);
		return (Account) query.uniqueResult();
	}

	@Override
	public int allSimilarlyCodedOrNamedAccountsSize(String aCode, String aName) {
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.acc.domain.model.Account as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		
		return ((Long)query.uniqueResult()).intValue();
	}

}
