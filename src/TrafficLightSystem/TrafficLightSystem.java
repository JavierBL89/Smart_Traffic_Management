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
	private static final int systemID = 101;
	private TrafficLight tlA;
	private TrafficLight tlB;

	

	// consructor
	public TrafficLightSystem() {
		this.tlA = new TrafficLight();
		this.tlB = new TrafficLight();
	}

	
	// proccess
		private void updateLightsState(String newState) {
			
			tlA.setState(newState);
			tlB.setState(newState);
		};
		
		
	// getters
	public static int getSystemid() {
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
