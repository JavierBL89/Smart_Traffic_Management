/**
 * 
 */
package controlCenterSystem;

import trafficControlSystem.TrafficControlSystem;
import visualRecognitionSystem.VisualRecognitionSystem;

/**
 * 
 */
public class ControlCenterSystem {
	
	// vars
	private int systemID = 700;
	private static TrafficControllSystemsInitializer tcsInitializer;
	
	/** Default constructor */
	public ControlCenterSystem() {
		this.systemID++;
		this.tcsInitializer = new TrafficControllSystemsInitializer();
	}
	

	/**
	 * @return the systemID
	 */
	public int getSystemID() {
		return systemID;
	}

	

	 /*
	 * Method initialises all Traffic Control Systems managed by the Traffic Control System.
	 * This method encapsulates the process of starting up the traffic control systems and 
	 * initiating the traffic control cycle with predefined initial states. 
	 * 
	 * The initialization process involves two primary actions:
	 * 1. Initializing traffic control systems: Ensuring that all systems are set up and configured.
	 *    
	 * 2. Starting the traffic control cycle: Kicking off the cycle that governs traffic light changes,
	 *    starting with predefined initial states to then be modified by traffic density changes.
	 */
	private static void initializeTrafficControlSystems() {
		
		// Init Traffic Controll Systems Initializer class
		 
	    try {
	    	    tcsInitializer.initTrafficControlSystems();  // call static method of TrafficControllSystemsInitializer class
				
		} catch (Exception e) {
			e.printStackTrace();
		}  
	    // init all Traffic Control Systems
	    
	}
	
	/**
	 * Mthod to configure the visual recognition parameters for all associated Visual Recognition Systems 
	 * associated with the Traffic Control System that this Control Centre manages
	 * **/
	private static void configureVisualRecognitionSystem(int numOfScanCycles, int scanLenghtInSeconds) {
		
	    TCSystemsListManager listManager = TCSystemsListManager.getInstance();
	    
	    for(TrafficControlSystem tcs : listManager) {
	 
	       	tcs.configAllVisualRecognitionSystems(numOfScanCycles, scanLenghtInSeconds); // Configure visual recognition parameters
	    }
	}
	
	/***
	 * Method adds a new Traffic Control System to the list of
	 * Traffic Control Systems this Control Centre manages.
	 * **/
	private static void addTrafficControlSystem() {
		
		TCSystemsListManager instance = TCSystemsListManager.getInstance(); // get instance of the list
		instance.addTrafficContolSystem(new TrafficControlSystem());        // add new Traffic Control System
		
	}
	
	
	/*
    * Method initialises all Traffic Control Systems managed by the Traffic Control System.
    * This method encapsulates the process of starting up the traffic control systems and 
    * initiating the traffic control cycle with predefined initial states. 
    * 
	* The initialization process involves two primary actions:
	* 1. Initializing traffic control systems: Ensuring that all systems are set up and configured.
	*    
	* 2. Starting the traffic control cycle: Kicking off the cycle that governs traffic light changes,
	* starting with predefined initial states to then be modified by traffic density changes.
	*/
	private static void startTrafficControlCycle() {
			
		// Init Traffic Controll Systems Initializer class
		
		try {
			tcsInitializer.startTrafficControlCycle();    // init the Traffic Control Cycle with predefined initial states
					
		} catch (Exception e) {
			e.printStackTrace();
		}  
		// init all Traffic Control Systems
		    
		}
		
	
 
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		ControlCenterSystem n = new ControlCenterSystem();
		
		addTrafficControlSystem();
		initializeTrafficControlSystems();
		configureVisualRecognitionSystem(/*numOfScans*/  3, /*scanLengthInaNoSeconds*/  2);    //     
	
		startTrafficControlCycle();
	}

	
}
