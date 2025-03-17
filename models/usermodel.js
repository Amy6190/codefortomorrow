const db = require('../config/db.js');


exports.getusers = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user';
      db.query(sql,  (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };

  exports.getuserbyemail = (email) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE email = ?';
      db.query(sql,[email],  (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  };

  exports.saveuserdetails = (data , enpas) => {
    let { fname , lname , email  , user_role} = data;
    if (lname === undefined){
        lname = 'Na'
    }
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user (fname, lname, email, password , user_role) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [fname, lname, email, enpas ,user_role], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  };

  exports.gettoken = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'Select * FROM logindetails WHERE user_id = ?';
        db.query(sql, [id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  };

  exports.deltetoken = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM logindetails WHERE user_id = ?';
        db.query(sql, [id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  };

  exports.inserttoken = (id,token) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO logindetails (user_id, authtoken) VALUES (?, ?)';
        db.query(sql, [id , token], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  };

  exports.getUsersJwtDetails = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'Select * FROM logindetails WHERE authtoken = ?';
        db.query(sql, [id], (err, result) => {
          if (err) reject(err);
          resolve(result);
        });
      });
  };