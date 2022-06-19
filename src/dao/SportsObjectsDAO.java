package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.SportsObject;
import enums.ObjectType;

public class SportsObjectsDAO {
	
	private List<SportsObject> sportsObjects;
	private String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\sportObjects.json";
	
	public SportsObjectsDAO() {
		sportsObjects = new ArrayList<SportsObject>();
		loadSportsObjects();
	}
	
	public List<SportsObject> findAll(){
		return sportsObjects; 
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
}
