package beans;

import java.io.Serializable;

public class Location implements Serializable{
	private double longitude;
	private double latitude;
	private Adress address;
	
	public Location() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Location(double longitude, double latitude, Adress address) {
		super();
		this.longitude = longitude;
		this.latitude = latitude;
		this.address = address;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public Adress getAddress() {
		return address;
	}

	public void setAddress(Adress address) {
		this.address = address;
	} 

}
