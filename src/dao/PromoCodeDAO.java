package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.PromoCode;
import beans.SportsObject;
import beans.Training;

public class PromoCodeDAO {
	private List<PromoCode> promoCodes;
	//public String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\promoCodes.json";
	public String pathToFile ="C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\promoCodes.json";
	
	public PromoCodeDAO() {
		promoCodes = new ArrayList<PromoCode>();
		load();	
	}

	public List<PromoCode> findAll(){
		 List<PromoCode> list = new ArrayList<PromoCode>();
		 for(PromoCode p : promoCodes) {
			if (p.isDeleted() == false) {
				list.add(p);
			}
		 }
		return list;  
	}
	
	public void add(PromoCode promoCode) {
		promoCodes.add(promoCode);
	}
	
	public int findByCode(String code) {

		for (PromoCode promoCode : promoCodes) {
			if(promoCode.getCode().equals(code)) {
				LocalDate date = LocalDate.parse(promoCode.getExpirationDate());
				LocalDate now = LocalDate.now();
				int compareValue = date.compareTo(now);
				if(promoCode.getUsesLeft() > 0 && compareValue > 0)
				return promoCode.getDiscount();
			}
		}
		return 0;
	}
	
	public void delete(String code) {
		for (PromoCode promoCode : promoCodes) {
			if (promoCode.getCode().equals(code)) {
				promoCode.setDeleted(true);
			}
		}
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
