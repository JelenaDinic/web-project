package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.User;

public class UserDAO {
	private List<User> users;
	private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\users.json";
	//private String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\users.json";
	
	public UserDAO() {
		users = new ArrayList<User>();
		loadUsers();
	}
	
	public List<User> findAll(){
		return users; 
	}
	public void add(User user) {
		users.add(user);
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
				System.out.println(u.getUsername());
				return u;
			}
		}
		return null;
	}
	
}
