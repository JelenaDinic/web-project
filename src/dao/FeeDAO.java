package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Fee;
import beans.TrainingHistory;
import beans.User;
import enums.Status;

public class FeeDAO {
	private List<Fee> fees;
	private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\fees.json";
	//private String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\fees.json";
	
	public FeeDAO(){
		fees = new ArrayList<Fee>();
		load();
	}
	
	public List<Fee> findAll(){
		return fees; 
	}
	
	public void add(Fee fee) {
		for(Fee f : fees) {
			if(f.getCustomer().equals(fee.getCustomer())) {
				f.setStatus(Status.INACTIVE);
			}
		}
		fees.add(fee);
	}
	
	public int calculatePoints(String username) {
		for(Fee f: fees) {
			if(f.getCustomer().equals(username) && f.getStatus().equals(Status.ACTIVE)) {
				if(f.getNumberOfEntries()/3 > f.getUsedEntries()) {
					return (int) Math.round(((double)f.getPrice())/1000 * ((double)f.getUsedEntries())) - (int) Math.round(((double)f.getPrice())/1000 * 133 * 4);
				}
				else {
					return (int) Math.round(((double)f.getPrice())/1000 * ((double)f.getUsedEntries()));
				}
					
			}
		}
		return 0;
	}
	public boolean feeValidity(String id) {
		for(Fee f : fees) {
			if(f.getId().equals(id)) {
				LocalDate date = LocalDate.parse(f.getDateTimeOfValidity());
				LocalDate now = LocalDate.now();
				int compareValue = now.compareTo(date);
				if(compareValue > 0) {
					return false; //date je prije sadasnjeg trenutka
				}
			}
		}
		return true;
	}
	public Fee update(String id, Fee fee) {
		for(Fee f : fees) {
			if(f.getId().equals(id)) {
				f.setUsedEntries(fee.getUsedEntries());
				return f;
			}
		}
		return null;
	}
	public int checkFee(String id) {
		for(Fee f : fees) {
			if(f.getId().equals(id) && f.getStatus().equals(Status.ACTIVE) && f.getUsedEntries() < f.getNumberOfEntries()) {
				return f.getUsedEntries();
			}
		}
		return -1;
	}
	private void load() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			fees = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), Fee[].class)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), fees);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public String generateId() {
		Random rand = new Random(); 
		int min = 0;
		int max = 9;
		String id = "";
		for (int i = 0; i < 9; i++) {
			int randomNum = rand.nextInt((max - min) + 1) + min;
			id.concat(Integer.toString(randomNum));
		}
		return id;
	}
}
