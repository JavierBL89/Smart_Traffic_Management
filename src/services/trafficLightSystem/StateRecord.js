/**
 * Javier Bastande
 */
class StateRecord {
    // vars
    static tlsID;
    static state;
    constructor(tlsID, newState) {
        StateRecord.tlsID = tlsID;
        StateRecord.state = newState;
    }

    // getters

    /**
     * @returns the tlsID
     */
    getTLSID() {
        return StateRecord.tlsID;
    }

    /**
     * Get state
     * @returns the state
     */
    getState() {
        return StateRecord.state;
    }

    // setters

    /**
     * @param tlsID the tlsID to set
     */
    setTLSID(tlsID) {
        StateRecord.tlsID = tlsID;
    }

    /**
     * Set state
     * @param state the state to set
     */
    setState(state) {
        StateRecord.state = state;
    }
}
