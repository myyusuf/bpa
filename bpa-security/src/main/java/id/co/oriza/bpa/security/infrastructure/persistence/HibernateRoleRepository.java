package id.co.oriza.bpa.security.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.security.domain.model.Role;
import id.co.oriza.bpa.security.domain.model.RoleRepository;

import java.util.Collection;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateRoleRepository extends AbstractHibernateSession implements RoleRepository{
	
	final Logger logger = LoggerFactory.getLogger(HibernateRoleRepository.class);
	
	@Override
	public void add(Role aRole) {
		try{
			this.session().saveOrUpdate(aRole);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Role is not unique.", e);
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Role> allSimilarlyNamedRoles(String aName, int aStart,
			int aLimit) {
		logger.debug("allSimilarlyNamedRoles");
		
		if(aName.endsWith("%")){
			throw new IllegalArgumentException("Name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.Role as _obj_ "
				+ "where _obj_.name like :aName ");
		query.setString("aName", aName + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}
	
	@Override
	public long allSimilarlyNamedRolesSize(String aName) {
		logger.debug("allSimilarlyNamedRoles");
		
		if(aName.endsWith("%")){
			throw new IllegalArgumentException("Name prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.security.domain.model.Role as _obj_ "
				+ "where _obj_.name like :aName ");
		query.setString("aName", aName + "%");
		
		return (Long)query.uniqueResult();
	}

	
	@Override
	public Role roleWithCode(String aCode) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.Role as _obj_ "
				+ "where _obj_.code = :aCode ");
		query.setString("aCode", aCode);
		return (Role) query.uniqueResult();
	}

	@Override
	public void remove(Role aRole) {
		this.session().delete(aRole);
	}

}
