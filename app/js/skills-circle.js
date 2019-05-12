function setPosition(selector, circleRadius) {
    const radius = circleRadius + 'px', //distance from center
        startPosition = -90,
        circleContainer = document.querySelectorAll(selector),
        numberOfElements = circleContainer.length,
        angle = 360 / numberOfElements,
        halfCircle = Math.floor(circleContainer.length / 2);

    circleContainer.forEach(function (element, index) {
        if (index === 0) {
            addTokenToCircleContainer(element, "top-side-circle");
        } else if (index > 0 && index < halfCircle) {
            addTokenToCircleContainer(element, "right-side-circle");
        } else if (index > halfCircle) {
            addTokenToCircleContainer(element, "left-side-circle");
        } else if (index === halfCircle) {
            addTokenToCircleContainer(element, "bottom-side-circle");
        }
        const rotate = angle * index + startPosition,
            rotateReverse = rotate * -1;
        element.style.transform = 'rotate(' + rotate + 'deg) translate(' + radius + ') rotate(' + rotateReverse + 'deg)';
    });
}

function addTokenToCircleContainer (element, token) {
    element.querySelector('.skills-circle--name').classList.add(token);
}

if (window.innerWidth >= 1024) {
    setSkillsCirclePosition();
}

window.onresize = function (event) {
    event.preventDefault();
    if (window.innerWidth >= 1024) {
        setSkillsCirclePosition();
    } else {
        const circleContainer = document.querySelectorAll('.skills-circle--container .skills-circle--link');
        circleContainer.forEach(function (element, index) {
            removeTokenFromCircleContainer(element, "top-side-circle");
            removeTokenFromCircleContainer(element, "right-side-circle");
            removeTokenFromCircleContainer(element, "left-side-circle");
            removeTokenFromCircleContainer(element, "bottom-side-circle");
            element.style.transform = '';
        });
    }
};

function setSkillsCirclePosition () {
    if (window.innerWidth * 0.40 >= 470) {
        setPosition('.skills-circle--container .skills-circle--link', 470 / 2 + window.innerWidth * 0.03);
    } else {
        setPosition('.skills-circle--container .skills-circle--link', window.innerWidth * 0.40 / 2 + window.innerWidth * 0.03);
    }
}

function removeTokenFromCircleContainer (element, token) {
    element.querySelector('.skills-circle--name').classList.remove(token);
}
