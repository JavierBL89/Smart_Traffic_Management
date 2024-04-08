/**
 * 
 */
package visualRecognitionSystem;



/**
 * Class represents a configuration set up for Traffic Control.
 * It encapsulates various parameters to determine how traffic data collection 
 * and traffic light control cycles should behave within the traffic management system.
 * This class allows for the dynamic configuration of traffic control systems, making it possible to 
 * adapt traffic control strategies to different traffic conditions, special events, or time of day.
 * 
 * Usage:
 * An instance of this class can be created to specify a particular set of traffic control parameters. 
 * These settings can then be applied to Traffic Control Systems to config their operations. 
 * For example, during peak traffic hours, a configuration with more frequent traffic scans 
 *
 */
public class VisualRecognitionManager {

	// vars
	private int numOfTrafficScans;
	private int scanTime;
	//private String newState;
	
	//
	public VisualRecognitionManager()  {
	//	this.newState = "";
		this.numOfTrafficScans = 0;
		this.scanTime = 0;
	}
	
	// setters
	
	
	/**
    * Set number of micro traffic scans
    * 
    * @param numOfTrafficScans the numOfTrafficScans to set
    */
	public void setNumOfTrafficScans(int numOfTrafficScans) {
		this.numOfTrafficScans = numOfTrafficScans;
	}

	/**
	* 
    * Set length of each micro traffic scan by seconds
    * 
    * @param scanTime the scanTime to set
	*/
	public void setScanTime(int scanTime) {
		this.scanTime = scanTime;
	}


	// getters
			
    /**
	* Get number of micro Traffic Scans
	* 
	* @return the numOfTrafficScans
	*/
	public int getNumOfTrafficScans() {
		return numOfTrafficScans;
	}



	/**
	* Get length(on seconds) of each micro Traffic Scan
	* @return the scanTime
	*/
	public int getScanTime() {
		return scanTime;
	}


	// helper methods
	
    /** 
    * Method to set visual recognition configurations.
    * - numOfTrafficScans is the number of micro scans per full scan cycle
	* - scanTime is the length in seconds of each micro scan 
    */
	public void configVisualRecognition(int numOfTrafficScans, int scanTime) {
		 this.numOfTrafficScans = numOfTrafficScans;
	     this.scanTime = scanTime;
	}
	
	
	@Override 
	public String toString() {
		String str = "";
		str += "Current Traffic Control Configuration:";
		str += "A traffic Scan cycle consists of " + this.getNumOfTrafficScans() 
				   + " micco scans of " + this.getScanTime() + " seconds length each.";
				
	     return str;
	}	
	

}
