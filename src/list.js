var db;
var dbSupported = false;
//Check if IndexedDB is supported in browser
if (!window.indexedDB) {
    window.alert("IndexedDB is not supported or not allowed to run");
} 
else {
    console.log("IndexDB supported");
    dbSupported = true;
}

if (dbSupported) {
    var dbOpen=indexedDB.open("TasksDB", 7);
    //DB upgrading
    dbOpen.onupgradeneeded = function(e) {
        console.log("Upgrading");
        var thisDB = this.result;

        if(!thisDB.objectStoreNames.contains("TasksStore")) {
            thisDB.createObjectStore("TasksStore", {keyPath: "id"});
        }
    }

    dbOpen.onsuccess = function(e) {
        console.log("Success");
        var store = requestDB("TasksStore", "readwrite");
        //check if there are tasks in DB, if not- make tasks!
        var getTasks = store.count("tasks");
        getTasks.onsuccess = function() {
            if (getTasks.result === 0){
                console.log("There are no tasks!")
                var tasks = {
                    id: "tasks",
                    list: [],
                }
                
                var addRequest = store.add(tasks);
                
                        addRequest.onerror = function(e) {
                            console.log("Tasks not added");
                        }
                        addRequest.onsuccess = function(e) {
                            console.log("Tasks added");
                        }
            }
            else console.log("Tasks found!")
        }

    }
    dbOpen.onerror = function(e) {
        console.log("Error");
    }
}

function requestDB(dbName, type) {
    db = dbOpen.result;
    var transaction = db.transaction([dbName], type);
    var store = transaction.objectStore(dbName); 
    return store;
}

//Function for updating tasks entry in database 
function updateTasksDatabase(id, list, e) {
    var store = requestDB("TasksStore", "readwrite");
    var getRequest = store.get(id);

    getRequest.onsuccess = function(e) {
        var result = this.result;
        result.list = list;

        var requestUpdate = store.put(result);
        requestUpdate.onerror = function(e) {
            console.log("Error");
        }
        requestUpdate.onsuccess = function(e) {
        }
    }  
}

//Function for restoring tasks info from database
function restoreTasksDatabase(callback) {
        var tasksRestore;
        var store = requestDB("TasksStore", "readonly");

        var getRequest= store.get("tasks");
        getRequest.onsuccess = function(e) {
            tasksRestore = this.result;
            callback(tasksRestore);
         }
}

export {restoreTasksDatabase, updateTasksDatabase}
