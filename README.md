# Notable Health Interview Project


## Set Up
1. Install dependencies
```
$ npm i
```

2. Run
```
$ npm start
```

3. Available on http://localhost:5000/

## End Points

- get - api/get-all-doctors

- post - api/get-appointments-by-doc-and-day
    -   body: {
            &emsp;"doc_id": {{doc_id}},  
            &emsp;"day":  {{day}}  
        }

- delete - api//remove-appointment-by-id
    -   body: {
            &emsp;"app_id": {{app_id}}  
        }
        
- post - api/add-appointment
    -   body: {
            &emsp;"doc_id": {{doc_id}},  
            &emsp;"day": {{day}},  
            &emsp;"first_name": {{first_name}},  
            &emsp;"last_name": {{last_name}},  
            &emsp;"time": {{time}},  
            &emsp;"kind": {{kind}}  
        }
