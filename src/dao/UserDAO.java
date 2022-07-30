package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.SportsObject;
import beans.User;

public class UserDAO {
	private List<User> users;
	//private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\users.json";
	private String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\users.json";
	
	public UserDAO() {
		users = new ArrayList<User>();
		loadUsers();
	}
	
	public List<User> findAll(){
		return users; 
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
	
	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), users);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void setObjectToManager(String username, SportsObject sportObject) {
		for (User user : users) {
			if (username.equals(user.getUsername())) {
				user.setSportsObject(sportObject);
				save();
			}
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
	
}
