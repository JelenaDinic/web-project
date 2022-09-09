package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.TrainingHistory;

public class CommentDAO {
	private List<Comment> comments;
	private String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\comments.json";
	//private String pathToFile = "C:\\Users\\HP\\Desktop\\veb\\WEB-Projekat\\WebContent\\comments.json";
	
	public CommentDAO() {
		comments = new ArrayList<Comment>();
		loadComments();
	}
	
	private void loadComments() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			comments = new ArrayList<>(Arrays.asList(mapper.readValue(Paths.get(pathToFile).toFile(), Comment[].class)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public int generateId() {
		Random rand = new Random(); 
		int min = 1;
		int max = 10000;
		int randomNum = rand.nextInt((max - min) + 1) + min;
		for (Comment th : comments) {
			if (th.getId() == randomNum) {
				 return generateId();
			}
		}
		return randomNum;
	}
	
	public double getAverageMarkForSportObj(String name) {
		double averageMark= 1;
		double sumOfMarks= 0;
		int br = 0;
		for (Comment comment : comments) {
			if (comment.getSportsObject().equals(name)) {
				if (comment.isDeleted() == false) {
					if (comment.isApproved() == true) {
						sumOfMarks = sumOfMarks + comment.getMark();
						br = br + 1;
					}
				}
			}
		}
		averageMark = sumOfMarks/br;
		return averageMark;
	}
	
	public List<Comment> findAll(){
		List<Comment> foundComments = new ArrayList<Comment>();
		for (Comment comment : comments) {
			if (comment.isDeleted() == false) {
				foundComments.add(comment);
			}
		}
		return foundComments; 
	}
	
	public List<Comment> findApproved(String name){
		List<Comment> foundComments = new ArrayList<Comment>();
		for (Comment comment : comments) {
			if (comment.getSportsObject().equals(name)) {
				if(comment.isApproved() == true) {
					foundComments.add(comment);
				}
			}
		}
		return foundComments;
	}
	
	public void approve(int id){ 
		for (Comment comment : comments) {
			if (comment.getId() == id) {
				comment.setApproved(true);
			}
		}
	}
	
	public void delete(int id){ 
		for (Comment comment : comments) {
			if (comment.getId() == id) {
				comment.setDeleted(true);
			}
		}
	}
	
	public void save() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			mapper.writeValue(Paths.get(pathToFile).toFile(), comments);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void add(Comment comment) {
		comments.add(comment);
	}
}
