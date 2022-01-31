const express = require("express");
const router = express.Router();
const db = require("./db.json");

let appointment_unique_id = db.Appointments.length;

router.get("/get-all-doctors", (req, res) => {
    try{
        res.status(200).json(db["Doctors"]);
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.post("/get-appointments-by-doc-and-day", (req, res) => {
    try{
        const { doc_id, day } = req.body;

        let appointments = [];
        db["Appointments"].forEach( element => {
            if(element.doc_id === doc_id && element.day === day)
                appointments.push(element);
        })

        res.status(200).json(appointments);
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.delete("/remove-appointment-by-id", (req, res) => {
    try{
        const { app_id } = req.body;

        let apps = db["Appointments"].filter( element => element.id !== app_id );
        db["Appointments"] = apps;

        res.status(200).send();
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.post("/add-appointment", (req, res) => {
    try{
        const { doc_id, day, first_name, last_name, time, kind } = req.body;

        // Validate timeslot
        //--- by unavailable time
        let z = time.slice(-4, -2);
        if(!(z === "00" || z === "15" || z === "30" || z === "45"))
            throw "Invalid time or day";

        //--- by conflicting appointments
        let conflitingApps = [];
        db["Appointments"].forEach( element => {
            if(element.doc_id === doc_id && element.day === day && element.time == time)
                conflitingApps.push(element);
        })
        if(conflitingApps.length >= 3)
            throw "Timeslot unavailable";

        const newApp = {
            "id": appointment_unique_id+1,
            "first_name": first_name,
            "last_name": last_name,
            "day": day,
            "time": time,
            "kind": kind,
            "doc_id": doc_id
        }

        db["Appointments"] = [...db["Appointments"], newApp];
        
        appointment_unique_id++;

        res.status(200).send();
    }
    catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;