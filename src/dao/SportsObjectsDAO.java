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
	
	private void loadSportsObjects() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			sportsObjects = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), SportsObject[].class)));
		} catch (JsonParseException e) {
			e.printStackTrace();
			System.out.println("greska1");
		} catch (JsonMappingException e) {
			e.printStackTrace();
			System.out.println("greska2 s");
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("greska3");
		}
	}
}
