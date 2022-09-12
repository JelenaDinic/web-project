package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.CustomerType;
import beans.SportsObject;
import beans.User;
import enums.UserType;

public class UserDAO {
	private List<User> users;
	//private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\users.json";
	private String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\users.json";
	
	public UserDAO() {
		users = new ArrayList<User>();
		loadUsers();
	}
	
	public List<User> findAll(){
		List<User> allUsers = new ArrayList<User>();
		for (User user : users) {
			if(user.isDeleted() == false) {
				allUsers.add(user);
			}
		}
		return allUsers;
	}
	
	public boolean validateUsername(String username) {
		for (User user : users) {
			if (user.getUsername().equals(username)) {
				return false;
			}
		}
		return true;
	}
	
	public void deleteSportObjectFromManager(String name) {
		for (User user : users) {
			String tmp = "";
			if (user.getSportsObject() == null) {
				continue;
			}
			if (user.getSportsObject().equals(name)) {
				user.setSportsObject(null);
			}
		}
	}
	
	public void deleteSportObjectFromCustomer(String name) {
		for (User user : users) {
			if (user.getVisitedSportsObjects() == null) {
				continue;
			}
			for (String so : user.getVisitedSportsObjects()) {
				if (so.equals(name)) {
					user.getVisitedSportsObjects().remove(so);
				}
			}
		}
	}
	
	public List<User> findFreeManagers(){
		List<User> freeManagers = new ArrayList<User>();
		for (User user : users) {
			if(user.getUserType().toString().equals("MANAGER")) {
				if (user.getSportsObject() == null)
					freeManagers.add(user);
			}
		}
		return freeManagers;
	}
	public void add(User user) {
		users.add(user);
	}
	
	public List<User> search(String input){
		List<User> foundUsers = new ArrayList<User>();
		for (User u : users) {
			if (u.getName().contains(input))
				foundUsers.add(u);
			else if(u.getSurname().toString().contains(input))
				foundUsers.add(u);
			else if(u.getUsername().toString().contains(input))
				foundUsers.add(u);			
		}
		return foundUsers;
	}
	
	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), users);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private void loadUsers() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			users = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), User[].class)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public User login(String username, String password) {
		for (User u : users) {
			if (u.getUsername().equals(username)) {
				if (u.getPassword().equals(password)) {
					return u;
				}
			}
		}
		return null;
	}
	public User update(String username, User user) {
		for(User u : users) {
			if(u.getUsername().equals(username)) {
				u.setUsername(user.getUsername());
				u.setPassword(user.getPassword());
				u.setName(user.getName());
				u.setSurname(user.getSurname());
				u.setDateOfBirth(user.getDateOfBirth());
				u.setGender(user.getGender());
				u.setFee(user.getFee());
				u.setUserType(user.getUserType());
				u.setPoints(user.getPoints());
				u.setVisitedSportsObjects(user.getVisitedSportsObjects());
				u.setCustomerType(updateCustomerType(user.getPoints()));
				return u;
			}
		}
		return null;
	}
	
	public CustomerType updateCustomerType(int points) {
		if(points >= 3000)
			return new CustomerType("ZLATNI", 0.2, 3000);
		else if (2000 <= points && points < 3000) 
			return new CustomerType("SREBRNI", 0.1, 2000);
		else if (1000 <= points && points < 2000)
			return new CustomerType("BRONZANI", 0.05, 1000);
		else 
			return null;
	}
	
	public List<User> findAllCoaches(){
		List<User> coaches = new ArrayList<User>();
		for(User user : users) {
			if(user.getUserType() == UserType.COACH) {
				coaches.add(user);
			}
		}
		return coaches;
	}
	
	public void addSportObject(String username, SportsObject obj) {
		for (User u : users) {
			if (u.getUsername().equals(username)) {
				u.setSportsObject(obj.getName());
			}
		}
	}

	public List<String> getCustomersBySO(String object) {
		List<String> customers = new ArrayList<String>();
		for(User u : users) {
			if(u.getVisitedSportsObjects() != null) {
				if(u.getVisitedSportsObjects().contains(object) && u.getUserType().equals(UserType.CUSTOMER))
					customers.add(u.getUsername());
			}
		}
		return customers;
	}
	
	public void delete(String username) {
		for (User user : users) {
			if (user.getUsername().equals(username)) {
				user.setDeleted(true);
			}
		}
	}
}
