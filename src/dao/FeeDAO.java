package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Fee;

public class FeeDAO {
	private List<Fee> fees;
	private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\fees.json";
	
	public FeeDAO(){
		fees = new ArrayList<Fee>();
		load();
	}
	
	public void add(Fee fee) {
		fees.add(fee);
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
