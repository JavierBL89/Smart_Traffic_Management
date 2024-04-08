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


	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		ControlCenterSystem n = new ControlCenterSystem();
		
		TrafficControllSystemsInitializer s = new TrafficControllSystemsInitializer();
        
		TCSystemsListManager instance = TCSystemsListManager.getInstance();
		instance.addTrafficContolSystem();   // add new Traffic Control System to the list
        VisualRecognitionSystem vrs = new VisualRecognitionSystem();

		s.initTrafficControlSystems();
		s.startTrafficControlCycle("green", 2);
		
	}

	
}
