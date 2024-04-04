/**
 * 
 */
package trafficControlSystem;

import java.time.LocalTime;
import java.util.List;

import TrafficLightSystem.TrafficLight;
import TrafficLightSystem.TrafficLightSystem;

/**
 * 
 */
public class TrafficControlSystem {
	
	    // vars
		private static final int systemID = 2012;
		
		private List<TrafficLightSystem> systemsOfTrafficLight;
		private LocalTime timer;
		
		// constructor
		public TrafficControlSystem() {
					
		    this.systemsOfTrafficLight.add(new TrafficLightSystem());
		    this.systemsOfTrafficLight.add(new TrafficLightSystem());
		}
				
				


	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
