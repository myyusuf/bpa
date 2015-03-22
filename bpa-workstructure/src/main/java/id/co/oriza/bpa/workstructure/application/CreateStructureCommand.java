package id.co.oriza.bpa.workstructure.application;

import java.util.List;

public class CreateStructureCommand {
	
	private List<CreateStructureModel> createStructureModels;

	public CreateStructureCommand(
			List<CreateStructureModel> createStructureModels) {
		super();
		this.createStructureModels = createStructureModels;
	}

	public List<CreateStructureModel> getCreateStructureModels() {
		return createStructureModels;
	}


}
