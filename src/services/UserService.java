package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.User;
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
			String contextPath = ctx.getRealPath("");
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
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public void save(User user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.add(user);
		dao.save();
	}
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public boolean login(User user) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User loggedUser = userDao.login(user.getUsername(), user.getPassword());
		if (loggedUser != null) {
			System.out.println(" NASAO");
			return true;
		}else {
			System.out.println("NISAM NASAO");
			return false;
		}
	}
}
