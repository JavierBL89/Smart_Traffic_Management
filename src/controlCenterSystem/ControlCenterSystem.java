/**
 * 
 */
package controlCenterSystem;

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

	

	// Method to initialise Traffic Control Systems
	private static void initializeTrafficControlSystems() {
		
	    TrafficControllSystemsInitializer tcsInitializer = new TrafficControllSystemsInitializer();
	    tcsInitializer.initTrafficControlSystems();            // init both Traffic Controll Systems
	    tcsInitializer.startTrafficControlCycle();   // init Traffic Controll Cycle with initial states
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		ControlCenterSystem n = new ControlCenterSystem();
		
	
        
		TCSystemsListManager instance = TCSystemsListManager.getInstance();
		instance.addTrafficContolSystem();   // add new Traffic Control System to the list
        VisualRecognitionSystem vrs = new VisualRecognitionSystem();
        
		
		vrs.configVisualRecognition(3, 2000);
		vrs.startDataCollectorCycle();
		vrs.printScanReport();
	}

	
}
