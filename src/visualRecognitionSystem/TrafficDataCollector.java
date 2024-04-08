/**
 * 
 */
package visualRecognitionSystem;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Random;

/**
 * 
 */
public class TrafficDataCollector {
	
	private int scanTime;
	private int numOfTrafficScans;
	private int carCounter;
	private int truckCounter;
	private int bikeCounter;
	private int busCounter;
	private int anomalies;
	private Random randomNumber;
	
	/**
	 * Initialises a new TrafficDataCollector object with default values.
	 * **/
	public TrafficDataCollector() {
		
		this.numOfTrafficScans = 3;
		this.scanTime = 2000;
		this.bikeCounter = 0;
		this.carCounter = 0;
		this.truckCounter = 0;
		this.busCounter = 0;
		this.anomalies = 0;
		this.randomNumber = new Random();
	}
	
	// helper methods
	
	/***
	 * Method starts collecting real time data through visual recongnition.
	 * 
	 * Count vehicles passing for periods of n seconds 3 times before reporting data
	 * to Control Centre.
	 * 
	 * Logic uses a while loop to keep rack the number of scans, and uses Thread.sleep to delay every scan 2 seconds.
	 * This way it simulates a real word scenario to schedule a traffic scan  for n seconds 
	 * per n number of times to complete a traffic scan cycle where would be more appropriate to use a timer.
	 * **/
	public void startDataCollector() {
		
		int numOfTrafficScans = 3;   // set number of traffic scans per cycle
		
		while(numOfTrafficScans >0) {
			try {
				Thread.sleep(scanTime);    // delay traffic scan n seconds
				
					carCounter += getRandomNumber();
					truckCounter += getRandomNumber();
					bikeCounter += getRandomNumber();
					busCounter += getRandomNumber();


			} catch (InterruptedException e) {
				
				System.err.println("Error occurred while collecting traffic data: " + e.getMessage());
				break;
			}
			numOfTrafficScans--;   // decrease number of traffic scan
		}

		getAnomalies();            // check traffic anomalies
	}
	
	
	
	/***
	 * Method generates a random number.
	 * 
	 * It uses an instance of the Random class
	 * **/
	private int getRandomNumber() {
		
		int ranNumOfVehicles = randomNumber.nextInt(20);  // generate a random number between 0 and 20
		return ranNumOfVehicles;
	}
	
	
	/***
	 * Method detects any traffic anomalies such as;
	 * 
	 * - Any vehicles stopped for a period of time while should be on the move
	 * - Any vehicles stopped for a period of occupying 2 different leans while should be on the move
	 * **/
	private int getAnomalies() {
		
		int[] chancesArray = new int[] { 0, 0, 1};          // array of possible anomalies during traffic scan
		int randomNum = randomNumber.nextInt(chancesArray.length);
		anomalies = chancesArray[randomNum];
		if (anomalies==1) {
			System.out.println("ALERT !! " + anomalies + " anomalies encountered. "
					+ "Please check camera for anomalies and turn off alert "
					+ "or emergency services will be allert in 10 seconds");
		}
		return anomalies;
	}

	
	/****
	 * Method prints the total of vehicles counted during the traffic scan cycle.
	 * 
	 * - Total number of cars
	 * - Total number of trucks
	 * - Total number of bus
	 * - Total number of bikes
	 **/
	private void printVehiclesCount() {
		String str = "";
		str += "\nCars " + carCounter;
		str += "\nTrucks " + truckCounter;
		str += "\nBikes " + bikeCounter;
		str += "\nBuses " + busCounter;
		str += "\nTraffic anomalies " + anomalies;
		System.out.println(str);
	}
	
	
	//setters 
	
	/**
	 * Set setCycleTime
	 */
	public void setCycleTime(int scanTime) {
		this.scanTime = scanTime;
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


}
