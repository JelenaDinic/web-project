package beans;

public class PromoCode {
	private String code;
	private String expirationDate;
	private int usesLeft;
	private int discount;
	
	public PromoCode() {
		super();
	}

	public PromoCode(String code, String expirationDate, int usesLeft, int discount) {
		super();
		this.code = code;
		this.expirationDate = expirationDate;
		this.usesLeft = usesLeft;
		this.discount = discount;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getExpirationDate() {
		return expirationDate;
	}

	public void setExpirationDate(String expirationDate) {
		this.expirationDate = expirationDate;
	}

	public int getUsesLeft() {
		return usesLeft;
	}

	public void setUsesLeft(int usesLeft) {
		this.usesLeft = usesLeft;
	}

	public int getDiscount() {
		return discount;
	}

	public void setDiscount(int discount) {
		this.discount = discount;
	}
	
}
