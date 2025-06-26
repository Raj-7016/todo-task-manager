const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodoverride = require("method-override");
const mysql = require("mysql2");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "Todo",
    password: "Raj@7016"
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));

app.listen(port, () => {
    console.log(`app is Started at port ${port}`);
})




app.get("/home", (req, res) => {
    let q = "Select * from Pending_Tasks;"
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err }
            let tasks = result;
            res.render("index.ejs", { tasks });
        });
    } catch (err) {
        console.log(err);
    }
})

app.get("/complete", (req, res) => {
    let q = "Select * from Complete_Tasks;"
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err }
            let tasks = result;
            res.render("completedTask.ejs", { tasks });
        });
    } catch (err) {
        console.log(err);
    }
})

app.get("/complete/:id", (req, res) => {
    let { id } = req.params;
    let q = `Select * from Pending_Tasks WHERE id = "${id}";`
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err }
            let [task] = result;
            Task_date = task.Task_date;
            console.log(task.Task_date);
            try{
            let q = `INSERT INTO Complete_Tasks (id,content,Task_date) values("${task.id}","${task.content}","${task.Task_date}")`;
            connection.query(q, (err, result) => {
                if (err) { throw err }
                console.log(result);
                let q = `DELETE from Pending_Tasks WHERE id = "${id}";`
                    connection.query(q, (err, result) => {
                        if (err) { throw err }
                        console.log(result);
                        res.redirect("/complete");
                    });
                });

            }catch (err) {
        console.log(err);
    }

        });
    } catch (err) {
        console.log(err);
    }
})

app.get("/pending/:id", (req, res) => {
   let { id } = req.params;
    let q = `Select * from Complete_Tasks WHERE id = "${id}";`
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err }
            let [task] = result;
            Task_date = new Date();
            // Date = Task_date.toISOString().split("T")[0]; 
            console.log(Task_date);
            try{
            let q = `INSERT INTO Pending_Tasks (id,content,Task_date) values("${task.id}","${task.content}","${Task_date}")`;
            connection.query(q, (err, result) => {
                if (err) { throw err }
                console.log(result);
                let q = `DELETE from Complete_Tasks WHERE id = "${id}";`
                    connection.query(q, (err, result) => {
                        if (err) { throw err }
                        console.log(result);
                        res.redirect("/home");
                    });
                });

            }catch (err) {
        console.log(err);
    }

        });
    } catch (err) {
        console.log(err);
    }
})

app.get("/add", (req, res) => {
    res.render("addTask.ejs");
})

app.post("/add", (req, res) => {
    let id = uuidv4();
    let { content, Date } = req.body;
    let q = `INSERT INTO Pending_Tasks (id,content,Task_date) values("${id}","${content}","${Date}")`;
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err }
            console.log(result);
        });
    } catch (err) {
        console.log(err);
    }

    res.redirect("/home")
})



app.get("/edit/:id", (req, res) => {
    let { id } = req.params;
    let q = `Select * from Pending_Tasks WHERE id = "${id}";`
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err }
            let [task] = result;
            res.render("editTask.ejs", { task });
        })
    }catch (err) {
        console.log(err);
    } 
})

app.patch("/edit/:id", (req, res) => {
    let { id } = req.params;
    let { content, Date } = req.body;
    let q = `UPDATE Pending_Tasks SET content = "${content}",Task_date = "${Date}" WHERE id = "${id}"`;
    try {
        connection.query(q, (err, result) => {
            if (err) { throw err }
            console.log(result);
            res.redirect("/home");
        })
    }catch (err) {
        console.log(err);
    } 
})


app.delete("/pending/:id", (req, res) => {
    let { id } = req.params;
    let q = `DELETE FROM Pending_Tasks WHERE id = "${id}"`;
    try{
        connection.query(q, (err, result) => {
            if (err) { throw err }
            console.log(result);
            res.redirect("/home");
        })
    }catch (err) {
        console.log(err);
    }
   
})