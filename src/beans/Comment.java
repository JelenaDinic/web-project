package beans;

import java.io.Serializable;

public class Comment implements Serializable{
	private int id;
	private String customer;
	private String sportsObject;
	private String text;
	private int mark;
	private boolean approved;
	
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public Comment(int id, String customer, String sportsObject, String text, int mark, boolean approved) {
		super();
		this.id = id;
		this.customer = customer;
		this.sportsObject = sportsObject;
		this.text = text;
		this.mark = mark;
		this.approved = approved;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public String getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(String sportsObject) {
		this.sportsObject = sportsObject;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public int getMark() {
		return mark;
	}

	public void setMark(int mark) {
		this.mark = mark;
	}


	public boolean isApproved() {
		return approved;
	}


	public void setApproved(boolean approved) {
		this.approved = approved;
	}
	
}
