document.addEventListener("DOMContentLoaded", () => {

    // Get health result from session storage
    const storedResult = sessionStorage.getItem("healthResult");
    const storedLifestyle = sessionStorage.getItem("healthLifestyle");

    if (!storedResult) {
        console.log("No health result found.");
        return;
    }

    const result = JSON.parse(storedResult);

    const lifestyle = storedLifestyle
        ? JSON.parse(storedLifestyle)
        : {};


    // -----------------------------------
    // HELPER
    // -----------------------------------

    function setText(id, value, fallback = "Not provided") {

        const element = document.getElementById(id);

        if (!element) return;

        if (
            value === undefined ||
            value === null ||
            value === "" ||
            value === 0
        ) {
            element.textContent = fallback;
        } else {
            element.textContent = value;
        }
    }


    // -----------------------------------
    // USER NAME
    // -----------------------------------

    setText(
        "hello",
        result.name ? `Hello ${result.name} 👋` : "Hello 👋"
    );


    // -----------------------------------
    // BMI
    // -----------------------------------

    const bmi = Number(result.bmi);

    if (!isNaN(bmi) && bmi > 0) {

        setText(
            "bmiValue",
            bmi.toFixed(2)
        );

        setText(
            "bmiLabel",
            result.bmiCategory || "Calculated"
        );

    } else {

        setText("bmiValue", "--");
        setText("bmiLabel", "Not available");
    }


    // -----------------------------------
    // HEALTH INDICATORS
    // -----------------------------------

    setText(
        "bpValue",
        result.bloodPressure
    );

    setText(
        "sugarValue",
        result.sugar ? `${result.sugar} mg/dL` : null
    );

    setText(
        "cholValue",
        result.cholesterol
            ? `${result.cholesterol} mg/dL`
            : null
    );


    // -----------------------------------
    // ACTIVITY
    // -----------------------------------

    const activityText = {

        low: "Less than 30 min",

        moderate: "30–60 min",

        high: "More than 60 min"

    };

    setText(
        "activityValue",
        activityText[lifestyle.activity]
    );


    // -----------------------------------
    // BMI RING
    // -----------------------------------

    const bmiRing =
        document.getElementById("bmiRing");

    if (bmiRing && !isNaN(bmi)) {

        bmiRing.classList.remove(
            "underweight",
            "healthy",
            "overweight",
            "obese"
        );

        if (bmi < 18.5) {

            bmiRing.classList.add("underweight");

        } else if (bmi < 25) {

            bmiRing.classList.add("healthy");

        } else if (bmi < 30) {

            bmiRing.classList.add("overweight");

        } else {

            bmiRing.classList.add("obese");
        }
    }


    // -----------------------------------
    // FOOD RECOMMENDATIONS
    // -----------------------------------

    const foodList =
        document.getElementById("foodList");

    if (foodList) {

        let foods = [];

        if (bmi < 18.5) {

            foods = [
                "Include nutritious calorie-dense foods such as nuts, seeds and avocado.",
                "Choose protein-rich foods such as eggs, fish, beans and lean meat.",
                "Include whole grains, vegetables and fruits in balanced meals.",
                "Avoid skipping meals and aim for regular nutritious meals."
            ];

        } else if (bmi < 25) {

            foods = [
                "Continue eating a balanced variety of vegetables and fruits.",
                "Choose whole grains and high-fiber foods regularly.",
                "Include lean protein such as fish, eggs, beans or chicken.",
                "Limit highly processed foods and excessive added sugar."
            ];

        } else if (bmi < 30) {

            foods = [
                "Increase vegetables, fruits and other high-fiber foods.",
                "Choose lean protein and whole grains for satisfying meals.",
                "Reduce sugary drinks and highly processed snacks.",
                "Watch portion sizes and maintain balanced meals."
            ];

        } else {

            foods = [
                "Focus on vegetables, fruits, whole grains and lean protein.",
                "Choose water instead of sugary drinks when possible.",
                "Reduce highly processed and energy-dense foods.",
                "Consider discussing a personalized nutrition plan with a healthcare professional."
            ];
        }


        foodList.innerHTML = "";

        foods.forEach(food => {

            const li = document.createElement("li");

            li.textContent = food;

            foodList.appendChild(li);
        });
    }


    // -----------------------------------
    // EXERCISE RECOMMENDATIONS
    // -----------------------------------

    const exerciseList =
        document.getElementById("exerciseList");

    if (exerciseList) {

        const exercises = [

            "Start with comfortable activities such as walking.",
            "Aim to gradually build toward regular moderate physical activity.",
            "Add simple strength exercises when appropriate.",
            "Increase activity gradually rather than making sudden large changes."
        ];

        exerciseList.innerHTML = "";

        exercises.forEach(exercise => {

            const li = document.createElement("li");

            li.textContent = exercise;

            exerciseList.appendChild(li);
        });
    }


    // -----------------------------------
    // HEALTHY HABITS
    // -----------------------------------

    const habitList =
        document.getElementById("habitList");

    if (habitList) {

        const habits = [

            "Maintain a consistent sleep schedule.",
            "Stay adequately hydrated throughout the day.",
            "Take regular movement breaks if you sit for long periods.",
            "Keep track of important health measurements when appropriate.",
            "Avoid smoking and limit harmful lifestyle habits."
        ];

        habitList.innerHTML = "";

        habits.forEach(habit => {

            const li = document.createElement("li");

            li.textContent = habit;

            habitList.appendChild(li);
        });
    }


    // -----------------------------------
    // NEXT STEP
    // -----------------------------------

    const nextStep =
        document.getElementById("nextStep");

    if (nextStep) {

        if (result.bmiCategory === "Underweight") {

            nextStep.textContent =
                "Focus on balanced nutrition and gradual healthy weight gain. Consider discussing your nutrition needs with a healthcare professional.";

        } else if (result.bmiCategory === "Overweight") {

            nextStep.textContent =
                "Focus on consistent physical activity, balanced meals and sustainable healthy habits.";

        } else if (result.bmiCategory === "Obesity") {

            nextStep.textContent =
                "Consider gradually improving activity and nutrition habits and discuss a personalized plan with a qualified healthcare professional.";

        } else {

            nextStep.textContent =
                "Your BMI falls within the healthy-weight screening range. Continue maintaining balanced nutrition, regular activity and good sleep habits.";
        }
    }


    // -----------------------------------
    // MEDICAL CONDITIONS
    // -----------------------------------

    if (
        result.diabetes ||
        result.hypertension ||
        result.heartAttack ||
        result.asthma
    ) {

        if (nextStep) {

            nextStep.textContent +=
                " Because you indicated an existing health condition, consider discussing your readings and lifestyle plan with your doctor.";
        }
    }


    console.log("Health result displayed:", result);

});