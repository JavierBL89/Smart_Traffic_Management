/**
 * 
 */
package trafficControlSystem;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import trafficLightSystem.TrafficLight;
import trafficLightSystem.TrafficLightSystem;
import visualRecognitionSystem.TrafficDataCollector;
import visualRecognitionSystem.VisualRecognitionSystem;

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
		private List<TrafficLightSystem> listOfTrafficLightSystems;  
		
		// list list of traffic data collectors that associated with this Traffic Control System
	    private List<VisualRecognitionSystem> listOfVisualRecognitionSystems;  
	    
	    
		/**
		 * Constructor to initialise Traffic Control System object
		 * **/
		public TrafficControlSystem() {
	
			this.isOperative = true;
			this.listOfTrafficLightSystems = new ArrayList<>();
			this.listOfVisualRecognitionSystems = new ArrayList<>();  // initialize a Visual Recognition System
			//this.initTrafficLightSystems();  // call method to integrate the Traffic Light Systems
		}
		
		
		/***
		 * Method initialise the 2 Traffic Light Systems that 
		 * this Traffic Control System manages
		 * **/
		public void initTrafficLightSystems() {
			
			// Initialise the Traffic Light Systems 
	        tls1 = new TrafficLightSystem();
	        tls2 = new TrafficLightSystem();
	        
	        System.out.println("\n2- Initialiting Traffic Light Systems...");
	        
	        	// Check if Traffic Light System 1 is operative
	        	if(!tls1.isOperative()) {
	        	    	
	        	     System.out.println("Traffic Light System 1 with id " + tls1.getSystemId() + 
	        	    	   " is not operative and could not be initialized");
	        	         
	        	}else {
	             listOfTrafficLightSystems.add(tls1);   // add Traffic Light System 1 to the control list
	                 
	             System.out.println("Traffic Light System 1 with id " + tls1.getSystemId() + 
	                    " has been successfully initialized");
	        }
	        	    
	        	// Check if Traffic Light System 2 is operative
	        	if(!tls2.isOperative()) {
	        	    	
	        	    	System.out.println("Traffic Light System 2 with id " + tls2.getSystemId() + 
	        	    	    " is not operative and could not be initialized");
	        	    	    
	        	}else {
	            listOfTrafficLightSystems.add(tls2);   // add Traffic Light System 2 to the control list
	                
	            System.out.println("Traffic Light System 2 with id " + tls2.getSystemId() + 
	                  " has been successfully initialized");
	            }
	          
	        	
	        initializeTrafficDataCollector();  // call method to integrate the Traffic Data Collectors
		}	
		
		/**
		 * Method initializes and associates a Traffic Data Collector for each traffic light 
		 * within the Traffic Control System's Traffic Light Systems. 
		 * 
		 * This method ensures that every operational traffic light 
		 * has a corresponding Data Collector(camera) associated with it through their id. 
		*/
         private void initializeTrafficDataCollector() {
			
        	 listOfVisualRecognitionSystems = new ArrayList<>(); // Initialise a list to store all Traffic Data Collectors
        	 
        	 
        	 String str = "Initialising Visual Recognition Systems...";
        	 
			// loop through the list of Traffic Light Systems
			for(TrafficLightSystem tls : listOfTrafficLightSystems) {
				
				// check if Traffic Light (A) exits or is null
				if(tls.getTlA() != null) {
					VisualRecognitionSystem vrs1 = new VisualRecognitionSystem();   // init a new traffic data collector (tdc1)
					listOfVisualRecognitionSystems.add(vrs1); 
					vrs1.setTrafficLightID(tls.getTlA().getTrafficLightID()); // associate the traffic data collector to Traffic Light (A) object
					
					str += "Traffic Light System " + tls.getSystemId()  
							+ "id. Traffic Light " + tls.getTlA() 
							+ " id is now associated with Visual Recognition System " + vrs1.getSYSTEMID();
				}else {
					throw new NullPointerException("Traffic Light (A) of Traffic Light System " + tls.getSystemId() + " is null");
				}
				
				// check if Traffic Light (B) exits or is null
				if(tls.getTlB() != null) {
					VisualRecognitionSystem vrs2 = new VisualRecognitionSystem();    // init a new traffic data collector (tdc2)
					listOfVisualRecognitionSystems.add(vrs2); 
					vrs2.setTrafficLightID(tls.getTlB().getTrafficLightID()); // associate the traffic data collector to Traffic Light (B) object
				
					str += "Traffic Light System " + tls.getSystemId()  
					+ "id. Traffic Light " + tls.getTlB() 
					+ " id is now associated with Visual Recognition System " + vrs2.getSYSTEMID();
					
				}else {
					throw new NullPointerException("Traffic Light (B) of Traffic Light System " + tls.getSystemId() + " is null");
				}
				
			}
			
			System.out.println(str);  // print string
			
		}
         
         
         /**
         * Method Configures the visual recognition parameters for all associated Visual Recognition Systems.
         * 
         * @param scanFrequency The frequency at which each VRS should perform scans.
         * @param scanResolution The resolution or detail level each VRS should use for scans.
         */
         public void configAllVisualRecognitionSystems(int numOfTrafficScans, int scanTime) {
        	 
        	     for (VisualRecognitionSystem vrs : listOfVisualRecognitionSystems) {
                 vrs.setNumOfTrafficScans(numOfTrafficScans);
                 vrs.setScanTime(scanTime);
             }
         }
         
		/***
		 * 
		 * ***/
		public void startTrafficControlCycle() {
			int timeOfCycle = 2;
			String newState = "green"; 
			LocalTime currentTime = LocalTime.now();
			LocalTime greenCycleEnd = currentTime.plusSeconds(3);
			timeOfCycle += 1;
			LocalTime yellowCycleEnd = greenCycleEnd.plusSeconds(3);

	        int controlTrfficCycle = 3;
	        
	        
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
	        String str= "";
	        str += "3- Start Traffic Controll Cycle with the initial predifined state...";
	        str += "Start of Cycle " ;
			str += "\nTraffic light System 1 is: ";
			str +=  " light 1 green";
			str +=  " light 2 green";
			str += "\nTraffic light System 2 is: ";
			str +=  "light 1 red";
			str +=  "light 2 red\n";
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
		
		
		public void configVisualRecognition() {
			
		}
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
		
		
		
	}

}
