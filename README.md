# 2020-weather-dashboard
a weather dashboard that will run in the browser and feature dynamically updated HTML and CSS.
# a timed quiz

css, javascript, bootstrap CDN and JQuery are used to create a quiz.

## Site Picture
![Site](/images/weather-snap.PNG)


## Technologies Used
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [bootstrap cdn](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [GitLab](https://gitlab.com/) - version control system to track changes to source code
- [GitHub](https://github.com/) - hosts repository that can be deployed to GitHub Pages

## Summary 
a weather dashboard for whatever locale you choose.

## Code Snippet
where the work gets done.

```javaScript

// determine the users answer to the question
function getAnswers(event) {
    console.log(event.target);
    var dataAnswer = event.target.getAttribute("data-answer")
    var dataChoice = event.target.getAttribute("data-choice");
    if (dataChoice === dataAnswer || dataAnswer === "all") {
        theResult.innerHTML = "<h3>you are correct!</h3>";
        qRemain.innerHTML = '<class="col text-danger">' + qCountDown; +  '...';
        rightFoot++;
        right.textContent = rightFoot;
    } else {
        theResult.innerHTML = "<h3>incorrect!</h3>";
        qRemain.textContent = qCountDown;
        wrongFoot++;
        wrong.textContent = wrongFoot;
        varCount = varCount - 10;
    }
    qCount++;
    qCountDown--;
    if (qCountDown === 0) {
        qCount = 0;
        varCount = 0;
    }
    nextQuestion();
}

```

## Deployed Link

* [see live site](https://stephonautery.github.io/2020-stephon-autery-a-timed-quiz/)
* [github repository](https://github.com/StephonAutery/2020-stephon-autery-a-timed-quiz)

## Authors

* **Stephon Autery** 

- [link to portfolio Site](https://github.com/StephonAutery)
- [link to LinkedIn](https://www.linkedin.com/in/stephon-a-1bb575198/)

## License

This project is in the public domain.

images: copyright Stephon Autery

## Acknowledgments

* UCBerkeley Coding Bootcamp is still Awesome!
