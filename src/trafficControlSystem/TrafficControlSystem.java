/**
 * 
 */
package trafficControlSystem;

import java.time.LocalTime;
import java.util.List;

import trafficLightSystem.TrafficLightSystem;

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
				
				
		/***
		 * 
		 * ***/
		private void startTrafficControl(String newState, LocalTime timer) {
			
		    
			LocalTime currentTime = LocalTime.now();
			LocalTime greenCycleEnd = currentTime.plusSeconds(30);
			LocalTime yellowCycleEnd = greenCycleEnd.plusSeconds(5);
			
			TrafficLightSystem tls1 =  systemsOfTrafficLight.get(0);
	        TrafficLightSystem tls2 =  systemsOfTrafficLight.get(1);
	        
			// while current time is before the traffic light open cycle
			while (currentTime.isBefore(yellowCycleEnd)) {
				
		        
		        
		                
		        
		        currentTime = LocalTime.now(); // Update the current time
		    }
		}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
