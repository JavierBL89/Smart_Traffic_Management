/**
 * 
 */
package trafficLightSystem;

import java.util.ArrayList;
import java.util.List;

import visualRecognitionSystem.VisualRecognitionSystem;


/**
 * 
 */
public class TrafficLightSystem {
	
	// vars
	private static int nextSystemID = 304;
	private  int systemID;
	private List<TrafficLight> trafficLights;
	private List<VisualRecognitionSystem> visualRecognitionSystems;
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
		this.trafficLights = new ArrayList<>();
		this.visualRecognitionSystems = new ArrayList<>();
		this.tlA = new TrafficLight(systemID);    // Instantiate traffic light object (A) and pass Traffic System ID it will be associated to
		this.tlB = new TrafficLight(systemID);    // Instantiate traffic light object (B) and pass Traffic System ID it will be associated to
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
	 * Get list of all Traffic Lights associated to this system
	 * 
	 * @return trafficLights  list
	 * **/
	public List<TrafficLight> getTrafficLights(){
		
		return trafficLights;
	}
	
	
	/**
	 * Get list of all Visual Recognition Systems associated to this system
	 * 
	 * @return visualRecognitionSystems  list
	 * **/
   public List<VisualRecognitionSystem> getVisualRecognitionSystems(){
		
		return visualRecognitionSystems;
	}
   
   
	// helper methods
	
	
	/***
	 * Method adds a new traffic light to the list of associated TL to this system
	 * **/
	public void addTrafficLight(TrafficLight tl) {

		this.trafficLights.add(tl);
	}
	
	
	/***
	 * Method adds a new visual recognition system to the list of associated VRS to this system
	 * **/
	public void addVisualRecognitionSystem(VisualRecognitionSystem vrs) {

		this.visualRecognitionSystems.add(vrs);
	}
	

	/**
	 * @param args
	 */
	public static void main(String[] args) {

		TrafficLightSystem p = new TrafficLightSystem();
		
	}

}
