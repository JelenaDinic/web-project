package services;

import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.SportsObject;
import dao.SportsObjectsDAO;

@Path("sportsObject")
public class SportsObjectService {
	
	@Context
	ServletContext ctx;
	
	public SportsObjectService() {
	}
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("sportsObjectDAO") == null) {
			String contextPath = ctx.getRealPath("");
			ctx.setAttribute("sportsObjectDAO", new SportsObjectsDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<SportsObject> getSportsObjects(){
		SportsObjectsDAO dao = (SportsObjectsDAO) ctx.getAttribute("spotsObjectDAO");
		return dao.findAll();
	}
}
