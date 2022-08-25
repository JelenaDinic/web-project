package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.PromoCode;

public class PromoCodeDAO {
	private List<PromoCode> promoCodes;
	public String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\promoCodes.json";
	
	
	public PromoCodeDAO() {
		promoCodes = new ArrayList<PromoCode>();
		//load();	
	}

	
	public void add(PromoCode promoCode) {
		promoCodes.add(promoCode);
	}

	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), promoCodes);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	private void load() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			promoCodes = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), PromoCode[].class)));
		} catch (IOException e) {
			e.printStackTrace();
		}
}
}
