

	/**
	 * 
	 */
	package visualRecognitionSystem;

	import java.sql.Time;
	import java.time.LocalTime;
	import java.util.Random;

	public class VisualRecognitionSystem {
		
		private final int SYSTEMID = 300;
		private int trafficLightID;
		private int scanTime;
		private int numOfTrafficScans;
		private int carCounter;
		private int truckCounter;
		private int bikeCounter;
		private int busCounter;
		private int anomalies;
		private Random randomNumber;
		private TrafficDataCollector tdc;
		/**
		 * Initialises a new VisualRecognitionSystem object with default values.
		 * **/
		public VisualRecognitionSystem() {
			
			this.trafficLightID = 0;
			this.numOfTrafficScans = 3;
			this.scanTime = 2000;
			this.bikeCounter = 0;
			this.carCounter = 0;
			this.truckCounter = 0;
			this.busCounter = 0;
			this.anomalies = 0;
			this.randomNumber = new Random();
			this.tdc = new TrafficDataCollector();   
		}
		
		/**
		 * Initialises a new VisualRecognitionSystem object with default values.
		 * **/
		public void startDataCollectorCycle() {
			TrafficDataCollector tdc =  new TrafficDataCollector();
			
			tdc.startDataCollector();
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


		
		public void setBusCounter(int busCounter) {
			this.busCounter = busCounter;
		}


		public void setNumOfTrafficScans(int numOfCycles) {
			this.numOfTrafficScans = numOfCycles;
		}
		
		public void setCarCounter(int carCounter) {
			this.carCounter = carCounter;
		}
		
		public void setTruckCounter(int truckCounter) {
			this.truckCounter = truckCounter;
		}
		
		public void setBikeCounter(int bikeCounter) {
			this.bikeCounter = bikeCounter;
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
		 * Get getBusCounter
		 */
		public int getBusCounter() {
			return busCounter;
		}

		/**
		 * Get getCarCounter
		 */
		public int getCarCounter() {
			return carCounter;
		}

		/**
		 * Get getTruckCounter
		 */
		public int getTruckCounter() {
			return truckCounter;
		}

		/**
		 * Get getBikeCounter
		 */
		public int getBikeCounter() {
			return bikeCounter;
		}

		/**
		 * Get getSYSTEMID
		 */
		public int getSYSTEMID() {
			return SYSTEMID;
		}

		/**
		 * @param args
		 */
		public static void main(String[] args) {
	                                                        
			TrafficDataCollector tdc = new TrafficDataCollector();
			
			tdc.startDataCollector();

		}

	}
