

	/**
	 * 
	 */
	package visualRecognitionSystem;

	import java.sql.Time;
	import java.time.LocalTime;
	import java.util.Random;

	
	 /*
	 * Class represents the hardware and software of a Visual Recognition System.
	 * It encapsulates the configuration of visual recognition processes and interacts with the TrafficDataCollector 
	 * to initiate data collection cycles.
	 * This system is associated with a specific traffic control point(traffic light) by traffic Light ID.
	 * 
	 * Responsibilities:
	 * - Configuring visual recognition parameters such as the number of traffic scans and the duration of each scan.
	 * - Initiating and managing the data collection cycle through the integrated TrafficDataCollector.
	 * - Handles anomaly detection .
	 * 
	 * Usage:
	 * An instance of the VisualRecognitionSystem should be created for each traffic control point where visual recognition is employed. 
	 * The system allows for dynamic configuration of recognition parameters, enabling the traffic management system to adjust to real-time 
	 * conditions effectively. 
	 */
	public class VisualRecognitionSystem {
		
		// vars
		private final int SYSTEMID = 300;
		private int trafficLightID;
		private int totalVehicles;
		private int numOfTrafficScans;
		private int scanTime;
		private int anomalies;

		// objects
		private TrafficDataCollector tdc;
		
		
		// constructors
		
		/**
		 * Initialises a new VisualRecognitionSystem object with default values.
		 * **/
		public VisualRecognitionSystem() {
			this.trafficLightID = 0;
			this.numOfTrafficScans = 3;
			this.totalVehicles = 0;
			this.scanTime = 2000;
			this.anomalies = 0;
			this.tdc = new TrafficDataCollector();   // instantiate a Traffic Data Collector object
		}
		

		//setters 
		
		/**
		 * Set setCycleTime
		 */
		public void setCycleTime(int scanTime) {
			this.scanTime = scanTime;
		}

		/**
		 * Set trafficLightID 
		 */
		public void setTrafficLightID(int trafficLightID) {
			this.trafficLightID = trafficLightID;
		}

		/**
		* Set number of micro traffic scans
		*/
	    public void setNumOfTrafficScans(int numOfTrafficScans) {
		   this.numOfTrafficScans = numOfTrafficScans;
	    }

		/**
		* Set length of each micro traffic scan by seconds
	    */
	    public void setScanTime(int scanTime) {
			this.scanTime = scanTime;
	    }
		
		// getters
		
		/**
		 * Get trafficLightID
		 */
		public int getTrafficLightID() {
			return trafficLightID;
		}
		
		/**
		 * Get getNumOfTrafficScans
		 */
		public int getNumOfTrafficScans() {
			return numOfTrafficScans;
		}

		
		/**
		 * Get total of Vehicles per scan
		 */
		public int getTotalVehicles() {
			return totalVehicles;
		}
		
		/**
		 * Get trafficLightID
		 */
		public int getAnomalies() {
			return tdc.getAnomalies();
		}
		
		/**
		 * Get getSYSTEMID
		 */
		public int getSYSTEMID() {
			return SYSTEMID;
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
		
		/**
		 * Methos responsible for startting visual recognition proccess
		 * **/
		public void startDataCollectorCycle() {
			totalVehicles =  tdc.startDataCollector();
		}
		
		
		@Override 
		public String toString() {
			String str = "";
			str += "Current Traffic Control Configuration:";
			str += "A traffic Scan cycle consists of " + this.getNumOfTrafficScans() 
					   + " micco scans of " + this.getScanTime() + " seconds length each.";
					
		     return str;
		}	

		/**
		 * @param args
		 */
		public static void main(String[] args) {
	        
			TrafficDataCollector tdc = new TrafficDataCollector();
			
			tdc.startDataCollector();
			tdc.getAnomalies();
			tdc.printVehiclesCount();

		}

	}
