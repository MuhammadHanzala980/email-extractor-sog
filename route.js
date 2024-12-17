const express = require("express");
const Client = require("./schema");
const validator = require("validator");
const path = require("path");

const imagesDirectory = path.join(__dirname, "images");

const router = express.Router();



const axios = require('axios');

// Replace with your IPAPI access key if you have one
// const IPAPI_URL = 'https://ipapi.co';



router.use("/images", async (req, res, next) => {
  const { t, firstName } = req.query;
  const email = t;
  console.log(req.query)
  // const ip =
  //   req.headers['x-forwarded-for'] ||
  //   req.headers['x-real-ip'] ||
  //   req.headers['cg-connecting-ip'] ||
  //   req.socket.remoteAddress


  try {
    // if (email == "{{email}}" || email == "") {
    //   return express.static(imagesDirectory)(req, res, next);
      
    // }
    
    // if (!email || !validator.isEmail(email)) {
    //   console.log(email)
    //   console.log("Email not avauilable >>>>>>>", email)
    //   return res.status(400).send("Image not found");
    // }


    if (email) {

      const existingClient = await Client.findOne({ email });

      if (!existingClient) {
        const newClientData = { email };

        if (firstName) newClientData.firstName = firstName;
          const newClient = new Client(newClientData);
          console.log(newClient, "new client")
          const savedClient = await newClient.save();

          console.log("Email saved to database:", savedClient);
        
      } else {
        console.log("Email already existss")
      }
    }

    return express.static(imagesDirectory)(req, res, next);
  } catch (error) {
    // Pass error to global error handler middleware
    next(error);
  }
});
 
router.get("/clients", async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    next(error);
  }
});

router.get("/emails", async (req, res, next) => {
  try {
    // Fetch all clients from the database
    const clients = await Client.find();

    // Extract email addresses from clients and create an array
    const emails = clients.map(client => client.email);

    // Return the array of email addresses as JSON response
    res.json(emails);
  } catch (error) {
    // Pass any errors to the global error handler middleware
    next(error);
  }
});

module.exports = router;
