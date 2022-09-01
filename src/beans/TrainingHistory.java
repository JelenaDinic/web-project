package beans;

import java.io.Serializable;
import java.time.LocalDate;

public class TrainingHistory implements Serializable{
	private int id;
	private String joinDate;
	private int training; //id
	private String user;
	private String coach;
	private boolean deleted;

	public TrainingHistory() {
		super();
		// TODO Auto-generated constructor stub
	}


	public TrainingHistory(int id, String joinDate, int training, String user, String coach, boolean deleted) {
		super();
		this.id = id;
		this.joinDate = joinDate;
		this.training = training;
		this.user = user;
		this.coach = coach;
		this.deleted = deleted;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}

	public int getTraining() {
		return training;
	}

	public void setTraining(int training) {
		this.training = training;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getCoach() {
		return coach;
	}

	public void setCoach(String coach) {
		this.coach = coach;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	
}
