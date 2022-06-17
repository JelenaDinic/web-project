package beans;

public class Adress {
	private String street;
	private String city;
	private int postalCode;
	
	public Adress() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Adress(String street, String city, int postalCode) {
		super();
		this.street = street;
		this.city = city;
		this.postalCode = postalCode;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(int postalCode) {
		this.postalCode = postalCode;
	}
	
}
