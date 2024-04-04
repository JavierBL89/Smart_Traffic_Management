/**
 * 
 */
package trafficLightSystem;


/**
 * 
 */
public class TrafficLight {

	// vars
	private static int trafficLightID = 0;
	private String state;
	private boolean status;
	
	// default constructor
	public TrafficLight() {};
	
	
	public TrafficLight(String state) {

		this.state = state;
		this.status = true;
		++trafficLightID;    // auto increment id
	}



	// setters
	
	public void setState(String state) {
		this.state = state;
	}
	
	public void setStatus(boolean status) {
		this.status = status;
	}
	

	// getters
	public int getTrafficLightID() {
		return trafficLightID;
	}


	public String getState() {
		return state;
	}


	public boolean isStatus() {
		return status;
	}

}
