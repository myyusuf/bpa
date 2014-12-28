package id.co.oriza.bpa.security.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.domain.model.UserRepository;

import java.util.Collection;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateUserRepository extends AbstractHibernateSession implements UserRepository{
	
	final Logger logger = LoggerFactory.getLogger(HibernateUserRepository.class);

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

}
