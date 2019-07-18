const express = require("express");
const router = express.Router();
const eventsCtrl = require("../api/controllers/event");

router.use((req, res, next) => {
    const origin = req.get('origin');
  
    // TODO Add origin validation
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
  
    // intercept OPTIONS method
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
    } else {
      next();
    }
  });

router.get("/", eventsCtrl.getAll);
router.post("/", eventsCtrl.create);
router.get("/:id", eventsCtrl.getById);
router.put("/:id", eventsCtrl.updateById);
router.delete("/:id", eventsCtrl.deleteById);
router.delete("/", eventsCtrl.deleteAll);

module.exports = router;
