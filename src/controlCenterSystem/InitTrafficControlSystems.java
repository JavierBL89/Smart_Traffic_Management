/**
 * Javier Bastande
 */

package controlCenterSystem;

import java.util.ArrayList;
import java.util.List;

import trafficControlSystem.TrafficControlSystem;

/**
 * Class responsible for Initialising all Traffic Control Systems 
 * that are initially managed by the Control Centre network.
 * 
 * It contains a list with all the Traffic Control Systems managed by Control Centre
 * and ensures each Traffic Control System is operational
 * 
 */
public class InitTrafficControlSystems {
	
	// vars
	private List<TrafficControlSystem> listOfTrafficControlSystems;
	
	// Cotructor
	public InitTrafficControlSystems() {
		this.listOfTrafficControlSystems =  new ArrayList<>();

	}
	
	/**
	 * Method initialise all Traffic Control Systems within the  network. 
	 * It iterates through each system in the list, checks their operational status,
	 *  and initialises the Traffic Light Systems associated with each  Traffic Control System
	 *  or prints and error message is the ar not operational
	 * **/
	private void initTrafficControlSystems() {
		
		// Iterate through each Traffic Control System in the list
		for(TrafficControlSystem tcs :listOfTrafficControlSystems) {
			
			if(tcs.isOperative()) {     // Check if the Traffic Control System is operative
				
				tcs.initTrafficLightSystems(); // Initialise the Traffic Light Systems associated to the Traffic Control System

				// confirm it has been been successfully initialized
				System.out.println("Traffic Control System " + tcs.getSystemID() + " is up and running"); 
			}else {
				
				 // Print an error message if Traffic Control System is operative
				System.out.println("Error at initializing Traffic Control System with id " + tcs.getSystemID()
				+ ". This system is not operative");
			}
		}
	}
	

}
