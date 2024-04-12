/**
 * 
 */
package trafficControlSystem;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import controlCenterSystem.TCSystemsListManager;
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
	   
	    
		/**
		 * Constructor to initialise Traffic Control System object
		 * **/
		public TrafficControlSystem() {
			this.isOperative = true;
			this.listOfTrafficLightSystems = new ArrayList<>();
			//this.initTrafficLightSystems();  // call method to integrate the Traffic Light Systems
	        
		}
		
		
		/***
		* Method initialise the 2 Traffic Light Systems associated to 
		* this Traffic Control System.
		* 
		* Synchronous TLSs initialitation process.
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
         * It uses Executor to asynchronously configure of all VRS instances.
         * Using a fixed thread pool to improve performance and reduce configuration time.
         * 
         * - The method logs the successful configuration of each VRS for tracking and verification purposes.
         * - If the thread pool does not terminate within a specified timeout, it attempts to shut down immediately to release resources.
         * 
         * @param scanFrequency The frequency at which each VRS should perform scans.
         * @param scanResolution The resolution or detail level each VRS should use for scans.
         */
         public void configAllVisualRecognitionSystems(int numOfScans, int scanLengthInSeconds) {
        	 
        	     this.numOfVisualRecognitionScans = numOfScans;
        	     this.lengthOfVRScans = scanLengthInSeconds;    // in  seconds
        	 
        	     // Create a thread pool with as many threads as there are VRS instances
             ExecutorService executor = Executors.newFixedThreadPool(listOfTrafficLightSystems.size());
             
             try {
            	     // Iterate over the list of TLSs associated
                 for (TrafficLightSystem tls : listOfTrafficLightSystems) {
                	    // Iterate over the list of VRSs associated to each TLS
                     for (VisualRecognitionSystem vrs : tls.getVisualRecognitionSystems()) {
                         executor.submit(() -> {
                             vrs.setNumOfTrafficScans(numOfScans);
                             vrs.setScanTime(scanLengthInSeconds);
                             System.out.println("Successfully configured VRS " + vrs.getSYSTEMID() + " in TLS " + tls.getSystemId());
                         });
                     }
                 }
             } finally {
                 executor.shutdown();
                 try {
                     if (!executor.awaitTermination(60, TimeUnit.SECONDS)) {
                         executor.shutdownNow();
                     }
                 } catch (InterruptedException ie) {
                     executor.shutdownNow();
                     Thread.currentThread().interrupt();
                 }
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
			int cycleTimeInSeconds = (this.lengthOfVRScans * this.numOfVisualRecognitionScans) + 4;
			String newState = "green"; 
			
			
            int greenPhaseLength = cycleTimeInSeconds - 4;  // green state length is equal to the cycle time less 2 seconds
            int yellowPhaseLength = greenPhaseLength + 2 ; // Yellow phase lasts for 2 seconds, and another 2 seconds remains before changin state
            
            String str= "";
            System.out.println("4- Start Traffic Controll Cycle with the initial predifined state...");
	        try{
                // Green phase
                tls1.updateLightsState("green");
                tls2.updateLightsState("red");
                System.out.println("\nGREEN PHASE");
                System.out.println("\nTraffic light System 1 state: " + "light 1 " + tls1.getTlA().getState() + "; light 2 " + tls1.getTlB().getState());      
                System.out.println("Traffic light System 2 state:" + "light 1 " + tls2.getTlA().getState() + "; light 2 " + tls2.getTlB().getState());
                Thread.sleep((greenPhaseLength / 2) * 1000);
    			    this.startVRSDataCollection(); // start process of traffic data collection


                Thread.sleep((greenPhaseLength / 2) * 1000); // Convert seconds to milliseconds

                this.analizeTrafficData();
                
                // Yellow phase
                tls1.updateLightsState("yellow");
                tls2.updateLightsState("red");
                System.out.println("\nYELLOW PHASE");
                System.out.println("\nTraffic light System 1 state: " + "light 1 " + tls1.getTlA().getState() + "; light 2 " + tls1.getTlB().getState());      
                System.out.println("Traffic light System 2 state:" + "light 1 " + tls2.getTlA().getState() + "; light 2 " + tls2.getTlB().getState());
                Thread.sleep(yellowPhaseLength * 1000);

                // Transition to next cycle (red-green phase)
                tls1.updateLightsState("red");
                tls2.updateLightsState("green");
                System.out.println("\nRED-GREEN TRANSITION");
                System.out.println("End of Cycle") ;
                System.out.println("Traffic light System 1 state: " + "light 1 " + tls1.getTlA().getState() + "; light 2 " + tls1.getTlB().getState());      
                System.out.println("Traffic light System 2 state:" + "light 1 " + tls2.getTlA().getState() + "; light 2 " + tls2.getTlB().getState());

            } catch (InterruptedException e) {
                e.printStackTrace();
            }
			System.out.println(str);
	        
	      }
		
		/**
		 * Method start procces of traffic data collection of All Visual Recognition Systems
		 * **/
		public void startVRSDataCollection() {
			
			// Create a thread pool with as many threads as there are TLS instances
	        ExecutorService executor = Executors.newFixedThreadPool(listOfTrafficLightSystems.size());
			
	         // Iterates through the list of TLSs associated to this TCS
			 for ( TrafficLightSystem tls :  listOfTrafficLightSystems) {
				 executor.submit(() -> {
	               tls.startVRDataCollection(); //VRS are initialized and begin data collection.
				 });
	        }
			 
			// Shutdown the executor after starting all tasks
		        executor.shutdown();
			 
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
			
			// loop through the list of Traffic Light Systems
				for(TrafficLightSystem tls : listOfTrafficLightSystems) {
					System.out.println("Traffic Light System " + tls.getSystemId() + "**REPORT**");
					
					for(VisualRecognitionSystem vrs : tls.getVisualRecognitionSystems()) {						
						System.out.println("VRS " + vrs.getSYSTEMID() + "**Total vehicles last scan: **");
						System.out.println("Total vehicles " + vrs.getTotalVehicles());
					}
					
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
