package beans;

import java.io.Serializable;
import java.util.List;

import enums.Gender;
import enums.UserType;

public class User implements Serializable {
	
	private String username;
	private String password;
	private String name;
	private String surname;
	private Gender gender;
	private String dateOfBirth;
	private UserType userType;
	private List<Training> trainingsHistory;
	private String fee;
	private String sportsObject;
	private List<String> visitedSportsObjects;
	private int points;
	private CustomerType customerType;
	private boolean deleted;
	
	public User() {
		super();
	}

	public User(String username, String password, String name, String surname, Gender gender, String dateOfBirth,
			UserType userType, List<Training> trainingsHistory, String fee, String sportsObject,
			List<String> visitedSportsObjects, int points, CustomerType customerType, boolean deleted) {
		super();
		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.userType = userType;
		this.trainingsHistory = trainingsHistory;
		this.fee = fee;
		this.sportsObject = sportsObject;
		this.visitedSportsObjects = visitedSportsObjects;
		this.points = points;
		this.customerType = customerType;
		this.deleted = deleted;
	}

	public String getUsername() {
		return username;
	}



	public void setUsername(String username) {
		this.username = username;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public String getSurname() {
		return surname;
	}



	public void setSurname(String surname) {
		this.surname = surname;
	}



	public Gender getGender() {
		return gender;
	}



	public void setGender(Gender gender) {
		this.gender = gender;
	}



	public String getDateOfBirth() {
		return dateOfBirth;
	}



	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}



	public UserType getUserType() {
		return userType;
	}



	public void setUserType(UserType userType) {
		this.userType = userType;
	}



	public List<Training> getTrainingsHistory() {
		return trainingsHistory;
	}



	public void setTrainingsHistory(List<Training> trainingsHistory) {
		this.trainingsHistory = trainingsHistory;
	}



	public String getFee() {
		return fee;
	}



	public void setFee(String fee) {
		this.fee = fee;
	}



	public String getSportsObject() {
		return sportsObject;
	}



	public void setSportsObject(String sportsObject) {
		this.sportsObject = sportsObject;
	}



	public int getPoints() {
		return points;
	}



	public void setPoints(int points) {
		this.points = points;
	}

	public CustomerType getCustomerType() {
		return customerType;
	}



	public void setCustomerType(CustomerType customerType) {
		this.customerType = customerType;
	}

	public List<String> getVisitedSportsObjects() {
		return visitedSportsObjects;
	}

	public void setVisitedSportsObjects(List<String> visitedSportsObjects) {
		this.visitedSportsObjects = visitedSportsObjects;
	}
	

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	private static final long serialVersionUID = 6640936480584723344L;

}
