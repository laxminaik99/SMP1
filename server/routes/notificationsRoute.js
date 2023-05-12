const router = require("express").Router();
const Notification = require("../models/notificationsModel");
const authMiddleware = require("../middlewares/authMiddleware");

//add a notifications
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    await newNotification.save();
    res.send({
      success: true,
      message: "Notifications added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all notifications by user
router.get("/get-all-notifications", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data:notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


//delete a notification
router.delete("/delete-notifications/:id", authMiddleware, async (req, res) => {
    try {
     await Notification.findByIdAndDelete(req.params.id);
      res.send({
        success: true,
        message: "Notifications deleted successfully",
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

//read all notifications by user
router.put("/read-all-notifications", authMiddleware, async (req, res) => {
    try {
      await Notification.updateMany(
        {user:req.body.userId, read:false},
        { $set: { read:true }}
      );
      res.send({
        success: true,
        message: "all notifications marked as read",
      });

    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  });

module.exports=router;
