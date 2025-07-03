// Course data and functionality
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming concepts and processes.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful programmers by learning to research and call functions written by others.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

// DOM elements
let courseGrid;
let totalCredits;
let filterButtons;

// Initialize course functionality
document.addEventListener('DOMContentLoaded', function() {
    courseGrid = document.getElementById('courseGrid');
    totalCredits = document.getElementById('totalCredits');
    filterButtons = document.querySelectorAll('.filter-btn');

    // Display all courses initially
    displayCourses('all');

    // Course filtering event listeners
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter courses
            const filter = this.dataset.filter;
            displayCourses(filter);
        });
    });
});

// Display courses function
function displayCourses(filter) {
    let filteredCourses = courses;
    
    if (filter !== 'all') {
        filteredCourses = courses.filter(course => course.subject === filter);
    }
    
    // Clear existing courses
    courseGrid.innerHTML = '';
    
    // Create course cards
    filteredCourses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
        
        courseCard.innerHTML = `
            <div class="course-title">${course.subject} ${course.number}</div>
            <div class="course-description">${course.title}</div>
            <div class="course-info">
                <span class="course-code">${course.subject} ${course.number}</span>
                <span class="course-credits">${course.credits} Credits</span>
            </div>
        `;
        
        courseGrid.appendChild(courseCard);
    });
    
    // Update total credits using reduce function
    const totalCreditsCount = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCredits.textContent = totalCreditsCount;
}