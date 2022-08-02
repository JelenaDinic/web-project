package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

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
		return trainings; 
	}
	
	public List<Training> findForCoach(String coach){
		 List<Training> trainingsForCoach = new ArrayList<Training>();
		 System.out.println(coach);
		 System.out.println(trainings.size());
		 for(Training t : trainings) {
			System.out.println(t.getCoach());
			System.out.println(coach);
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
}
