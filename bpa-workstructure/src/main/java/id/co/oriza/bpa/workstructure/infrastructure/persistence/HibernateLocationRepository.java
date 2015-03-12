package id.co.oriza.bpa.workstructure.infrastructure.persistence;

import id.co.oriza.bpa.base.persistence.AbstractHibernateSession;
import id.co.oriza.bpa.workstructure.domain.model.Location;
import id.co.oriza.bpa.workstructure.domain.model.LocationRepository;

import java.util.Collection;

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

}
