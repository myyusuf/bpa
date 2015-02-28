package id.co.oriza.bpa.security.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.security.domain.model.Group;
import id.co.oriza.bpa.security.domain.model.GroupRepository;

import java.util.List;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;

public class HibernateGroupRepository extends AbstractHibernateSession implements GroupRepository{

	@SuppressWarnings("unchecked")
	@Override
	public List<Group> all(int start, int limit) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.Group as _obj_ ");
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();
	}

	@Override
	public void add(Group group) {
		try{
			this.session().saveOrUpdate(group);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Group is not unique.", e);
		}
		
	}

	@Override
	public long allSize() {
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.security.domain.model.Group as _obj_ ");
		return ((Long)query.uniqueResult()).intValue();
	}

	@Override
	public Group existingGroup(String code) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.Group as _obj_ "
				+ "where _obj_.code = :code ");
		query.setString("code", code);
		return (Group) query.uniqueResult();
	}

	@Override
	public void remove(Group group) {
		this.session().delete(group);
		
	}

}
