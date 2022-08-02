package beans;

import java.io.Serializable;
import java.time.LocalDateTime;

import enums.FeeType;
import enums.Status;

public class Fee implements Serializable{
	private String id;
	private FeeType feeType;
	private String paymentDate;
	private String dateTimeOfValidity;
	private int price;
	private String customer;
	private Status status;
	private int numberOfEntries;
	private int usedEntries;
	
	public Fee() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Fee(String id, FeeType feeType, String paymentDate, String dateTimeOfValidity, int price,
			String customer, Status status, int numberOfEntries, int usedEntries) {
		super();
		this.id = id;
		this.feeType = feeType;
		this.paymentDate = paymentDate;
		this.dateTimeOfValidity = dateTimeOfValidity;
		this.price = price;
		this.customer = customer;
		this.status = status;
		this.numberOfEntries = numberOfEntries;
		this.usedEntries = usedEntries;	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public FeeType getFeeType() {
		return feeType;
	}

	public void setFeeType(FeeType feeType) {
		this.feeType = feeType;
	}

	public String getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getDateTimeOfValidity() {
		return dateTimeOfValidity;
	}

	public void setDateTimeOfValidity(String dateTimeOfValidity) {
		this.dateTimeOfValidity = dateTimeOfValidity;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public int getNumberOfEntries() {
		return numberOfEntries;
	}

	public void setNumberOfEntries(int numberOfEntries) {
		this.numberOfEntries = numberOfEntries;
	}

	public int getUsedEntries() {
		return usedEntries;
	}

	public void setUsedEntries(int usedEntries) {
		this.usedEntries = usedEntries;
	}
	
}
