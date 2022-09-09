package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.SportsObject;
import beans.Training;
import dao.SportsObjectsDAO;
import dao.TrainingDAO;
import dao.TrainingHistoryDAO;

@Path("training")
public class TrainingService {
	@Context
	ServletContext ctx;
	
	public TrainingService() {
	}
	
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("trainingDAO") == null) {
			ctx.setAttribute("trainingDAO", new TrainingDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getTrainings(){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/{coach}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getTrainingsForCoach(@PathParam("coach") String coach){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.findForCoach(coach);
	}
	
	@GET
	@Path("/delete/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public void deleteTraining(@PathParam("id") int id){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		TrainingHistoryDAO daoh = (TrainingHistoryDAO) ctx.getAttribute("trainingHistoryDAO");
		dao.delete(id);
		dao.save();
	}
	
	@GET
	@Path("/object/{sportObject}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Training> getTrainingsForSportObject(@PathParam("sportObject") String sportObject){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.findForSportObject(sportObject);
	}
	
	@GET
	@Path("/validate/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean validateDate(@PathParam("id") int id){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.validateDate(id);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(Training training) {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		dao.add(training);
		dao.save();
		return Response.status(200).build();
	}
	@PUT
	@Path("/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("name") String name, Training training) {
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		dao.update(name, training);
		dao.save();
	}
	
	@GET
	@Path("/search/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Training> searchTrainings(@PathParam("input") String input){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.search(input);
	}
	
	@GET
	@Path("/id/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Training getById(@PathParam("id") int id){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.getById(id);
	}
	
	@GET
	@Path("/coaches/{object}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<String> getCoachesBySO(@PathParam("object") String object){
		TrainingDAO dao = (TrainingDAO) ctx.getAttribute("trainingDAO");
		return dao.getCoachesBySO(object);
	}
	
	
}
