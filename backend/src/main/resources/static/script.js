document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("healthForm");
    const steps = document.querySelectorAll(".form-step");
    const journeySteps = document.querySelectorAll(".journey .step");

    let currentStep = 1;

    // -----------------------------
    // STEP NAVIGATION
    // -----------------------------

    function showStep(stepNumber) {

        steps.forEach(step => {
            step.classList.remove("active");

            if (Number(step.dataset.panel) === stepNumber) {
                step.classList.add("active");
            }
        });

        journeySteps.forEach(step => {
            const number = Number(step.dataset.step);

            step.classList.remove("active", "completed");

            if (number === stepNumber) {
                step.classList.add("active");
            } else if (number < stepNumber) {
                step.classList.add("completed");
            }
        });

        currentStep = stepNumber;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // -----------------------------
    // NEXT BUTTONS
    // -----------------------------

    document.querySelectorAll(".next-btn").forEach(button => {

        button.addEventListener("click", () => {

            if (!validateStep(currentStep)) {
                return;
            }

            if (currentStep < 5) {
                showStep(currentStep + 1);
            }

        });

    });


    // -----------------------------
    // BACK BUTTONS
    // -----------------------------

    document.querySelectorAll(".prev-btn").forEach(button => {

        button.addEventListener("click", () => {

            if (currentStep > 1) {
                showStep(currentStep - 1);
            }

        });

    });


    // -----------------------------
    // STEP VALIDATION
    // -----------------------------

    function validateStep(step) {

        if (step === 1) {

            const name = document.getElementById("name").value.trim();
            const age = document.getElementById("age").value;
            const gender = document.getElementById("gender").value;

            if (!name) {
                alert("Please enter your name.");
                return false;
            }

            if (!age || age < 1 || age > 120) {
                alert("Please enter a valid age.");
                return false;
            }

            if (!gender) {
                alert("Please select your gender.");
                return false;
            }
        }


        if (step === 2) {

            const height = document.getElementById("height").value;
            const weight = document.getElementById("weight").value;

            if (!height || height < 50 || height > 250) {
                alert("Please enter a valid height.");
                return false;
            }

            if (!weight || weight < 10 || weight > 400) {
                alert("Please enter a valid weight.");
                return false;
            }
        }

        return true;
    }


    // -----------------------------
    // FORM SUBMISSION
    // -----------------------------
if (form) {
    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!validateStep(1) || !validateStep(2)) {
            return;
        }

        const button = form.querySelector('button[type="submit"]');

        button.disabled = true;
        button.innerText = "Analyzing...";
	
	


        // -----------------------------
        // GET CONDITIONS
        // -----------------------------

        const conditions = [];

        document.querySelectorAll(
            'input[name="condition"]:checked'
        ).forEach(checkbox => {

            conditions.push(checkbox.value);

        });



        // -----------------------------
        // BLOOD PRESSURE
        // -----------------------------

        const systolic =
            document.getElementById("systolic").value;

        const diastolic =
            document.getElementById("diastolic").value;

        let bloodPressure = "";

        if (systolic && diastolic) {
            bloodPressure = `${systolic}/${diastolic}`;
        }


        // -----------------------------
        // CONDITION FLAGS
        // -----------------------------

        const hasDiabetes =
            conditions.includes("Diabetes");

        const hasHypertension =
            conditions.includes("High Blood Pressure");

        const hasAsthma =
            conditions.includes("Asthma");

        const hasHeartDisease =
            conditions.includes("Heart Disease");


        // -----------------------------
        // CREATE DATA OBJECT
        // -----------------------------

        const healthData = {

            name: document.getElementById("name").value.trim(),

            age: Number(
                document.getElementById("age").value
            ),

            gender:
                document.getElementById("gender").value,

            height: Number(
                document.getElementById("height").value
            ),

            weight: Number(
                document.getElementById("weight").value
            ),

            sugar: Number(
                document.getElementById("sugar").value
            ) || 0,

            bloodPressure: bloodPressure,

            cholesterol: Number(
                document.getElementById("cholesterol").value
            ) || 0,

            heartAttack: hasHeartDisease,

            diabetes: hasDiabetes,

            asthma: hasAsthma,

            hypertension: hasHypertension
        };


        console.log("Sending health data:", healthData);


        // -----------------------------
        // SEND TO JAVA BACKEND
        // -----------------------------

        try {

            const response = await fetch(
                "http://localhost:8080/api/health/check",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(healthData)
                }
            );


            if (!response.ok) {
                throw new Error(
                    "Backend returned an error."
                );
            }


            const result = await response.json();

            console.log("Backend result:", result);


            // -----------------------------
            // SAVE RESULT
            // -----------------------------

            sessionStorage.setItem(
                "healthResult",
                JSON.stringify(result)
            );


            // Save lifestyle information too
            const lifestyle = {

                activity:
                    document.querySelector(
                        'input[name="activity"]:checked'
                    )?.value || "",

                sleep:
                    document.querySelector(
                        'input[name="sleep"]:checked'
                    )?.value || "",

                water:
                    document.querySelector(
                        'input[name="water"]:checked'
                    )?.value || ""
            };


            sessionStorage.setItem(
                "healthLifestyle",
                JSON.stringify(lifestyle)
            );


            // -----------------------------
            // GO TO RESULT PAGE
            // -----------------------------

            window.location.href = "result.html";


        } catch (error) {

            console.error(
                "Health check error:",
                error
            );

            alert(
                "Unable to connect to the HealthCheck backend. " +
                "Please make sure the Spring Boot server is running."
            );

            button.disabled = false;
            button.innerText = "Analyze My Health ↗";
        }

    });

}
    // Show first step
    showStep(1);

});