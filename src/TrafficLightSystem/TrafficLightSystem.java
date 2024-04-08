/**
 * 
 */
package trafficLightSystem;

import java.util.List;


/**
 * 
 */
public class TrafficLightSystem {
	
	// vars
	private static int nextSystemID = 304;
	private  int systemID;
	private TrafficLight tlA;
	private TrafficLight tlB;
	private boolean operative;

	

	/***
	 * Constructor to initialise a new Object Traffic Light System
	 * and the pair of traffic lights that compose this system
	 * ***/
	public TrafficLightSystem() {
		this.systemID = ++nextSystemID;   // auto increment id
		this.operative = true;
		this.tlA = new TrafficLight();    // Instantiate traffic light object (A)
		this.tlB = new TrafficLight();    // Instantiate traffic light object (B)
	}

	
	// proccess
	
	/***
	 * Method updates the state of both traffic lights of the system
	 * */
		public void updateLightsState(String newState) {
			
			this.tlA.setState(newState);    // update state traffic Light A
			this.tlB.setState(newState);    // update state traffic Light B
		};
		
			
		
	// getters
		
	/**
	* Get Traffic Light System status
	* */	
	public int getSystemId() {
		return systemID;
	}
	
	/**
	 * Get Traffic Light System status
	 * */
	public boolean isOperative() {
		return operative;
	}
	
	/**
	 * Get Traffic Light A
	 * */
	public TrafficLight getTlA() {
		return tlA;
	}

	/**
	 * Get Traffic Light B
	 * */
	public TrafficLight getTlB() {
		return tlB;
	}


	/**
	 * @param args
	 */
	public static void main(String[] args) {

		TrafficLightSystem p = new TrafficLightSystem();
		
	}

}
