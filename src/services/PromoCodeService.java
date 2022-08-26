package services;

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

import beans.PromoCode;
import dao.PromoCodeDAO;

@Path("promoCode")
public class PromoCodeService {
	@Context
	ServletContext ctx;
	
	public PromoCodeService() {
	}
	
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("promoCodeDAO") == null) {
			ctx.setAttribute("promoCodeDAO", new PromoCodeDAO());
		}
	}
	
	@POST
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response save(PromoCode promoCode) {
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		dao.add(promoCode);
		dao.save();
		return Response.status(200).build();
	}
	@GET
	@Path("/find/{code}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public int findByCode(@PathParam("code") String code){
		PromoCodeDAO dao = (PromoCodeDAO) ctx.getAttribute("promoCodeDAO");
		return dao.findByCode(code);
	}
}
