/**
 * 
 */
package TrafficDataCollector;

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
    
	}

}
