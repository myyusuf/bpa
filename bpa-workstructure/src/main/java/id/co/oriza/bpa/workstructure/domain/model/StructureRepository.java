package id.co.oriza.bpa.workstructure.domain.model;

import java.util.Collection;

public interface StructureRepository {
	
	Collection<Structure> all(int aStart, int aLimit);

}
