/**
 * 
 */
package controlCenterSystem;

import java.util.ArrayList;
import java.util.List;

import trafficControlSystem.TrafficControlSystem;

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
		instance.addTrafficContolSystem();
		s.initTrafficControlSystems();
		
	}

	
}
