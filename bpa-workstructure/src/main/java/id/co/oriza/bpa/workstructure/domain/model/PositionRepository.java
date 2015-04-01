package id.co.oriza.bpa.workstructure.domain.model;

import java.util.Collection;

public interface PositionRepository {
	
	public Collection<Position> allSimilarlyCodedOrNamed(String aCode, String aName, int aStart, int aLimit);

	public Position withCode(String positionCode);

	public void add(Position position);

	public int allSimilarlyCodedOrNamedPositionsSize(String aCode, String aName);

	public void remove(Position position);

}
