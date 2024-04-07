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
	private List<TrafficControlSystem> listOfTrafficControlSSystems;
	/** Default constructor */
	public ControlCenterSystem() {
		this.systemID++;
		this.listOfTrafficControlSSystems =  new ArrayList<>();
	}
	


	/***
	 * Method adds a new Traffic Control System to the list 
	 * of Traffic Control Systems that this Control Centre System manages
	 * 
	 */
	private void addTrafficContolSystem() {
		
		TrafficControlSystem newTCS = new TrafficControlSystem();   
		listOfTrafficControlSSystems.add(newTCS);   
	}
	
	
	/**
	 * Method initialises all Traffic Control Systems
	 * **/
	private void initTrafficControlSystems() {
		
		// Iterate through each Traffic Control System in the list
		for(TrafficControlSystem tcs :listOfTrafficControlSSystems) {
			
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
	
	/***
	 * Method initilizes all Traffic Light Systems associated with each Traffic Control System.
	 * Method ensures that every Traffic Control System is fully operational with its Traffic Light Systems integration.
	 * 
	 * If any Traffic Light System fails to initialise, an exception is thrown, halting the process.
	 * @throws Exception if any of the Traffic Light Systems could not be initialsd.
	 * */
	private void initTrafficLightsSystems() {
		
		// Iterate through each Traffic Control System in the list
		for(TrafficControlSystem tcs :listOfTrafficControlSSystems) {

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
		// TODO Auto-generated method stub

	}

}
