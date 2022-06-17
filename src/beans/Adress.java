package beans;

public class Adress {
	private String street;
	private String number;
	private String city;
	private int postalCode;
	
	public Adress() {
		super();
		// TODO Auto-generated constructor stub
	}



	public String getNumber() {
		return number;
	}



	public void setNumber(String number) {
		this.number = number;
	}



	public Adress(String street, String number, String city, int postalCode) {
		super();
		this.street = street;
		this.number = number;
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
