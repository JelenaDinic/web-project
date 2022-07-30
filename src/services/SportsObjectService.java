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
	@Path("/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<SportsObject> searchSportsObjects(@PathParam("input") String input){
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("sportsObjectDAO");
		return dao.search(input);
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
}
