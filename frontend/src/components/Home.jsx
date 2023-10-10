import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/home.css";

const Home = () => {
  const [reminderMsg, setReminderMsg] = useState("");
  const [medName, setMedName] = useState("");
  const [remindAt, setRemindAt] = useState("");
  const [remindNumber, setRemindNumber] = useState("");
  const [reminders, setReminders] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/post", {
      medName,
      reminderMsg,
      remindAt,
      remindNumber,
    });

    const res = await axios.get("http://localhost:4000/api/getAll");
    setReminders(res.data);
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4000/api/delete/${id}`);

    const res = await axios.get("http://localhost:4000/api/getAll");
    setReminders(res.data);
  };

  useEffect(() => {
    const getReminder = async () => {
      const res = await axios.get("http://localhost:4000/api/getAll");
      setReminders(res.data);
    };
    getReminder();
  }, []);
  // console.log(reminders);

  return (
    <main className="d-flex m-1 gap-1 justify-content-center">
      <section className="add col-sm-5">
        <h1 className="text-center p-1 text-success alert alert-warning ">
          Add Medicines
        </h1>
        <form className="p-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Medicine Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Medicene Name.."
              value={medName}
              required
              onChange={(e) => setMedName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Reminder message
            </label>
            <input
              type="text"
              className="form-control"
              id="message"
              placeholder="Enter Message here.."
              value={reminderMsg}
              onChange={(e) => setReminderMsg(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="datetime" className="form-label">
              Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="time"
              required
              onChange={(e) => setRemindAt(e.target.value)}
              value={remindAt}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Number" className="form-label">
              Contact Number
            </label>
            <input
              type="number"
              className="form-control"
              id="number"
              required
              placeholder="Enter Contact Number.."
              onChange={(e) => setRemindNumber(e.target.value)}
              value={remindNumber}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>

      <section className="disp col-sm-6">
        <h1 className="text-center p-1 text-warning alert alert-success">
          Medicine Reminders
        </h1>

        {reminders.length > 0 ? (
          reminders.map((item) => (
            <div
              className="med-container d-flex justify-content-start p-3"
              key={item._id}
            >
              <div className="med p-2">
                <h6 className="d-inline-block pe-2">Med Name:</h6>
                <p className="d-inline-block">{item.medName}</p>
                <br />
                <h6 className="d-inline-block pe-2">Message:</h6>
                <p className="d-inline-block">{item.reminderMsg}</p>
                <br />
                <h6 className="d-inline-block pe-2">Scheduled:</h6>
                <p className="d-inline-block">
                  {new Date(
                    item.remindAt.toLocaleString(undefined, {
                      timezone: "Asia/Kolkata",
                    })
                  ).toLocaleString()}
                </p>
                <br />
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>Nothing here</div>
        )}
      </section>
    </main>
  );
};

export default Home;
