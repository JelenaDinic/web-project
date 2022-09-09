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
	
	@GET
	@Path("/manager/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteSportObjectFromManager(@PathParam("name") String name){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.deleteSportObjectFromManager(name);
		dao.save();
	}
	
	@GET
	@Path("/customer/{name}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteSportObjectFromCustomers(@PathParam("name") String name){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.deleteSportObjectFromCustomer(name);
		dao.save();
	}
	
	@GET
	@Path("/delete/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void deleteUser(@PathParam("username") String username){
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.delete(username);
		dao.save();
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
	
	@POST
	@Path("/logout")
	public Response logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
		return Response.ok().build();
	}
	
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
	
	@PUT
	@Path("/addSportObject/{username}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void addSportObject(@PathParam("username") String username, SportsObject obj) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.addSportObject(username, obj);
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
