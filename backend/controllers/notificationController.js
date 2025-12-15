const Notification = require("../models/Notification");

exports.getAllNotifications = async (req, res) => {
  const notifications = await Notification.find();
  res.json(notifications);
};

exports.addNotification = async (req, res) => {
  const notification = await Notification.create(req.body);
  res.json(notification);
};

exports.updateNotification = async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(notification);
};

exports.deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: "Notification deleted" });
};
