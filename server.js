// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
const stripe = require("stripe")(
  "sk_test_51OeQ5QIX88Tt2ErkV0AVc7tJ6zEGyKa3KiTQpoqn0Dlg5TLrL84EO9K42gGdl1gwsKYXHu1GrniH4uBtIrBezF4p00I7f6RN5U"
);
const express = require("express");
const app = express();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_e1vadKKWDWc3HqZY9EP77vhhX9Cst5mV";

app.get("/", (req, res) => {
  res.status(200).json({message: "Ok"});
});

app.post(
  "/webhook",
  express.raw({type: "application/json"}),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "invoice.created":
        const invoiceCreated = event.data.object;
        // Then define and call a function to handle the event invoice.created
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.listen(4242, () => console.log("Running on port 4242"));
