package services;

import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
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

import beans.Fee;
import beans.SportsObject;
import beans.User;
import dao.FeeDAO;
import dao.SportsObjectsDAO;
import dao.UserDAO;

@Path("sportsObject")
public class SportsObjectService {
	
	@Context
	ServletContext ctx;
	
	public SportsObjectService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("sportsObjectDAO") == null) {
			ctx.setAttribute("sportsObjectDAO", new SportsObjectsDAO());
		}
		if (ctx.getAttribute("feeDAO") == null) {
			ctx.setAttribute("feeDAO", new FeeDAO());
		}
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public List<SportsObject> getSportsObjects(){
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO");
		return dao.findAll();
	}
	@GET
	@Path("/fee/generate-id")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public String generateFeeId(){
		FeeDAO dao = (FeeDAO) ctx.getAttribute("feeDAO");
		return dao.generateId();
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(SportsObject sportObject) {
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO");
		dao.add(sportObject);
		dao.save();
		return Response.status(200).build();
	}
	
	@POST
	@Path("/search")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<SportsObject> searchSportsObjects(SportsObject so){
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO");
		return dao.search(so);
	}
	
	@GET
	@Path("/delete/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteSportsObjects(@PathParam("name") String name){
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO");
		dao.delete(name);
		dao.save();
	}
	
	@GET
	@Path("/find/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public SportsObject findByName(@PathParam("input") String input){
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO");
		return dao.findByName(input);
	}

	@GET
	@Path("/sportsObj/{name}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Object setObject(@PathParam("name") String name, @Context HttpServletRequest request) {
		HttpSession sesija = request.getSession();
		sesija.removeAttribute("name");
		sesija.setAttribute("name", name);
		return sesija.getAttribute("name");
	}
	@GET
	@Path("/object")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public SportsObject currentObject( @Context HttpServletRequest request) {
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO"); 
		return dao.findByName(request.getSession().getAttribute("name").toString());
	}
	@GET
	@Path("/isLoggedIn")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User isLoggedIn( @Context HttpServletRequest request) {
		if(request.getSession().getAttribute("user") !=null) {
			return (User)request.getSession().getAttribute("user");
		}
		return null;
	}
	@POST
	@Path("/fee")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response newFee(Fee fee) {
		FeeDAO dao = (FeeDAO) ctx.getAttribute("feeDAO");
		dao.add(fee);
		dao.save();
		return Response.status(200).build();
	}
	@GET
	@Path("/check-fee/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int checkFee(@PathParam("id") String id) {
		FeeDAO dao = (FeeDAO) ctx.getAttribute("feeDAO");
		return dao.checkFee(id);
	}
	@GET
	@Path("/fee-validity/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean feeValidity(@PathParam("id") String id) {
		FeeDAO dao = (FeeDAO) ctx.getAttribute("feeDAO");
		return dao.feeValidity(id);
	}
	@GET
	@Path("/fee/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int calculatePoints(@PathParam("username") String username) {
		FeeDAO dao = (FeeDAO) ctx.getAttribute("feeDAO");
		return dao.calculatePoints(username);
	}
	@PUT
	@Path("/fee/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("id") String id, Fee fee) {
		FeeDAO dao = (FeeDAO) ctx.getAttribute("feeDAO");
		dao.update(id, fee);
		dao.save();
	}
	
	@PUT
	@Path("/averageMark")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateAverageMark(SportsObject so) {
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO");
		dao.updateAverageMark(so);
		dao.save();
	}
}
