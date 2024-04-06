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
	private int systemID = 304;
	private TrafficLight tlA;
	private TrafficLight tlB;

	

	/***
	 * Constructor to initialise a new Object Traffic Light System
	 * and the pair of traffic lights that compose this system
	 * ***/
	public TrafficLightSystem() {
		systemID++;   // auto increment id
		this.tlA = new TrafficLight();    // Instantiate traffic light object (A)
		this.tlB = new TrafficLight();    // Instantiate traffic light object (B)
	}

	
	// proccess
	
	/***
	 * Method updates the state of both traffic lights of the system
	 * */
		public void updateLightsState(String newState) {
			
			tlA.setState(newState);    // update state traffic Light A
			tlB.setState(newState);    // update state traffic Light B
		};
		
		
	// getters
	public int getSystemid() {
		return systemID;
	}
	

	public TrafficLight getTlA() {
		return tlA;
	}

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
