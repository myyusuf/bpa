package id.co.oriza.bpa.workstructure.domain.model;

import java.util.Collection;

public interface LocationRepository {
	
	public Collection<Location> allSimilarlyCodedOrAddressed(String aCode, String anAddress, int aStart, int aLimit);

	public Location withCode(String locationCode);

}
