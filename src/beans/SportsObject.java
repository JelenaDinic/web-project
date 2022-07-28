package beans;

import java.util.List;

import enums.ContentType;
import enums.ObjectType;

public class SportsObject {

	private String name;
	private ObjectType type;
	private List<ContentType> content;
	private boolean status;
	public Location location;
	public String logo;
	public double averageGrade;
	private String startWorkingHour;
	private String endWorkingHour;
	
	public SportsObject() {
		super();
		// TODO Auto-generated constructor stub
	}

	public SportsObject(String name, ObjectType type, List<ContentType> content, boolean status, Location location,
			String logo, double averageGrade, String startWorkingHour, String endWorkingHour) {
		super();
		this.name = name;
		this.type = type;
		this.content = content;
		this.status = status;
		this.location = location;
		this.logo = logo;
		this.averageGrade = averageGrade;
		this.startWorkingHour = startWorkingHour;
		this.endWorkingHour = endWorkingHour;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ObjectType getType() {
		return type;
	}

	public void setType(ObjectType type) {
		this.type = type;
	}


	public List<ContentType> getContent() {
		return content;
	}

	public void setContent(List<ContentType> content) {
		this.content = content;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public double getAverageGrade() {
		return averageGrade;
	}

	public void setAverageGrade(double averageGrade) {
		this.averageGrade = averageGrade;
	}

	public String getStartWorkingHour() {
		return startWorkingHour;
	}

	public void setStartWorkingHour(String startWorkingHour) {
		this.startWorkingHour = startWorkingHour;
	}

	public String getEndWorkingHour() {
		return endWorkingHour;
	}

	public void setEndWorkingHour(String endWorkingHour) {
		this.endWorkingHour = endWorkingHour;
	}


	
}
