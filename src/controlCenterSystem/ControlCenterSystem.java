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
	

	
	
	/***
	 * Method initilizes all Traffic Light Systems associated with each Traffic Control System.
	 * Method ensures that every Traffic Control System is fully operational with its Traffic Light Systems integration.
	 * 
	 * If any Traffic Light System fails to initialise, an exception is thrown, halting the process.
	 * @throws Exception if any of the Traffic Light Systems could not be initialsd.
	 * */
	private void initTrafficLightSystems() {
		
		// Iterate through each Traffic Control System in the list
		for(TrafficControlSystem tcs :listOfTrafficControlSystems) {
			tcs.initTrafficLightSystems();
	        
		}
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
		
		n.addTrafficContolSystem();
	}

}
