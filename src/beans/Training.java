package beans;

import java.time.LocalDateTime;

import enums.TrainingType;

public class Training {
	private int id;
	private String name;
	private TrainingType type;
	private String sportsObject;
	private int duration;
	private String coach;
	private String description;
	private String photo;
	private String dateTime;
	private int price;
	private boolean deleted;
	
	public Training() {
		super();
	}

	public Training(int id, String name, TrainingType type, String sportsObject, int duration, String coach,
			String description, String photo, String dateTime, int price, boolean deleted) {
		super();
		this.id = id;
		this.name = name;
		this.type = type;
		this.sportsObject = sportsObject;
		this.duration = duration;
		this.coach = coach;
		this.description = description;
		this.photo = photo;
		this.dateTime = dateTime;
		this.price = price;
		this.deleted = deleted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
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

	public String getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(String sportsObject) {
		this.sportsObject = sportsObject;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getCoach() {
		return coach;
	}

	public void setCoach(String coach) {
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

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
}
