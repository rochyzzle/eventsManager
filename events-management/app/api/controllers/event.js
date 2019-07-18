const { eventModel } = require("../models/event");

module.exports = {
  getById: function (req, res, next) {
    console.log("getting event with id", req.params.id);
    eventModel.findById(req.params.id, function (err, eventInfo) {
      if (err) {
        next(err);
      } else {
        if (!!eventInfo) {
          res.json({
            status: "success",
            message: "event found!!!",
            data: { event: eventInfo }
          });
        } else {
          console.log("event with id: ", req.params.id, " was not found");
          res.status(404).json({ message: "Not found" });
        }
      }
    });
  },

  getAll: function (req, res, next) {
    console.log("getting all events");
    let eventsList = [];

    eventModel.find({}, function (err, events) {
      if (err) {
        next(err);
      } else {
        for (let event of events) {
          if (event.image) {
            eventsList.push({
              id: event._id,
              name: event.name,
              email: event.email,
              local: event.local,
              image: event.image,
              date: event.date,
              category: event.category,
              description: event.description
            });
          }
          else {
            eventsList.push({
              id: event._id,
              name: event.name,
              email: event.email,
              local: event.local,
              date: event.date,
              category: event.category,
              description: event.description
            });
          }

        }
        res.json({
          status: "success",
          message: "event list found!!!",
          data: { events: eventsList }
        });
      }
    });
  },

  updateById: function (req, res, next) {
    console.log("update event with id: ", req.params.id);
    eventModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        local: req.body.local,
        image: req.body.image,
        date: req.body.date,
        category: req.body.category,
        description: req.body.description
      },
      function (err, eventInfo) {
        if (err) next(err);
        else {
          if (!!eventInfo) {
            res.json({
              status: "success",
              message: "event updated successfully!!!",
              data: null
            });
          } else {
            console.log("Event with id: ", req.params.id, "was not found");
            res.status(404).json({ message: "Not found" });
          }
        }
      }
    );
  },

  deleteById: function (req, res, next) {
    console.log("deleting event with id", req.params.id);
    eventModel.findByIdAndRemove(req.params.id, function (err, eventInfo) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "event deleted successfully!!!",
          data: null
        });
      }
    });
  },

  create: function (req, res, next) {
    eventModel.find({}, function (err, events) {
      if (err) {
        next(err);
      } else {
        console.log(
          "creating event with the params: ",
          req.body.name,
          req.body.email,
          req.body.local,
          req.body.image,
          req.body.date,
          req.body.category,
          req.body.description
        );
        eventModel.create(
          {
            name: req.body.name,
            email: req.body.email,
            local: req.body.local,
            image: req.body.image,
            date: req.body.date,
            category: req.body.category,
            description: req.body.description
          },
          function (err, result) {
            if (err) next(err);
            else
              res.json({
                status: "success",
                message: "event added successfully!!!",
                data: null
              });
          }
        );

      }
    });
  },

  deleteAll: function (req, res, next) {
    console.log('deleting all events');
    eventModel.deleteMany({}, function (err, eventInfo) {
      if (err) next(err);
      else {
        res.json({
          status: "success",
          message: "events deleted successfully!!!",
          data: null
        });
      }
    })
  },
};

