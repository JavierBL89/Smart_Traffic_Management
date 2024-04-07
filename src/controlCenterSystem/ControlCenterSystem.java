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
