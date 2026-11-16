
import { useState } from "react";

const initialForm = {
  name: "",
  room: "",
  category: "",
  urgency: "Normal",
  issue: "",
  date: "",
  startTime: "",
  endTime: "",
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [photo, setPhoto] = useState(null);
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePhoto = (e) => {
    const selectedFile = e.target.files[0];

    setError("");
    setMessage("");

    if (!selectedFile) {
      setPhoto(null);
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      setPhoto(null);
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("Image must not exceed 5MB.");
      e.target.value = "";
      setPhoto(null);
      return;
    }

    setPhoto(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!photo) {
      setError("Please upload a photo of the maintenance issue.");
      return;
    }

    if (form.endTime <= form.startTime) {
      setError("Your preferred end time must be later than your start time.");
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...form,
      photoName: photo.name,
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    };

    setRequests((previous) => [newRequest, ...previous]);

    setForm(initialForm);
    setPhoto(null);
    e.target.reset();

    setMessage(
      "Your maintenance request has been received! Your preferred time is awaiting management confirmation."
    );
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}

        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Livingstone Hostel
          </h1>

          <p className="mt-2 text-slate-600">
            Tenant Maintenance Request Portal
          </p>
        </header>

        {/* Request Form */}

        <section className="rounded-2xl bg-white p-6 shadow-lg">

          <h2 className="mb-2 text-xl font-bold text-slate-800">
            Report a Maintenance Issue
          </h2>

          <p className="mb-6 text-sm text-slate-500">
            Tell us what needs attention and when you would be available.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Tenant Details */}

            <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-1 block font-medium">
                  Tenant Name
                </label>

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-medium">
                  Room Number
                </label>

                <input
                  name="room"
                  value={form.room}
                  onChange={handleChange}
                  placeholder="e.g. Room 07"
                  className="w-full rounded-lg border p-3"
                  required
                />
              </div>

            </div>

            {/* Maintenance Category */}

            <div>
              <label className="mb-1 block font-medium">
                Maintenance Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white p-3"
                required
              >
                <option value="">Select a category</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Doors and Windows">Doors and Windows</option>
                <option value="Furniture">Furniture</option>
                <option value="Painting">Painting</option>
                <option value="Internet">Internet</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Urgency */}

            <div>
              <label className="mb-1 block font-medium">
                How urgent is the issue?
              </label>

              <select
                name="urgency"
                value={form.urgency}
                onChange={handleChange}
                className="w-full rounded-lg border bg-white p-3"
              >
                <option value="Low">Low - Minor inconvenience</option>
                <option value="Normal">Normal - Routine maintenance</option>
                <option value="High">High - Requires prompt attention</option>
                <option value="Emergency">Emergency - Immediate attention</option>
              </select>
            </div>

            {/* Issue Description */}

            <div>
              <label className="mb-1 block font-medium">
                Describe the Problem
              </label>

              <textarea
                name="issue"
                value={form.issue}
                onChange={handleChange}
                placeholder="Describe the damage or problem in detail..."
                rows="4"
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Photo Upload */}

            <div>
              <label className="mb-1 block font-medium">
                Upload Photo Evidence
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="w-full rounded-lg border p-3"
                required
              />

              <p className="mt-1 text-xs text-slate-500">
                Upload a clear image of the problem (maximum 5MB).
              </p>

              {photo && (
                <p className="mt-2 text-sm text-green-700">
                  Selected: {photo.name}
                </p>
              )}
            </div>

            {/* Preferred Date */}

            <div>
              <label className="mb-1 block font-medium">
                Preferred Maintenance Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={new Date().toLocaleDateString("en-CA")}
                className="w-full rounded-lg border p-3"
                required
              />
            </div>

            {/* Preferred Time Window */}

            <div>
              <label className="mb-2 block font-medium">
                Your Availability
              </label>

              <p className="mb-3 text-sm text-slate-500">
                Select a time window when you can grant access to your room.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1 block text-sm">
                    Available From
                  </label>

                  <input
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm">
                    Available Until
                  </label>

                  <input
                    type="time"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    className="w-full rounded-lg border p-3"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Feedback Messages */}

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {message && (
              <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                <strong>Request received!</strong>
                <p className="mt-1">{message}</p>
              </div>
            )}

            {/* Submit */}

            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-700"
            >
              Submit Maintenance Request
            </button>

          </form>

          <p className="mt-5 text-center text-xs text-slate-500">
            Your preferred time is not a confirmed appointment.
            Management will review and communicate the agreed schedule.
          </p>

        </section>

        {/* Local Prototype Request Preview */}

        <section className="mt-8">

          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Submitted Requests (Prototype Preview)
          </h2>

          {requests.length === 0 && (
            <p className="rounded-xl bg-white p-5 text-sm text-slate-500">
              No requests submitted in this session yet.
            </p>
          )}

          <div className="space-y-4">

            {requests.map((request) => (
              <article
                key={request.id}
                className="rounded-xl bg-white p-5 shadow-sm"
              >

                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">

                  <h3 className="font-bold">
                    {request.category} - Room {request.room}
                  </h3>

                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                    {request.status}
                  </span>

                </div>

                <p className="text-sm">
                  <strong>Tenant:</strong> {request.name}
                </p>

                <p className="text-sm">
                  <strong>Urgency:</strong> {request.urgency}
                </p>

                <p className="mt-2 text-sm">
                  <strong>Issue:</strong> {request.issue}
                </p>

                <p className="mt-2 text-sm">
                  <strong>Preferred date:</strong> {request.date}
                </p>

                <p className="text-sm">
                  <strong>Availability:</strong> {request.startTime} - {request.endTime}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  Photo: {request.photoName}
                </p>

              </article>
            ))}

          </div>

        </section>

      </div>

    </main>
  );
}
