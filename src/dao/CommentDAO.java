package dao;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.SportsObject;
import beans.User;

public class CommentDAO {
	private List<Comment> comments;
	private String pathToFile = "C:\\Users\\Korisnik\\Desktop\\WEB\\PROJEKAT\\WEB-Projekat\\WebContent\\comments.json";
	
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
