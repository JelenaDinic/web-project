package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
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
import beans.User;
import dao.SportsObjectsDAO;
import dao.UserDAO;

@Path("user")
public class UserService {
	
	@Context
	ServletContext ctx;
	
	public UserService() {
	}
	
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> getUsers(){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.findAll();
	}
	
	@GET
	@Path("/freeManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<User> freeManagers(){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.findFreeManagers();
	}
	
	@GET
	@Path("/{input}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<User> searchUsers(@PathParam("input") String input){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.search(input);
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(User user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.add(user);
		dao.save();
		return Response.status(200).build();
	}
	
	/*@POST
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response setObjectToManager(@PathParam("username") String username, SportsObject sportsObject) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.setObjectToManager(username, sportsObject);
		return Response.status(200).build();
	}*/
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(User user, @Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User loggedUser = userDao.login(user.getUsername(), user.getPassword());
		if (loggedUser == null) {
			return Response.status(400).entity("Invalid username and/or password").build();	
		}
		request.getSession().setAttribute("user", loggedUser);
		return Response.status(200).build();
	}
	@PUT
	@Path("/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void update(@PathParam("username") String username, User user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.update(username, user);
		dao.save();
	}
	@GET
	@Path("/all-coaches")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCoaches(){
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		return Response.ok(userDao.findAllCoaches(), MediaType.APPLICATION_JSON).build();
	}
}
