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

import beans.Comment;
import beans.SportsObject;
import beans.User;
import dao.CommentDAO;
import dao.FeeDAO;
import dao.SportsObjectsDAO;
import dao.UserDAO;

@Path("comment")
public class CommentService {

	@Context
	ServletContext ctx;
	
	public CommentService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("commentDAO") == null) {
			ctx.setAttribute("commentDAO", new CommentDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> getComments(){
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/name/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Comment> getApprovedCommentsForObject(@PathParam("input") String input){
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.findApproved(input);
	}
	
	@GET
	@Path("/averageMark/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public double getAverageMark(@PathParam("name") String name){
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.getAverageMarkForSportObj(name);
	}
	
	@GET
	@Path("/generate-id")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int generateCommentId(){
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		return dao.generateId();
	}
	
	@GET
	@Path("/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void approveComment(@PathParam("input") int input){
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		dao.approve(input);
		dao.save();
	}
	
	@GET
	@Path("/delete/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteComment(@PathParam("input") int input){
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		dao.delete(input);
		dao.save();
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(Comment comment) {
		CommentDAO dao = (CommentDAO) ctx.getAttribute("commentDAO");
		dao.add(comment);
		dao.save();
		return Response.status(200).build();
	}
	
}
