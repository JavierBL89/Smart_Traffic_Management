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
        	 
        	 
        	 String str = "\n3- Initialising Visual Recognition Systems...";
        	 
			// iterate through the list of Traffic Light Systems
			for(TrafficLightSystem tls : listOfTrafficLightSystems) {
				
				// check if Traffic Light (A) exits or is null
				if(tls.getTlA() != null) {
					VisualRecognitionSystem vrs1 = new VisualRecognitionSystem();   // init a new traffic data collector (tdc1)
					listOfVisualRecognitionSystems.add(vrs1); 
					vrs1.setTrafficLightID(tls.getTlA().getTrafficLightID()); // associate the traffic data collector to Traffic Light (A) object
					
					str += "\nTraffic Light System with id " + tls.getSystemId()  
							+ " reports; Traffic Light with " + tls.getTlA().getTrafficLightID() 
							+ " id is now associated with Visual Recognition System " + vrs1.getSYSTEMID();
				}else {
					throw new NullPointerException("Traffic Light (A) of Traffic Light System " + tls.getSystemId() + " is null");
				}
				
				// check if Traffic Light (B) exits or is null
				if(tls.getTlB() != null) {
					VisualRecognitionSystem vrs2 = new VisualRecognitionSystem();    // init a new traffic data collector (tdc2)
					listOfVisualRecognitionSystems.add(vrs2); 
					vrs2.setTrafficLightID(tls.getTlB().getTrafficLightID()); // associate the traffic data collector to Traffic Light (B) object
				
					str += "\nTraffic Light System with id " + tls.getSystemId()  
					+ " reports; Traffic Light with " + tls.getTlB().getTrafficLightID()
					+ " id is now associated with Visual Recognition System " + vrs2.getSYSTEMID();
					
				}else {
					throw new NullPointerException("Traffic Light (B) of Traffic Light System " + tls.getSystemId() + " is null");
				}
				
			}
			str += "\n \nAll Visual Recognition Systems has been successfully initiated and associated to a Traffic Light....";
			System.out.println(str);  // print string
			
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
