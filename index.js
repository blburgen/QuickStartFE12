let stateList = [];

const stateContainer = document.getElementById("states-container");
const stateName = document.getElementById("stateName");

// Render a list of States
function renderStateList() {
    // Clear out state
    stateContainer.innerHTML = "";

    // If there are no states, shows message indicating it is empty
    if(stateList.length === 0){
        stateContainer.innerHTML = "No States yet"
    }

    // for each state, map it to span that append to the container
    stateList.map(renderState).forEach(span => stateContainer.appendChild(span));
}

function renderState(state){
    const stateSpan = document.createElement("span");
    stateSpan.innerHTML = `${state.title}, `

    return stateSpan;
}

// Fetching

async function fetchAllStates() {
    const response = await fetch("http://localhost:3005/state");
    return response.json();
}

async function postStates(newStateData) {
    const response = await fetch("http://localhost:3005/state", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newStateData)
    });
    return response.json();
}

// When save button is clicked

async function OnStateClick(event) {
    // event.preventDefault();
    const stateData = {
        title: stateName.value
    };
    const createdState = await postStates(stateData);

    stateList.push(createdState);

    renderStateList()
}

// Start up

async function startUp() {
    renderStateList();
    stateList = await fetchAllStates()
    renderStateList();
}

startUp();