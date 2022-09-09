package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.SportsObject;
import beans.Training;

public class TrainingDAO {
	private List<Training> trainings;
	public String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\trainings.json";
	//public String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\trainings.json";
	
	public TrainingDAO() {
		trainings = new ArrayList<Training>();
		load();	
	}
	
	public List<Training> findAll(){
		 List<Training> foundTrainings = new ArrayList<Training>();
		 for(Training t : trainings) {
			if (t.isDeleted() == false) {
				foundTrainings.add(t);
			}
		 }
		return foundTrainings;  
	}
	
	public List<Training> findForSportObject(String sportObject){
		 List<Training> foundTrainings = new ArrayList<Training>();
		 for(Training t : trainings) {
			if (t.getSportsObject().equals(sportObject)) {
				if (t.isDeleted() == false)
					foundTrainings.add(t);
			}
		 }
		return foundTrainings; 
	}
	
	public List<Training> findForCoach(String coach){
		 List<Training> trainingsForCoach = new ArrayList<Training>();
		 for(Training t : trainings) {
			if (t.getCoach().equals(coach)) {
				trainingsForCoach.add(t);
			}
		 }
		return trainingsForCoach;
	}
	
	public void add(Training training) {
		trainings.add(training);
	}
	public Training update(String name, Training training) {
		for(Training t : trainings) {
			if(t.getName().equals(name)) {
				t.setName(training.getName());
				t.setType(training.getType());
				t.setDuration(training.getDuration());
				t.setDescription(training.getDescription());
				t.setPhoto(training.getPhoto());
				t.setCoach(training.getCoach());
				return t;
			}
		}
		return null;
	}

	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), trainings);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	private void load() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			trainings = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), Training[].class)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public boolean validateDate(int id) {
		for (Training training : trainings) {
			if (training.getId() == id) {
				String str = training.getDateTime();
				DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
				LocalDateTime dateTime = LocalDateTime.parse(str, formatter);

				LocalDateTime now = LocalDateTime.now(); //datum otkazivanja
				int compareValue = now.compareTo(dateTime.minusDays(2)); //uslov da mora da se otkaze dva dana ranije
				if(compareValue < 0) {
					return true;
				}
			}
		}
		return false;
	}
	
	public List<Training> search(String input){
		List<Training> foundObjects = new ArrayList<Training>();
		for (Training tr : trainings) {
			if (tr.getSportsObject().contains(input)) {
				foundObjects.add(tr);
			}
		}
		return foundObjects;
	}
	
	public Training getById(int id) {
		for (Training tr : trainings) {
			if (tr.getId() == id) {
				return tr;
			}
		}
		return null;
	}

	public List<String> getCoachesBySO(String object) {
		List<String> coaches = new ArrayList<String>();
	    for (Training t : trainings) {
	    	if(t.getSportsObject().equals(object)) {
	    			if(!coaches.contains(t.getCoach())) {
	    				coaches.add(t.getCoach());	
	    			}
	    		}
	    	}
	    return coaches;
	
	public void delete(int id){
		for (Training training : trainings) {
			if (training.getId() == id) {
				training.setDeleted(true);
			}
		}
	}
}
