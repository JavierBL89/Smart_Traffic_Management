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
		private int numOfVisualRecognitionScans;
		private int lengthOfVRScans;     // in nanoseconds
		
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
		* Method initialise the 2 Traffic Light Systems associated to 
		* this Traffic Control System 
		* 
	    * @throws Exception if a TLS is not operative or if there's an issue initializing its components. 
	    * 
		* **/
		public void initTrafficLightSystems() throws Exception {
			
			System.out.println("\n2- Initializing Traffic Light Systems...");

			try {
			    // Initialize the first Traffic Light System and its components
			    tls1 = new TrafficLightSystem();
			    if (!tls1.isOperative()) {
			         throw new Exception("Traffic Light System 1 is not operative and could not be initialized.");
			    }
			    
			    listOfTrafficLightSystems.add(tls1); // Add TLS 1 to the list
			    tls1.initTLSComponents(); // Initialise associated components
			    
			    } catch (Exception e) {
			        System.err.println("Error initializing Traffic Light System 1: " + e.getMessage());
			       
			    }

			    try {
			        // Initialise the second Traffic Light System and its components
			        tls2 = new TrafficLightSystem();
			        if (!tls2.isOperative()) {
			            throw new Exception("Traffic Light System 2 is not operative and could not be initialized.");
			        }
			        listOfTrafficLightSystems.add(tls2); // Add TLS 2 to the list
			        tls2.initTLSComponents(); // Initialise associated components
			        
			    } catch (Exception e) {
			        System.err.println("Error initializing Traffic Light System 2: " + e.getMessage());
			    }
		}

         
         /**
         * Method Configures the visual recognition parameters for all associated Visual Recognition Systems.
         * 
         * @param scanFrequency The frequency at which each VRS should perform scans.
         * @param scanResolution The resolution or detail level each VRS should use for scans.
         */
         public void configAllVisualRecognitionSystems(int numOfScans, int scanLength) {
        	 
        	 this.numOfVisualRecognitionScans = numOfScans;
        	 this.lengthOfVRScans = scanLength;    // in  seconds
        	 
        	     for (VisualRecognitionSystem vrs : listOfVisualRecognitionSystems) {
                 vrs.setNumOfTrafficScans(numOfVisualRecognitionScans);
                 vrs.setScanTime(scanLength);
             }
        	     
        	    
         }
         
		/***
		 * Method to initialise the whole Traffic Control cycle.
		 * 
		 * - Start the cycle with the initial predefined state
		 * - Initiates Visual Recognition Systems to start data collecting proccess
		 * 
		 * ***/
		public void startTrafficControlCycle(String state) {
			
			/* time of traffic lights status cycle is the sum of the number of traffic scans 
			 * by the length of each plus 2 seconds 
			 * Those 2 extra seconds a safe time to collect and analize the data from 
			 * the Visual Recognition system and state the set cycle based on that data.
			 * */
			int cycleTimeInSeconds = (this.lengthOfVRScans + 2) * this.numOfVisualRecognitionScans;
			
			startVRSDataCollection(); // start process of traffic data collection
			
			String newState = "green"; 
			
			LocalTime cycleTimeEnd =  LocalTime.now().plusSeconds(cycleTimeInSeconds);  // set the end of the cycle
            LocalTime greenCycleEnd = LocalTime.now().plusSeconds(cycleTimeInSeconds - 2);  // green state length is equal to the cycle time less 2 seconds

            
	        while(LocalTime.now().isBefore(cycleTimeEnd)) {
	        	
	            LocalTime  currentTime = LocalTime.now(); // Update the current time
	                        				
				// Green phase
				if(currentTime.isBefore(greenCycleEnd)) {  
					tls1.updateLightsState(newState);
					tls2.updateLightsState("red");
					
			    }// Yellow phase for the last 2 seconds
				else {
					tls1.updateLightsState("yellow");
					tls2.updateLightsState("red");
				
				} 
				
			    // After the yellow phace, change to the next cycle 
			    tls1.updateLightsState("red");
				tls2.updateLightsState("green");
			
	        }
	        String str= "";
	        str += "4- Start Traffic Controll Cycle with the initial predifined state...";
	        str += "\nStart of Cycle " ;
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
		
		/**
		 * Method start procces of traffic data collection of All Visual Recognition Systems
		 * **/
		public void startVRSDataCollection() {
			//VRS are initialized and begin data collection.
			 for (VisualRecognitionSystem vrs : listOfVisualRecognitionSystems) {
	           vrs.startDataCollectorCycle();
	        }
			 
			 /***
			  * 
			  * WHEN SHOULD ANALIZE DATA BE CALLED ????????????????????
			  * 
			  * */
		}
		
		/**
		 * 
		 * **/
		public void analizeTrafficData() {
			
			VisualRecognitionSystem dataVRS1;
			VisualRecognitionSystem dataVRS2;
			VisualRecognitionSystem dataVRS3;
			VisualRecognitionSystem dataVRS4;
			
			// Iterarte over the list of all associated Visual Recognition Systems
			 for (int i=0; i<=  listOfVisualRecognitionSystems.size();i++) {
				 dataVRS1 = listOfVisualRecognitionSystems.get(0);
				 dataVRS2 = listOfVisualRecognitionSystems.get(1);
				 dataVRS3 = listOfVisualRecognitionSystems.get(2);
				 dataVRS4 = listOfVisualRecognitionSystems.get(3);
	        }
			 
			// loop through the list of Traffic Light Systems
				for(TrafficLightSystem tls : listOfTrafficLightSystems) {
					
					
				}
		
				  
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
