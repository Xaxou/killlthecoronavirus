let score = 0,
    virus = 0,
    autoclic = null,
    nbautoclic = 0,
    interval = 1100,
    multiplicator = 1,

    laver = new Action(1000, 5, 1000, "laver"),
    maison = new Action(5000, 10, 10000, "maison"),
    courses = new Action(10000, 15, 100000, "courses");

$(document).ready(function () {
    setInterval(l('test'), 900);

    /** Lecture des évènements */
    $('#press').on('click', function () {
        scoring();
    });

    $('#clicker').on('click', function () {
        autoclicker();
    })

    $('.action').on('click', function () {
        utiliserAction($(this).attr('id'));
    });

    function scoring(multip = 0) {
        if (multip != 0) {
            score += multip;
        } else {
            score++;
        }

        var points = document.getElementById("points");
        points.innerHTML = score;
    }

    function autoclicker() {

        if (interval > 100) {
            interval -= 100;
        } else if ((interval <= 100) && (interval != 10)) {
            interval -= 10;
        } else {
            multiplicator++;
        }

        nbautoclic++;
        $('#nbclickers').html(nbautoclic);

        clearInterval(autoclic);
        autoclic = setInterval(function () {
            scoring(multiplicator)
        }, interval);
    }

    function utiliserAction(nom) {
        var action = null;

        switch (nom) {
            case 'laver':
                action = laver.utiliser();
                break;
            case 'maison':
                action = maison.utiliser();
                break;
            case 'courses':
                action = courses.utiliser();
                break;

            default:
                break;
        }

        if (score > action.price) {
            score -= action.price;
            scoring();
            virus = virus+action.bonus;
            $('#virus').html(virus);
            cooldown(action.cooldown, action.buttonid);
        }
    }

    function cooldown(cd, buttonid) {
        cd = cd * 1000;
        l(cd);
        $("#" + buttonid).attr('disabled', true);
        setTimeout(function () {
            $("#" + buttonid).attr('disabled', false);
        }, cd);
    }

    //Shortcut -- Only on dev mode
    function l(elem) {
        console.log(elem);
    }

});