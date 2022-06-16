package beans;

import java.time.LocalDateTime;
import java.util.List;

import enums.ObjectType;

public class SportsObject {

	private String name;
	private ObjectType type;
	//private List<ContentType> contentTypes; ???
	private boolean status;
	public Location location;
	public String logo;
	public double averageGrade;
	private LocalDateTime startWorkingHour;
	private LocalDateTime endWorkingHour;
}
