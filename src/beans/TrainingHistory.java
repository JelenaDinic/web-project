package beans;

import java.time.LocalDate;

public class TrainingHistory {
	private LocalDate joinDate;
	private String training;
	private String user;
	private String coach;
	
	public TrainingHistory(LocalDate joinDate, String training, String user, String coach) {
		super();
		this.joinDate = joinDate;
		this.training = training;
		this.user = user;
		this.coach = coach;
	}

	public LocalDate getJoinDate() {
		return joinDate;
	}

	public void setJoinDate(LocalDate joinDate) {
		this.joinDate = joinDate;
	}

	public String getTraining() {
		return training;
	}

	public void setTraining(String training) {
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
	
	
	
}
