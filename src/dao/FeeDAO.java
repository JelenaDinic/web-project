package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Fee;
import beans.User;
import enums.Status;

public class FeeDAO {
	private List<Fee> fees;
	private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\fees.json";
	
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
				return (int) Math.round(f.getPrice()/1000 * f.getUsedEntries());
			}
		}
		return 0;
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
}
