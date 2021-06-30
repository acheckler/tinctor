import React from 'react'

export default React.createContext({
    cannabinoids: [],
    carrier_oils: [],
    flavors: [],
    bottles: [],
    droppers: [],
    projects: [],
    projectsDisplay: [],
    ingredients: [],
    packaging: [],
    addProject: () => {},
    deleteProject: () => {},
    // calculateCost: () => {}
})