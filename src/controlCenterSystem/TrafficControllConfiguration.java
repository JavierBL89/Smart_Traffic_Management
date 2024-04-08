/**
 * 
 */
package controlCenterSystem;

/**
 * Class represents a type of configuration for Traffic Control.
 * It encapsulates various parameters to determine how traffic data collection 
 * and traffic light control cycles should behave within the traffic management system.
 * This class allows for the dynamic configuration of traffic control systems, making it possible to 
 * adapt traffic control strategies to different traffic conditions, special events, or time of day.
 * 
 * Usage:
 * An instance of this class can be created to specify a particular set of traffic control parameters. 
 * These settings can then be applied to Traffic Control Systems to config their operations. 
 * For example, during peak traffic hours, a configuration with more frequent traffic scans 
 * and longer green light durations might be applied to facilitate smoother traffic flow.
 *
 */
public class TrafficControllConfiguration {


		// vars
		private String configType;
		private int numOfTrafficScans;
		private int scanTime;
		private String newState;

		//
		public TrafficControllConfiguration(String configType, String newState, int numOfTrafficScans, int scanTime)  {
			this.configType = configType;
			this.newState = newState;
			this.numOfTrafficScans = 3;
			this.scanTime = 2000;
		}


		/**
		 * @return the configType
		 */
		public String getConfigType() {
			return configType;
		}


		/**
		 * @param configType the configType to set
		 */
		public void setConfigType(String configType) {
			this.configType = configType;
		}


		/**
		 * @param numOfTrafficScans the numOfTrafficScans to set
		 */
		public void setNumOfTrafficScans(int numOfTrafficScans) {
			this.numOfTrafficScans = numOfTrafficScans;
		}

		/**
		 * @param scanTime the scanTime to set
		 */
		public void setScanTime(int scanTime) {
			this.scanTime = scanTime;
		}

		/**
		 * @param newState the newState to set
		 */
		public void setNewState(String newState) {
			this.newState = newState;
		}
		
		/**
		 * @return the numOfTrafficScans
		 */
		public int getNumOfTrafficScans() {
			return numOfTrafficScans;
		}



		/**
		 * @return the scanTime
		 */
		public int getScanTime() {
			return scanTime;
		}


		/**
		 * @return the newState
		 */
		public String getNewState() {
			return newState;
		}


	
}
