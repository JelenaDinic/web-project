package beans;

public class Comment {
	private User customer;
	private SportsObject sportsObject;
	private String text;
	private int mark;
	
	public Comment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Comment(User customer, SportsObject sportsObject, String text, int mark) {
		super();
		this.customer = customer;
		this.sportsObject = sportsObject;
		this.text = text;
		this.mark = mark;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	public SportsObject getSportsObject() {
		return sportsObject;
	}

	public void setSportsObject(SportsObject sportsObject) {
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
	
}
