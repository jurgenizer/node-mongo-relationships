// Tradeoff between query performance vs consistency


// Using References (Normalization) -> CONSISTENCY
let author = {
    name: 'Jurgen'
}

let course = {
    author: 'id'
}

// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
    author: {
        name: 'Jurgen'
    }
}

// Hybrid
let author = {
    name: 'Jurgen'
    // 50 other properties
}

let courses = {
    author: {
        id: 'ref',
        name: 'Jurgen'
    }
}