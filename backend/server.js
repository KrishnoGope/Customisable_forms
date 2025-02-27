const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbConnect'); // Import the database connection

// Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// User Registration part Start ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, hashedPassword, role], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});
// End of User Registration part ...................................................................

// User Login Part start :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT id, name, role, email, password FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = results[0];
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    res.json({ 
      success: true, 
      user: {
        id: user.id,
        role: user.role,
        name: user.name
      }
    });
  });
});
// End of User Login Part ............................................................................................

// CreateForm.jsx part Start :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Create Form (Button).
app.post("/api/forms/create", (req, res) => {
  const { title, user_id, questions } = req.body;
  const sql = "INSERT INTO forms (title, user_id) VALUES (?, ?)";
  db.query(sql, [title, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: "Error creating form" });

    const form_id = result.insertId;
    const questionSQL = "INSERT INTO questions (form_id, question_text, type, options) VALUES ?";
    const questionData = questions.map(q => [form_id, q.question_text, q.type, JSON.stringify(q.options)]);

    db.query(questionSQL, [questionData], (err) => {
      if (err) return res.status(500).json({ error: "Error saving questions" });
      res.json({ message: "Form created successfully", form_id });
    });
  });
});
// End of CreateForm.jsx part ...............................................................................................

// Form list.jsx file :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Get necessary Forms as a list (If role: admin => show all. If role: user => show only his forms)
app.get("/api/forms", (req, res) => {
  const user_id = parseInt(req.query.user_id, 10); // Parse user_id as an integer

  if (user_id === 0) {  
    // When request comes from (Quiz MenuBar) Unlogged user
    db.query(
      "SELECT forms.id, forms.title, forms.user_id, users.name FROM forms JOIN users ON forms.user_id = users.id", 
      (err, results) => {
        if (err) {
          console.error("Error fetching forms with user names:", err);
          return res.status(500).json({ error: "Error retrieving data" });
        }
        return res.json(results);
      }
    );
  } else {  
    // When request comes from logged-in user
    db.query("SELECT role FROM users WHERE id = ? LIMIT 1", [user_id], (err, roleResults) => {
      if (err) {
        console.error("Error fetching user role:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (roleResults.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      //////////////////////////////////////////////////////////////////////////////
      const userRole = roleResults[0].role;
      let query;
      let queryParams = [];

      // Role-based access control
      if (userRole === "user") {
        query = `
            SELECT forms.id, forms.title, users.role, users.name  
            FROM forms 
            JOIN users ON forms.user_id = users.id 
            WHERE forms.user_id = ?;
        `;
        queryParams = [user_id];

      } else if (userRole === "admin") {
        query = "SELECT forms.id, forms.title, forms.user_id, users.name FROM forms JOIN users ON forms.user_id = users.id";
      } else {
        return res.status(403).json({ error: "Access denied: Invalid role" });
      }

      // Execute the query
      db.query(query, queryParams, (err, results) => {
        if (err) {
          console.error("Error fetching forms:", err);
          return res.status(500).json({ error: "Error retrieving forms" });
        }
        res.json(results);
      });
    });
  }
});

// Delete and update part of Fromlist.jsx file...........................................................

// Update Form Title (FromList)
app.put("/api/forms/update/:formId", (req, res) => {
  const { title } = req.body;
  db.query("UPDATE forms SET title = ? WHERE id = ?", [title, req.params.formId], (err) => {
    if (err) return res.status(500).json({ error: "Error updating form" });
    res.json({ message: "Form updated successfully" });
  });
});

// Delete a Form (WITH Related Questions & Responses) (FromList)
app.delete("/api/forms/delete/:formId", (req, res) => {
  db.query("DELETE FROM responses WHERE form_id = ?", [req.params.formId], (err) => {
    if (err) return res.status(500).json({ error: "Error deleting responses" });
    db.query("DELETE FROM questions WHERE form_id = ?", [req.params.formId], (err) => {
      if (err) return res.status(500).json({ error: "Error deleting questions" });
      db.query("DELETE FROM forms WHERE id = ?", [req.params.formId], (err) => {
        if (err) return res.status(500).json({ error: "Error deleting form" });
        res.json({ message: "Form deleted successfully" });
      });
    });
  });
});
//..........................................................................................................

// Retrive Questions from for quiz (Selected form view).............................................................
app.get("/api/forms/:formId", (req, res) => {
  db.query("SELECT q.form_id, q.question_text, q.type, q.options FROM questions q WHERE q.form_id = ?", [req.params.formId], 
    (err, results) => {
      if (err) return res.status(500).json({ error: "Error fetching questions" });
      res.json(results);
    });
});

// TakeEvaluation.jsx (Submit Response)...................................................................... 
app.post("/api/forms/submit", (req, res) => {
  const { form_id, responses } = req.body;
  const sql = "INSERT INTO responses (form_id, question_id, response_text) VALUES ?";
  const responseData = responses.map(r => [form_id, r.question_id, r.response_text]);
  
  db.query(sql, [responseData], (err) => {
    if (err) return res.status(500).json({ error: "Error submitting response" });
    res.json({ message: "Response submitted successfully" });
  });
});
//.............................................................................................................

/// Contact.jsx start ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Validate incoming data
  if (!name || !email || !message) {
      return res.status(400).send({ message: 'All fields are required.' });
  }

  const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
  db.query(query, [name, email, message], (error, results) => {
      if (error) {
          console.error('Error inserting data: ' + error.stack);
          return res.status(500).send({ message: 'Error saving message to database.' });
      }
      res.status(200).send({ message: 'Message saved successfully!', id: results.insertId });
  });
});
// Contact.jsx end ..............................................................................................

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});