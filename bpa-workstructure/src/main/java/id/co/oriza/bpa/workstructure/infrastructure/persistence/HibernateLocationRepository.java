package id.co.oriza.bpa.workstructure.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.workstructure.domain.model.Location;
import id.co.oriza.bpa.workstructure.domain.model.LocationRepository;

import java.util.Collection;

import javax.validation.ConstraintViolationException;

import org.hibernate.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateLocationRepository extends AbstractHibernateSession implements LocationRepository{
	
	final Logger logger = LoggerFactory.getLogger(HibernateLocationRepository.class);

	@SuppressWarnings("unchecked")
	@Override
	public Collection<Location> allSimilarlyCodedOrAddressed(String aCode,
			String anAddress, int aStart, int aLimit) {
		
		logger.debug("allSimilarlyCodedOrAdressed");
		
		if(aCode.endsWith("%") || anAddress.endsWith("%")){
			throw new IllegalArgumentException("Code or address prefixes must not include %");
		}
		
		Query query = this.session().createQuery("from id.co.oriza.bpa.workstructure.domain.model.Location as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.address like :anAddress ");
		query.setString("aCode", aCode + "%");
		query.setString("anAddress", anAddress + "%");
		query.setFirstResult(aStart);
		query.setMaxResults(aLimit);
		
		return query.list();
	}

	@Override
	public Location withCode(String aCode) {
		Query query = this.session().createQuery("from id.co.oriza.bpa.workstructure.domain.model.Location as _obj_ "
				+ "where _obj_.code = :aCode ");
		query.setString("aCode", aCode);
		return (Location) query.uniqueResult();
	}

	@Override
	public void add(Location aLocation) {
		try{
			this.session().saveOrUpdate(aLocation);
		}catch(ConstraintViolationException e){
			throw new IllegalStateException("Location is not unique.", e);
		}
		
	}

	@Override
	public void remove(Location location) {
		this.session().delete(location);
	}

	@Override
	public int allSimilarlyCodedOrAddressedLocationsSize(String aCode,
			String anAddress) {
		if(aCode.endsWith("%") || anAddress.endsWith("%")){
			throw new IllegalArgumentException("code or address prefixes must not include %");
		}
		
		Query query = this.session().createQuery("select count(_obj_) from id.co.oriza.bpa.workstructure.domain.model.Location as _obj_ "
				+ "where _obj_.code like :aCode "
				+ "or _obj_.address like :anAddress ");
		query.setString("aCode", aCode + "%");
		query.setString("anAddress", anAddress + "%");
		
		return ((Long) query.uniqueResult()).intValue();
	}

}
