/**
 * 
 */
package trafficControlSystem;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import TrafficDataCollector.TrafficDataCollector;
import trafficLightSystem.TrafficLight;
import trafficLightSystem.TrafficLightSystem;

/**
 * 
 */
public class TrafficControlSystem {
	
	    // vars
		private int systemID = 2012;
		private TrafficLightSystem tls1;
		private TrafficLightSystem tls2;
		private boolean isOperative;
		
		// list holds the traffic light systems that are controlled by this Traffic Control System
		private List<TrafficLightSystem> systemsOfTrafficLight;  
		
		// list list of traffic data collectors that associated with this Traffic Control System
	    private List<TrafficDataCollector> listOfDataCollectors;  
	    
	    
		/**
		 * Constructor to initialise Traffic Control System object
		 * **/
		public TrafficControlSystem() {
			this.isOperative = true;
			this.systemsOfTrafficLight = new ArrayList<>();
			this.listOfDataCollectors = new 	ArrayList<>();
			this.initTrafficLightSystems();  // call method to integrate the Traffic Light Systems
		    this.startTrafficControlCycle("green", 0);
		}
		
		
		/***
		 * Method initialise the 2 Traffic Light Systems that 
		 * this Traffic Control System manages
		 * **/
		public void initTrafficLightSystems() {
			
			// Initialise the Traffic Light Systems 
	        tls1 = new TrafficLightSystem();
	        tls2 = new TrafficLightSystem();
	        
	        // Add the Traffic Light Systems to the list of systems that this class controls
	        systemsOfTrafficLight.add(tls1);
	        systemsOfTrafficLight.add(tls2);
			 
	        initializeTrafficDataCollector();  // call method to integrate the Traffic Data Collectors
		}	
		
		/**
		 * Method initialises Traffic Data Collectors for each traffic light 
		 * within the Traffic Control System's Traffic Light Systems. 
		 * 
		 * This method ensures that every operational traffic light 
		 * has a corresponding Data Collector(camera) associated with it through their id. 
		*/
         private void initializeTrafficDataCollector() {
			
        	   listOfDataCollectors = new ArrayList<>(); // Initialise a list to store all Traffic Data Collectors
			
			// loop through the list of Traffic Light Systems
			for(TrafficLightSystem tls : systemsOfTrafficLight) {
				
				// check if Traffic Light (A) does not exits or is null
				if(tls.getTlA() != null) {
					TrafficDataCollector tdc1 = new TrafficDataCollector();   // init a new traffic data collector (tdc1)
					listOfDataCollectors.add(tdc1); 
					tdc1.setTrafficLightID(tls.getTlA().getTrafficLightID()); // associate the traffic data collector to Traffic Light (A) object
				}else {
					throw new NullPointerException("Traffic Light (A) of Traffic Light System " + tls.getSystemid() + " is null");
				}
				
				// check if Traffic Light (B) does not exits or is null
				if(tls.getTlB() != null) {
					TrafficDataCollector tdc2 = new TrafficDataCollector();    // init a new traffic data collector (tdc2)
					listOfDataCollectors.add(tdc2); 
					tdc2.setTrafficLightID(tls.getTlB().getTrafficLightID()); // associate the traffic data collector to Traffic Light (B) object
				}else {
					throw new NullPointerException("Traffic Light (B) of Traffic Light System " + tls.getSystemid() + " is null");
				}
				
			}
		}
         
         
		/***
		 * 
		 * ***/
		private void startTrafficControlCycle(String newState, int timeOfCycle) {
			
			LocalTime currentTime = LocalTime.now();
			LocalTime greenCycleEnd = currentTime.plusSeconds(3);
			timeOfCycle += 1;
			LocalTime yellowCycleEnd = greenCycleEnd.plusSeconds(3);

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
		
		// setters
		
		/**
		 * Set TrafficLightSystem 1
		 * */
		public void setTls1(TrafficLightSystem tls1) {
			this.tls1 = tls1;
		}
		
		/**
		 * Set TrafficLightSystem 1
		 * */
		public void setTls2(TrafficLightSystem tls2) {
			this.tls2 = tls2;
		}
		
		/**
		 * Set Traffic Control System status
		 * */
		public void setIsOperative(boolean status) {
			this.isOperative = status;
		}
		
		
		
		// getters
		
		/**
		 * Get the systemID
		 */
		public int getSystemID() {
			return systemID;
		}

		/**
		 * Get TrafficLightSystem 1
		 * */
	    public TrafficLightSystem getTls1() {
			return tls1;
		}

	    /**
		 * Get TrafficLightSystem 1
		 * */
		public TrafficLightSystem getTls2() {
			return tls2;
		}

		/**
		 * Get Traffic Control System status
		 * */
		public boolean isOperative() {
			return isOperative;
		}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		TrafficControlSystem sys = new TrafficControlSystem();
		
		
	}

}
