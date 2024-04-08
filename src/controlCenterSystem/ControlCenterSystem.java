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
	
	
	
	/** Default constructor */
	public ControlCenterSystem() {
		this.systemID++;
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
		TrafficControllSystemsInitializer tcsInitializer = new TrafficControllSystemsInitializer(); 
	    tcsInitializer.initTrafficControlSystems();   // init all Traffic Control Systems
	    tcsInitializer.startTrafficControlCycle();    // init the Traffic Control Cycle with predefined initial states
		
	}
	
	


		
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		ControlCenterSystem n = new ControlCenterSystem();
		
	
        
        VisualRecognitionSystem vrs = new VisualRecognitionSystem();
        
		vrs.configVisualRecognition(3, 2000);
		vrs.startDataCollectorCycle();
		vrs.printScanReport();
	}

	
}
