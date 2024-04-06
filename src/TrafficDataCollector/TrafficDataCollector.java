/**
 * 
 */
package TrafficDataCollector;

import java.sql.Time;
import java.time.LocalTime;
import java.util.Random;

/**
 * 
 */
public class TrafficDataCollector {
	
	private final int SYSTEMID = 300;
	private int scanTime;
	private LocalTime scanTimeEnd;
	private int numOfTrafficScans;
	private int carCounter;
	private int truckCounter;
	private int bikeCounter;
	private int busCounter;
	private Random randomNumber;
	
	/**
	 * 
	 * **/
	public TrafficDataCollector(int scanTime, int numOfTrafficScans) {
		
		this.numOfTrafficScans = numOfTrafficScans;
		this.scanTime = scanTime;
		this.scanTimeEnd = null;
		this.bikeCounter = 0;
		this.carCounter = 0;
		this.truckCounter = 0;
		this.busCounter = 0;
		this.randomNumber = new Random();
	}
	
	
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
	private void startDataCollector() {
		
		int numOfTrafficScans = 3;   // set number of traffic scans per cycle
		
		while(numOfTrafficScans >0) {
			try {
				Thread.sleep(2000);    // delay traffic scan n seconds
				
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
		
		printVehiclesCount();     // prints total of vehicles per cycle
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
		System.out.println(str);
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
	

	//setters 
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
	public int getNumOfTrafficScans() {
		return numOfTrafficScans;
	}

	public int getBusCounter() {
		return busCounter;
	}

	public int getCarCounter() {
		return carCounter;
	}


	public int getTruckCounter() {
		return truckCounter;
	}


	public int getBikeCounter() {
		return bikeCounter;
	}

	public int getSYSTEMID() {
		return SYSTEMID;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
                                                        // 2 seconds, 3 scans
		TrafficDataCollector tdc = new TrafficDataCollector(2 ,3);
		
		tdc.startDataCollector();

	}

}
