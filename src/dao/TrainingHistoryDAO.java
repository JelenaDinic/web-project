package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.Fee;
import beans.SportsObject;
import beans.Training;
import beans.TrainingHistory;
import enums.Status;

public class TrainingHistoryDAO {
	private List<TrainingHistory> trainingHistory;
	//public String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\trainingHistory.json";
	public String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\trainingHistory.json";
	
	public TrainingHistoryDAO() {
		trainingHistory = new ArrayList<TrainingHistory>();
		load();	
	}
	
	private void load() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			trainingHistory = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), TrainingHistory[].class)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public int generateId() {
		Random rand = new Random(); 
		int min = 1;
		int max = 10000;
		int randomNum = rand.nextInt((max - min) + 1) + min;
		for (TrainingHistory th : trainingHistory) {
			if (th.getId() == randomNum) {
				 return generateId();
			}
		}
		return randomNum;
	}
	
	public List<TrainingHistory> findAll(){
		return trainingHistory;
	}
	
	public void add(TrainingHistory training) {
		trainingHistory.add(training);
	}
	
	public List<TrainingHistory> findForCoach(String coach){
		 List<TrainingHistory> trainingsForCoach = new ArrayList<TrainingHistory>();
		 for(TrainingHistory t : trainingHistory) {
			if (t.getCoach().equals(coach)) {
				if (t.isDeleted() == false) {
					trainingsForCoach.add(t);
				}
			}
		 }
		return trainingsForCoach;
	}
	
	public List<TrainingHistory> findForCustomer(String username){
		 List<TrainingHistory> trainingsForCustomer = new ArrayList<TrainingHistory>();
		 for(TrainingHistory t : trainingHistory) {
			if (t.getUser().equals(username)) {
				if (t.isDeleted() == false) {
					trainingsForCustomer.add(t);
				}
			}
		 }
		return trainingsForCustomer;
	}
	
	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), trainingHistory);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void delete(int id){ 
		for (TrainingHistory th : trainingHistory) {
			if (th.getId() == id) {
				th.setDeleted(true);
			}
		}
	}
	
}
