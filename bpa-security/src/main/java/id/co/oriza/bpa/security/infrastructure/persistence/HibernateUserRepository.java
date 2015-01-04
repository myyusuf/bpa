package id.co.oriza.bpa.security.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.domain.model.UserRepository;

import java.util.Collection;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateUserRepository extends AbstractHibernateSession implements UserRepository{
	
	final Logger logger = LoggerFactory.getLogger(HibernateUserRepository.class);
	
	@Override
	public void add(User aUser) {
		try{
			this.session().saveOrUpdate(aUser);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("User is not unique.", e);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<User> allSimilarlyNamedUsers(String aName, int aStart,
			int aLimit) {
		logger.debug("allSimilarlyNamedUsers");
		
		if(aName.endsWith("%")){
			throw new IllegalArgumentException("Name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.User as _obj_ "
				+ "where _obj_.firstName like :aName "
				+ "or _obj_.lastName like :aName ");
		query.setString("aName", aName + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}
	
	@Override
	public long allSimilarlyNamedUsersSize(String aName) {
		logger.debug("allSimilarlyNamedUsers");
		
		if(aName.endsWith("%")){
			throw new IllegalArgumentException("Name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.security.domain.model.User as _obj_ "
				+ "where _obj_.firstName like :aName "
				+ "or _obj_.lastName like :aName ");
		query.setString("aName", aName + "%");
		
		return (Long)query.uniqueResult();
	}

	
	@Override
	public User userWithUsername(String aUsername) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.User as _obj_ "
				+ "where _obj_.username = :aUsername ");
		query.setString("aUsername", aUsername);
		return (User) query.uniqueResult();
	}

	@Override
	public void remove(User aUser) {
		this.session().delete(aUser);
	}

}
