package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.SportsObject;
import beans.TrainingHistory;
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
		List<SportsObject> foundObjects = new ArrayList<SportsObject>();
		for (SportsObject so : sportsObjects) {
			if (so.isDeleted() == false) {
				foundObjects.add(so);
			}
		}
		return foundObjects;
	}
	
	public void updateAverageMark(SportsObject sport) {
		SportsObject so = findByName(sport.getName());
		so.setAverageGrade(sport.getAverageGrade());
	}
	
	public void add(SportsObject sportObject) {
		sportsObjects.add(sportObject);
	}
	
	public void delete(String name) {
		for (SportsObject so : sportsObjects) {
			if (so.getName().equals(name)) {
				so.setDeleted(true);
			}
		}
	}
	
	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), sportsObjects);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public List<SportsObject> search(SportsObject sportObject){
		List<SportsObject> foundObjects = new ArrayList<SportsObject>();
		for (SportsObject so : sportsObjects) {
			if (!sportObject.getName().equals("")) {
				if (so.getName().contains(sportObject.getName())) {
					foundObjects.add(so);
					continue;
				}
			}
			if (!sportObject.getStartWorkingHour().equals("")) {
				if(so.getType().toString().contains(sportObject.getStartWorkingHour())){
					foundObjects.add(so);
					continue;
				}
			}
			if (!sportObject.getLocation().getAddress().getCity().equals("")) {
				if(so.getLocation().getAddress().getCity().contains(sportObject.getLocation().getAddress().getCity())){
					foundObjects.add(so);
					continue;
				}
			}
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
