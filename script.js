(() => {
  const path = location.pathname.split("/").pop() || "index.html";
  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    window.addEventListener("mousemove", e => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  document.querySelectorAll(".reveal").forEach(el => {
    const io = new IntersectionObserver(entries => entries.forEach(x => {
      if (x.isIntersecting) { x.target.classList.add("revealed"); io.unobserve(x.target); }
    }), {threshold:.15});
    io.observe(el);
  });

  const heroVisual = document.getElementById("heroVisual");
  if (heroVisual) {
    window.addEventListener("mousemove", e => {
      const x = (e.clientX / innerWidth - .5) * 10;
      const y = (e.clientY / innerHeight - .5) * 10;
      heroVisual.style.transform = `translate(${x}px,${y}px)`;
    });
  }

  if (path === "health.html" || document.getElementById("healthForm")) initForm();
  if (path === "result.html" || document.getElementById("bmiValue")) renderResult();

  function initForm() {
    const form = document.getElementById("healthForm");
    if (!form) return;
    let current = 1;
    const panels = [...document.querySelectorAll(".form-step")];
    const steps = [...document.querySelectorAll(".journey .step")];

    function showStep(n) {
      current = Math.max(1, Math.min(5, n));
      panels.forEach(p => p.classList.toggle("active", Number(p.dataset.panel) === current));
      steps.forEach(s => {
        const n = Number(s.dataset.step);
        s.classList.toggle("active", n === current);
        s.classList.toggle("done", n < current);
      });
      window.scrollTo({top:0, behavior:"smooth"});
    }
    document.querySelectorAll(".next-btn").forEach(b => b.addEventListener("click", () => {
      if (current === 1 && !document.getElementById("age").value) {
        alert("Please enter your age to continue."); return;
      }
      if (current === 2 && (!document.getElementById("height").value || !document.getElementById("weight").value)) {
        alert("Please enter height and weight to calculate BMI."); return;
      }
      showStep(current + 1);
    }));
    document.querySelectorAll(".prev-btn").forEach(b => b.addEventListener("click", () => showStep(current - 1)));

    document.querySelectorAll('input[name="condition"]').forEach(box => box.addEventListener("change", e => {
      if (e.target.value === "None" && e.target.checked) {
        document.querySelectorAll('input[name="condition"]').forEach(x => { if (x.value !== "None") x.checked = false; });
      } else if (e.target.value !== "None" && e.target.checked) {
        const none = document.querySelector('input[name="condition"][value="None"]');
        if (none) none.checked = false;
      }
    }));

    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = {
        name: val("name") || "there",
        age: num("age"), gender: val("gender"),
        height: num("height"), weight: num("weight"),
        sugar: num("sugar"), systolic: num("systolic"), diastolic: num("diastolic"),
        cholesterol: num("cholesterol"),
        conditions: [...document.querySelectorAll('input[name="condition"]:checked')].map(x => x.value),
        activity: checked("activity"), sleep: checked("sleep"), water: checked("water")
      };
      data.bmi = data.height && data.weight ? data.weight / Math.pow(data.height / 100, 2) : null;
      sessionStorage.setItem("healthCheckData", JSON.stringify(data));
      location.href = "result.html";
    });
  }

  function val(id){ return document.getElementById(id)?.value.trim() || ""; }
  function num(id){ const n = parseFloat(document.getElementById(id)?.value); return Number.isFinite(n) ? n : null; }
  function checked(name){ return document.querySelector(`input[name="${name}"]:checked`)?.value || ""; }

  function renderResult() {
    const raw = sessionStorage.getItem("healthCheckData");
    if (!raw) { location.href = "health.html"; return; }
    const d = JSON.parse(raw);
    const bmi = d.bmi;
    document.getElementById("hello").textContent = `Hello, ${d.name} 👋`;
    const bmiValue = document.getElementById("bmiValue");
    const bmiLabel = document.getElementById("bmiLabel");
    if (bmi) {
      bmiValue.textContent = bmi.toFixed(1);
      let label = bmi < 18.5 ? "Underweight" : bmi < 25 ? "Normal" : bmi < 30 ? "Overweight" : "Obesity range";
      bmiLabel.textContent = label;
      const deg = Math.min(Math.max((bmi / 40) * 360, 15), 350);
      document.getElementById("bmiRing").style.background = `conic-gradient(var(--primary) ${deg}deg,#e5eee8 ${deg}deg)`;
    }
    document.getElementById("bpValue").textContent = d.systolic && d.diastolic ? `${d.systolic}/${d.diastolic} mmHg` : "Not provided";
    document.getElementById("sugarValue").textContent = d.sugar ? `${d.sugar} mg/dL` : "Not provided";
    document.getElementById("cholValue").textContent = d.cholesterol ? `${d.cholesterol} mg/dL` : "Not provided";
    document.getElementById("activityValue").textContent = d.activity ? ({low:"< 30 min",moderate:"30–60 min",high:"> 60 min"}[d.activity]) : "Not provided";

    const foods = [
      "Build meals around vegetables, fruits and other minimally processed foods.",
      "Include suitable protein sources such as eggs, fish, beans or lean meats.",
      "Choose whole-grain options where appropriate.",
      "Limit excess added sugar and highly processed foods.",
      "Drink water regularly and adjust intake to your needs and environment."
    ];
    const exercises = [
      "Aim toward regular moderate activity such as brisk walking when appropriate.",
      "Add strength exercises on suitable days to support muscle and function.",
      "Include gentle stretching or mobility work.",
      "Start gradually and increase activity according to your ability."
    ];
    const habits = [
      "Keep a consistent sleep routine and aim for enough sleep.",
      "Take movement breaks if you sit for long periods.",
      "Keep track of health readings that your clinician has recommended.",
      "Build small habits that you can maintain consistently."
    ];
    if (d.activity === "low") exercises.unshift("Consider gradually increasing daily movement from your current level.");
    if (d.water === "low") habits.unshift("Pay extra attention to regular hydration throughout the day.");
    if (d.sleep === "low") habits.unshift("Work toward a more regular and sufficient sleep schedule.");
    if (bmi >= 25) foods.unshift("Consider balanced portions and more fiber-rich foods as part of a sustainable routine.");
    if (bmi && bmi < 18.5) foods.unshift("If weight gain is a goal, consider nutrient-dense meals and discuss your needs with a professional.");
    if (d.systolic && d.diastolic && (d.systolic >= 140 || d.diastolic >= 90)) habits.unshift("Your entered blood pressure is elevated; consider discussing it with a healthcare professional.");
    if (d.sugar && d.sugar >= 126) habits.unshift("Your entered blood sugar may warrant professional review, depending on how and when it was measured.");
    if (d.cholesterol && d.cholesterol >= 200) foods.unshift("Consider discussing your cholesterol result with a healthcare professional and reviewing your overall diet.");

    fill("foodList", foods.slice(0,6)); fill("exerciseList", exercises.slice(0,5)); fill("habitList", habits.slice(0,6));
    let next = "Keep building consistent healthy habits and monitor the indicators that matter to you.";
    if (bmi >= 30) next = "Because your BMI falls in the obesity range, consider discussing a healthy, sustainable plan with a qualified professional.";
    else if (bmi >= 25) next = "Your BMI is above the standard healthy range; focus on sustainable activity and balanced nutrition rather than rapid changes.";
    else if (bmi && bmi < 18.5) next = "Your BMI is below the standard healthy range; consider discussing nutrition and your personal goals with a qualified professional.";
    if ((d.systolic && d.systolic >= 140) || (d.diastolic && d.diastolic >= 90)) next = "Because your entered blood pressure is high, consider arranging a professional check and avoid relying on this tool alone.";
    document.getElementById("nextStep").textContent = next;
  }
  function fill(id, arr){ document.getElementById(id).innerHTML = arr.map(x => `<li>${escapeHtml(x)}</li>`).join(""); }
  function escapeHtml(s){ return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m])); }
})();