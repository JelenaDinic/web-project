package beans;

import enums.TrainingType;

public class Training {
	private String name;
	private TrainingType type;
	private SportsObject sportsObject;
	private int duration;
	private User coach;
	private String description;
	private String photo;
	
	public Training() {
		super();
	}

	public Training(String name, TrainingType type, SportsObject sportsObject, int duration, User coach,
			String description, String photo) {
		super();
		this.name = name;
		this.type = type;
		this.sportsObject = sportsObject;
		this.duration = duration;
		this.coach = coach;
		this.description = description;
		this.photo = photo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public TrainingType getType() {
		return type;
	}

	public void setType(TrainingType type) {
		this.type = type;
	}

	public SportsObject getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(SportsObject sportsObject) {
		this.sportsObject = sportsObject;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public User getCoach() {
		return coach;
	}

	public void setCoach(User coach) {
		this.coach = coach;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}
	
}
