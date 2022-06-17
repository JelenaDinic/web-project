package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
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
	private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\users.json";
	
	public UserDAO() {
		users = new ArrayList<User>();
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
}
