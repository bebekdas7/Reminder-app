import reminderModel from "../models/dataModel.js";

class siteController {
  static sendReminder = async (reminder, client) => {
    try {
      const message = await client.messages.create({
        body: reminder.reminderMsg,
        from: "+13346001599",
        to: `+91${reminder.remindNumber}`,
      });
      console.log(`Reminder sent for "${reminder.medName}": ${message.sid}`);
    } catch (error) {
      console.error(
        `Failed to send reminder for "${reminder.medName}":`,
        error
      );
    }
  };

  static scheduleReminders = async (client) => {
    try {
      const reminders = await reminderModel.find();

      reminders.forEach((reminder) => {
        const now = new Date();
        const reminderTime = new Date(reminder.remindAt);
        // console.log(reminderTime);

        const finalTime = reminderTime - now;

        if (finalTime > 0) {
          setTimeout(() => {
            this.sendReminder(reminder, client);
            console.log("Done");
          }, finalTime);
        }
      });

      console.log("Scheduled reminders");
    } catch (error) {
      console.error("Error scheduling reminders:", error);
    }
  };

  static addMedicine = async (req, res) => {
    const { medName, reminderMsg, remindAt, remindNumber } = req.body;
    try {
      const newMed = new reminderModel({
        medName,
        reminderMsg,
        remindAt,
        remindNumber,
      });
      await newMed.save();
      res.json(newMed);
      console.log("Saved");
    } catch (error) {
      console.log("Coundn't add medicine", error);
    }
  };

  static getAllMedicine = async (req, res) => {
    try {
      const result = await reminderModel.find();
      res.json(result);
    } catch (error) {
      console.log("Cannot Fetch Reminders", error);
    }
  };

  static deleteMed = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      await reminderModel.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (error) {
      console.log("Cannot delete", error);
    }
  };
}
export default siteController;
