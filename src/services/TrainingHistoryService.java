package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Fee;
import beans.TrainingHistory;
import dao.FeeDAO;
import dao.TrainingHistoryDAO;

@Path("trainingHistory")
public class TrainingHistoryService {
	@Context
	ServletContext ctx;
	
	public TrainingHistoryService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("trainingHistoryDAO") == null) {
			ctx.setAttribute("trainingHistoryDAO", new TrainingHistoryDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getTrainings(){
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("trainingHistoryDAO");
		return dao.findAll();
	}
	@GET
	@Path("/generate-id")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int generateId(){
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("trainingHistoryDAO");
		return dao.generateId();
	}
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(TrainingHistory triningHistory) {
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("trainingHistoryDAO");
		dao.add(triningHistory);
		dao.save();
		return Response.status(200).build();
	}
	@GET
	@Path("/delete/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteTraining(@PathParam("input") int input){
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("trainingHistoryDAO");
		dao.delete(input);
		dao.save();
	}
	
	@GET
	@Path("/{coach}")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<TrainingHistory> getTrainingsForCoach(@PathParam("coach") String coach){
		TrainingHistoryDAO dao = (TrainingHistoryDAO) ctx.getAttribute("trainingHistoryDAO");
		return dao.findForCoach(coach);
	}
}
