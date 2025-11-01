document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("feedbackForm");
  const feedbackList = document.getElementById("feedbackList");

  // Load stored feedbacks
  const savedFeedback = JSON.parse(localStorage.getItem("feedbackData")) || [];
  savedFeedback.forEach(addFeedbackToList);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const district = document.getElementById("district").value.trim();
    const feedback = document.getElementById("feedback").value.trim();

    if (!name || !district || !feedback) {
      alert("Please fill all fields.");
      return;
    }

    const feedbackData = { name, district, feedback };
    savedFeedback.push(feedbackData);
    localStorage.setItem("feedbackData", JSON.stringify(savedFeedback));

    addFeedbackToList(feedbackData);
    form.reset();

    alert("✅ Feedback submitted successfully!");
  });

  function addFeedbackToList(item) {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong> (${item.district}) <br>${item.feedback}
      </div>
      <button class="delete-btn">Delete</button>
    `;

    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      const index = savedFeedback.findIndex(
        (fb) => fb.name === item.name && fb.district === item.district && fb.feedback === item.feedback
      );
      if (index !== -1) {
        savedFeedback.splice(index, 1);
        localStorage.setItem("feedbackData", JSON.stringify(savedFeedback));
      }
      li.remove();
    });

    feedbackList.prepend(li);
  }
});
