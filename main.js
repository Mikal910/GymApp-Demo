document.addEventListener('DOMContentLoaded', () => {
    const exerciseListContainer = document.getElementById('exercise-list');

    // Get exercises directly from rendered EJS content
    const allExercises = Array.from(document.querySelectorAll('.exercise')).map(exercise => {
        const name = exercise.querySelector('h2').innerText.trim();
        const type = exercise.querySelector('.type').innerText.trim().toLowerCase();
        const bodyType = exercise.querySelector('.body-type').innerText.trim().toLowerCase();
        const muscle = exercise.querySelector('.muscle').innerText.trim();
        const equipment = exercise.querySelector('.equipment').innerText.trim();
        const difficulty = exercise.querySelector('.difficulty').innerText.trim().toLowerCase();
        const instructions = Array.from(exercise.querySelectorAll('ul li')).map(li => li.innerText.trim());
        return { name, type, 'body-type': bodyType, muscle, equipment, difficulty, instructions };
    });

    console.log('All Exercises:', allExercises); // Debugging log 

    // Function to display exercises
    function displayExercises(exercises) {
        exerciseListContainer.innerHTML = ''; // Clear existing content
        if (exercises.length === 0) {
            exerciseListContainer.innerHTML = '<p>No exercises found.</p>';
            return;
        }

        exercises.forEach(exercise => {
            const exerciseDiv = document.createElement('div');
            exerciseDiv.classList.add('exercise');

            exerciseDiv.innerHTML = `
                <h2>${exercise.name}</h2>
                <p><strong>Type:</strong> ${exercise.type}</p>
                <p><strong>Body Type:</strong> ${exercise['body-type']}</p>
                <p><strong>Muscle:</strong> ${exercise.muscle}</p>
                <p><strong>Equipment:</strong> ${exercise.equipment}</p>
                <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
                <h3>Instructions:</h3>
                <ul>
                    ${exercise.instructions.map(instr => `<li>${instr}</li>`).join('')}
                </ul>
            `;
            exerciseListContainer.appendChild(exerciseDiv);
        });
    }

    // Filter function triggered by user input
    document.getElementById('filter-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedType = document.getElementById('exercise-type').value.trim().toLowerCase();
        const selectedBodyType = document.getElementById('body-type').value.trim().toLowerCase();

        console.log('Selected Type:', selectedType); // Debug log
        console.log('Selected Body Type:', selectedBodyType); // Debug log

        const filteredExercises = allExercises.filter(exercise => {
            const typeMatches = selectedType ? exercise.type === selectedType : true;
            const bodyTypeMatches = selectedBodyType ? exercise['body-type'] === selectedBodyType : true;
            return typeMatches && bodyTypeMatches;
        });

        console.log('Filtered Exercises:', filteredExercises); // Debug log

        displayExercises(filteredExercises);
    });
});
