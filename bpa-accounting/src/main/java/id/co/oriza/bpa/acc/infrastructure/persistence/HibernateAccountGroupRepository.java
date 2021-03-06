package id.co.oriza.bpa.acc.infrastructure.persistence;

import id.co.oriza.bpa.acc.domain.model.AccountGroup;
import id.co.oriza.bpa.acc.domain.model.AccountGroupRepository;
import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;

import java.util.Collection;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateAccountGroupRepository extends AbstractHibernateSession implements AccountGroupRepository {
	
	final Logger logger = LoggerFactory.getLogger(HibernateAccountGroupRepository.class);
	
	@Override
	public void add(AccountGroup anAccountGroup) {
		try{
			this.session().saveOrUpdate(anAccountGroup);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Account Group is not unique.", e);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<AccountGroup> allSimilarlyCodedOrNamedAccountGroups(String aCode, String aName, int aStart, int aLimit) {
		
		logger.debug("allSimilarlyCodedOrNamedAccountGroups");
		
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.AccountGroup as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}
	
	@Override
	public int allSimilarlyCodedOrNamedAccountGroupsSize(String aCode, String aName) {
		if(aCode.endsWith("%") || aName.endsWith("%")){
			throw new IllegalArgumentException("Code or name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.acc.domain.model.AccountGroup as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.name like :aName ");
		query.setString("aCode", aCode + "%");
		query.setString("aName", aName + "%");
		
		return ((Long)query.uniqueResult()).intValue();
	}

	@Override
	public AccountGroup accountGroupWithCode(String aCode) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.acc.domain.model.AccountGroup as _obj_ "
				+ "where _obj_.code = :aCode ");
		query.setString("aCode", aCode);
		return (AccountGroup) query.uniqueResult();
	}

	@Override
	public void remove(AccountGroup anAccountGroup) {
		this.session().delete(anAccountGroup);
		
	}

}
