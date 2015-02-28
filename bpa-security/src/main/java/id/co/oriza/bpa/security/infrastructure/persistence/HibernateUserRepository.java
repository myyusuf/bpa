package id.co.oriza.bpa.security.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.security.domain.model.User;
import id.co.oriza.bpa.security.domain.model.UserRepository;

import java.util.List;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;

public class HibernateUserRepository extends AbstractHibernateSession implements UserRepository{

	@SuppressWarnings("unchecked")
	@Override
	public List<User> all(int start, int limit) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.User as _obj_ ");
		query.setFirstResult(start);
		query.setMaxResults(limit);
		return query.list();
	}

	@Override
	public long allSize() {
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.security.domain.model.User as _obj_ ");
		return ((Long)query.uniqueResult()).intValue();
	}

	@Override
	public void add(User user) {
		try{
			this.session().saveOrUpdate(user);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("User is not unique.", e);
		}
		
	}

	@Override
	public User userWithUserId(String userId) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.security.domain.model.User as _obj_ "
				+ "where _obj_.userId = :userId ");
		query.setString("userId", userId);
		return (User) query.uniqueResult();
	}

	@Override
	public void remove(User user) {
		this.session().delete(user);
	}

}
