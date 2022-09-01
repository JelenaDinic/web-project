package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.SportsObject;
import beans.User;
import enums.ObjectType;

public class SportsObjectsDAO {
	
	private List<SportsObject> sportsObjects;
	public String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\sportObjects.json";
	//public String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\sportObjects.json";
	
	public SportsObjectsDAO() {
		sportsObjects = new ArrayList<SportsObject>();
		loadSportsObjects();
		
	}
	
	public List<SportsObject> findAll(){
		return sportsObjects; 
	}
	
	public void add(SportsObject sportObject) {
		sportsObjects.add(sportObject);
	}
	
	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), sportsObjects);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<SportsObject> search(String input){
		List<SportsObject> foundObjects = new ArrayList<SportsObject>();
		for (SportsObject so : sportsObjects) {
			if (so.getName().contains(input))
				foundObjects.add(so);
			else if(so.getType().toString().contains(input))
				foundObjects.add(so);
			else if(so.getLocation().getAddress().getCity().contains(input))
				foundObjects.add(so);
			else if(String.valueOf(so.getAverageGrade()).equals(input))
				foundObjects.add(so);
		}
		return foundObjects;
	}
	
	private void loadSportsObjects() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			sportsObjects = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), SportsObject[].class)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	public SportsObject findByName(String sportsObjectName) {

		for (SportsObject sportsObject : sportsObjects) {
			if(sportsObject.getName().equals(sportsObjectName)) {
				return sportsObject;
			}
		}
		return null;
	}
}
