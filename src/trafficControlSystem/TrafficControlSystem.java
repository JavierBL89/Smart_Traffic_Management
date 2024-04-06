/**
 * 
 */
package trafficControlSystem;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import trafficLightSystem.TrafficLightSystem;

/**
 * 
 */
public class TrafficControlSystem {
	
	    // vars
		private static final int systemID = 2012;
		
		private List<TrafficLightSystem> systemsOfTrafficLight;   // list holds the traffic light systems that are controlled by this class
		private LocalTime timer;
		
		/**
		 * Constructor to initialise Traffic Control System object
		 * and the 2 Traffic Light Systems that are controlled by this class
		 * **/
		public TrafficControlSystem() {
			systemsOfTrafficLight = new 	ArrayList<>();	
		    this.systemsOfTrafficLight.add(new TrafficLightSystem());
		    this.systemsOfTrafficLight.add(new TrafficLightSystem());
		    this.startTrafficControlCycle("green", 0);
		}
				
				
		/***
		 * 
		 * ***/
		private void startTrafficControlCycle(String newState, int timeOfCycle) {
			
			LocalTime currentTime = LocalTime.now();
			LocalTime greenCycleEnd = currentTime.plusSeconds(3);
			timeOfCycle += 1;
			LocalTime yellowCycleEnd = greenCycleEnd.plusSeconds(3);
			
			TrafficLightSystem tls1 =  systemsOfTrafficLight.get(0);
	        TrafficLightSystem tls2 =  systemsOfTrafficLight.get(1);
	        
	        int controlTrfficCycle = 3;
	        
	        String str= "";
	        
		
	        while(controlTrfficCycle >= 0) {
	        	
			    // while current time is before the end of traffic light open cycle
			    while (currentTime.isBefore(yellowCycleEnd)) {
				
				    // when cycle starts green cycle
				    if(currentTime.isBefore(greenCycleEnd)) {  
					    tls1.updateLightsState(newState);
					    tls2.updateLightsState("red");
					
			        }// when current time equals the end of the green cycle, change the green light to yellow
				    else if(currentTime.isBefore(yellowCycleEnd.minusSeconds(1))){
					    tls1.updateLightsState("yellow");
					    tls2.updateLightsState("red");
				
				    } 
			        else { // After the yellow cycle, change the traffic lights to red-green 
					    tls1.updateLightsState("red");
					    tls2.updateLightsState("green");
				    }
		     
		        currentTime = LocalTime.now(); // Update the current time
		    }
				controlTrfficCycle--;

	        }
	        str += "\nStart cycle of Cycle" ;
			str += "\nTraffic light System 1 is: ";
			str +=  " light 1 green";
			str +=  " light 2 green";
			str += "\nTraffic light System 2 is: ";
			str +=  "light 1 red";
			str +=  " light 2 red";
	        str += "\nEnd of Cycle" ;
			str += "\nTraffic light System 1 is: ";
			str +=  " light 1 " + tls1.getTlA().getState();
			str +=  " light 2 " + tls1.getTlB().getState();
			str += "\nTraffic light System 2 is: ";
			str +=  " light 1 " + tls2.getTlA().getState();
			str +=  " light 2 " + tls2.getTlB().getState();
			System.out.println(str);
	        
		}
		
		private void startCycleTrafficLightSystem1() {}
		private void startCycleTrafficLightSystem2() {}
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		TrafficControlSystem sys = new TrafficControlSystem();
		
		
	}

}
