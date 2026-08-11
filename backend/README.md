# Java Backend – Next Step

This folder is reserved for the Spring Boot backend.

Recommended Maven dependencies:
- Spring Web
- Validation

Recommended endpoints:

POST `/api/health/analyze`

Request fields can include:
- name
- age
- gender
- height
- weight
- sugar
- systolic
- diastolic
- cholesterol
- conditions
- activity
- sleep
- water

The service should return:
- BMI
- BMI category
- indicator summaries
- food recommendations
- exercise recommendations
- lifestyle recommendations
- professional-care warning

Keep medical rules conservative and clearly label the output as educational, not diagnostic.
